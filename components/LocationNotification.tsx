import React, { useEffect, useState } from 'react';
import { LANDMARKS } from '../constants';
import { calculateDistance, isWithinCheckInRange } from '../utils/distanceCalculator';
import { LocationIcon } from './icons/ActionIcons';

interface LocationNotificationProps {
  userLocation: [number, number] | null;
  checkedInLandmarks: string[];
  onCheckInPrompt?: (landmarkId: string) => void;
}

export const LocationNotification: React.FC<LocationNotificationProps> = ({
  userLocation,
  checkedInLandmarks,
  onCheckInPrompt,
}) => {
  const [nearbyLandmark, setNearbyLandmark] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!userLocation) {
      setNearbyLandmark(null);
      setShowNotification(false);
      return;
    }

    // Tìm điểm gần nhất có thể check-in
    const nearbyCheckInLandmark = LANDMARKS.find(landmark => {
      if (checkedInLandmarks.includes(landmark.id)) return false;
      
      const distance = calculateDistance(
        userLocation[0],
        userLocation[1],
        landmark.position[0],
        landmark.position[1]
      );
      
      return isWithinCheckInRange(distance);
    });

    if (nearbyCheckInLandmark && nearbyLandmark !== nearbyCheckInLandmark.id) {
      setNearbyLandmark(nearbyCheckInLandmark.id);
      setShowNotification(true);
      
      // Tự động ẩn thông báo sau 10 giây
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    } else if (!nearbyCheckInLandmark) {
      setNearbyLandmark(null);
      setShowNotification(false);
    }
  }, [userLocation, checkedInLandmarks, nearbyLandmark]);

  if (!showNotification || !nearbyLandmark) {
    return null;
  }

  const landmark = LANDMARKS.find(l => l.id === nearbyLandmark);
  if (!landmark) return null;

  return (
    <div className="fixed top-4 right-4 z-[1001] animate-slide-down">
      <div className="bg-green-500 text-white rounded-lg shadow-lg p-4 w-64">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 text-white flex-shrink-0 mt-0.5">
            <LocationIcon />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm">Bạn đã đến gần!</h4>
            <p className="text-xs mt-1 opacity-90">
              {landmark.name}
            </p>
            <p className="text-xs mt-1 opacity-75">
              +{landmark.points} điểm
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => onCheckInPrompt?.(landmark.id)}
              className="bg-white text-green-600 px-3 py-1 rounded text-xs font-bold hover:bg-gray-100 transition-colors"
            >
              Check-in
            </button>
            <button
              onClick={() => setShowNotification(false)}
              className="text-white text-xs opacity-75 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};