import React from 'react';
import { LANDMARKS } from '../constants';
import { calculateDistance, formatDistance, isWithinCheckInRange } from '../utils/distanceCalculator';
import { LocationIcon } from './icons/ActionIcons';

interface NearbyLandmarksProps {
  userLocation: [number, number] | null;
  checkedInLandmarks: string[];
  onLandmarkClick?: ((landmarkId: string) => void) | null;
}

export const NearbyLandmarks: React.FC<NearbyLandmarksProps> = ({
  userLocation,
  checkedInLandmarks,
  onLandmarkClick,
}) => {
  if (!userLocation) {
    return (
      <div className="p-4 text-center text-gray-500">
        <LocationIcon />
        <p className="mt-2">Bật định vị để xem các điểm gần bạn</p>
      </div>
    );
  }

  // Tính khoảng cách và sắp xếp theo khoảng cách gần nhất
  const landmarksWithDistance = LANDMARKS.map(landmark => {
    const distance = calculateDistance(
      userLocation[0],
      userLocation[1],
      landmark.position[0],
      landmark.position[1]
    );
    
    return {
      ...landmark,
      distance,
      canCheckIn: isWithinCheckInRange(distance),
      isVisited: checkedInLandmarks.includes(landmark.id),
    };
  }).sort((a, b) => a.distance - b.distance);

  // Chỉ hiển thị 5 điểm gần nhất
  const nearbyLandmarks = landmarksWithDistance.slice(0, 5);

  return (
    <div className="p-3">
      <div className="space-y-2">
        {nearbyLandmarks.map((landmark) => (
          <div
            key={landmark.id}
            className={`
              p-2 rounded-lg border text-sm
              ${landmark.canCheckIn && !landmark.isVisited
                ? 'border-green-300 bg-green-50'
                : 'border-gray-200 bg-gray-50'
              }
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-xs">
                  {landmark.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                  {landmark.description.substring(0, 50)}...
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-blue-600 font-medium">
                    📍 {formatDistance(landmark.distance)}
                  </span>
                  <span className="text-xs text-yellow-600 font-bold">
                    +{landmark.points} điểm
                  </span>
                </div>
              </div>
              
              <div className="ml-2 flex flex-col items-center">
                {landmark.isVisited ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                ) : landmark.canCheckIn ? (
                  <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                )}
              </div>
            </div>
            
            {landmark.canCheckIn && !landmark.isVisited && (
              <div className="mt-2 text-xs text-green-700 font-bold">
                ✅ Có thể check-in ngay!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};