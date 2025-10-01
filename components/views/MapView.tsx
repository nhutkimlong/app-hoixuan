
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { LANDMARKS } from '../../constants';
import { UserLocationButton } from '../UserLocationButton';
import { NearbyLandmarks } from '../NearbyLandmarks';
import { LocationNotification } from '../LocationNotification';
import { calculateDistance, formatDistance, isWithinCheckInRange } from '../../utils/distanceCalculator';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Tùy chỉnh icon cho các điểm trên bản đồ
const createIcon = (color: string) => {
    return new L.DivIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" class="w-8 h-8 drop-shadow-lg"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.057l-1.18-1.18a15.475 15.475 0 01-4.002 3.239.75.75 0 01-.84 0 15.475 15.475 0 01-4.002-3.239l-1.18 1.18a16.975 16.975 0 005.16 4.057zM12 1.5a.75.75 0 01.75.75v10.63l2.25-2.25a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0L8.25 11.72a.75.75 0 111.06-1.06l2.25 2.25V2.25A.75.75 0 0112 1.5z" clip-rule="evenodd" /></svg>`,
        className: 'bg-transparent border-0',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const visitedIcon = createIcon('#16a34a'); // Màu xanh lá cho điểm đã check-in
const unvisitedIcon = createIcon('#f97316'); // Màu cam cho điểm chưa check-in

// Icon cho vị trí người dùng
const userLocationIcon = new L.DivIcon({
  html: `<div class="user-location-wrapper">
    <img src="/assets/images/location.png" alt="Your location" class="user-location-img" />
  </div>`,
  className: 'user-location-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

// Component để điều khiển map từ bên ngoài
const MapController: React.FC<{ 
  userLocation: [number, number] | null;
  shouldPanToUser: boolean;
}> = ({ userLocation, shouldPanToUser }) => {
  const map = useMap();
  
  useEffect(() => {
    if (userLocation && shouldPanToUser) {
      // Đóng tất cả popup trước khi pan
      map.closePopup();
      
      // Delay nhỏ để tránh conflict với popup
      setTimeout(() => {
        map.setView(userLocation, 16, { 
          animate: true,
          duration: 1 // Smooth animation 1 giây
        });
      }, 100);
    }
  }, [userLocation, shouldPanToUser, map]);
  
  return null;
};

interface MapViewProps {
  checkedInLandmarks: string[];
  onCheckInPrompt?: (landmarkId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ checkedInLandmarks, onCheckInPrompt }) => {
  const centerPosition: [number, number] = [11.375, 106.170]; // Tọa độ trung tâm Núi Bà Đen
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showNearbyList, setShowNearbyList] = useState(false);
  const [shouldPanToUser, setShouldPanToUser] = useState(false);

  // Ensure Leaflet is properly initialized
  useEffect(() => {
    // Force a resize event after component mounts to fix map display issues
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLocationFound = React.useCallback((lat: number, lng: number) => {
    setUserLocation([lat, lng]);
    setShouldPanToUser(true);
    setShowNearbyList(true);
    
    // Reset shouldPanToUser sau khi đã pan
    setTimeout(() => {
      setShouldPanToUser(false);
    }, 1500);
  }, []);

  const handleCloseNearbyList = React.useCallback(() => {
    console.log('Closing nearby list'); // Debug log
    setShowNearbyList(false);
  }, []);



  return (
    <div className="h-full w-full relative flex flex-col">
      <MapContainer 
        center={centerPosition} 
        zoom={15} 
        scrollWheelZoom={true} 
        className="flex-1 min-h-0"
        whenReady={() => {
          // Force map to invalidate size when ready
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 100);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController 
          userLocation={userLocation} 
          shouldPanToUser={shouldPanToUser}
        />
        
        {/* Marker cho các điểm check-in */}
        {LANDMARKS.map((landmark) => {
          const isVisited = checkedInLandmarks.includes(landmark.id);
          let distance: number | null = null;
          let distanceText = '';
          let canCheckIn = false;
          
          if (userLocation) {
            distance = calculateDistance(
              userLocation[0],
              userLocation[1],
              landmark.position[0],
              landmark.position[1]
            );
            distanceText = formatDistance(distance);
            canCheckIn = isWithinCheckInRange(distance);
          }
          
          return (
            <Marker 
              key={landmark.id} 
              position={landmark.position}
              icon={isVisited ? visitedIcon : unvisitedIcon}
            >
              <Popup>
                <div className="text-center font-semibold">
                  <h3 className="text-lg font-bold text-orange-700">{landmark.name}</h3>
                  <img src={landmark.image} alt={landmark.name} className="rounded-md my-2" />
                  <p className="text-sm text-gray-600 text-justify">{landmark.description}</p>
                  <p className="mt-2 text-base font-bold text-yellow-600">+{landmark.points} điểm</p>
                  
                  {userLocation && (
                    <div className="mt-2 p-2 bg-blue-50 rounded">
                      <p className="text-sm text-blue-700">
                        📍 Khoảng cách: <span className="font-bold">{distanceText}</span>
                      </p>
                      {canCheckIn && !isVisited && (
                        <p className="text-xs text-green-600 font-bold mt-1">
                          ✅ Bạn có thể check-in tại đây!
                        </p>
                      )}
                    </div>
                  )}
                  
                  {isVisited && <p className="mt-1 text-sm font-bold text-green-600">ĐÃ CHECK-IN</p>}
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Marker cho vị trí người dùng */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="text-lg font-bold text-blue-600">Vị trí của bạn</h3>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      {/* Nút định vị người dùng */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <UserLocationButton onLocationFound={handleLocationFound} />
      </div>
      
      {/* Danh sách điểm gần nhất - Hiển thị ở phía dưới */}
      {showNearbyList && (
        <div className="absolute bottom-16 left-4 right-4 z-[1001]">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-y-auto">
            <div className="flex justify-between items-center p-3 border-b bg-blue-50 sticky top-0 z-10">
              <h3 className="font-bold text-blue-800 flex items-center">
                <span className="mr-2">📍</span>
                Điểm gần bạn
              </h3>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCloseNearbyList();
                }}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center w-8 h-8"
                type="button"
                aria-label="Đóng danh sách điểm gần"
              >
                ✕
              </button>
            </div>
            <NearbyLandmarks
              userLocation={userLocation}
              checkedInLandmarks={checkedInLandmarks}
              onLandmarkClick={null}
            />
          </div>
        </div>
      )}
      
      {/* Thông báo khi gần điểm check-in */}
      <LocationNotification
        userLocation={userLocation}
        checkedInLandmarks={checkedInLandmarks}
        onCheckInPrompt={onCheckInPrompt}
      />
    </div>
  );
};

export default MapView;
