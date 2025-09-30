import React from 'react';
import { MyLocationIcon } from './icons/ActionIcons';
import { useGeolocation } from '../hooks/useGeolocation';

interface UserLocationButtonProps {
  onLocationFound?: (lat: number, lng: number) => void;
  className?: string;
}

export const UserLocationButton: React.FC<UserLocationButtonProps> = ({
  onLocationFound,
  className = '',
}) => {
  const { getCurrentPosition, loading, error, latitude, longitude } = useGeolocation();

  const handleLocationClick = () => {
    getCurrentPosition();
  };

  const prevLocationRef = React.useRef<{lat: number, lng: number} | null>(null);

  React.useEffect(() => {
    if (latitude && longitude && onLocationFound) {
      // Chỉ gọi onLocationFound nếu vị trí thực sự thay đổi
      const currentLocation = { lat: latitude, lng: longitude };
      const prevLocation = prevLocationRef.current;
      
      if (!prevLocation || 
          Math.abs(prevLocation.lat - latitude) > 0.0001 || 
          Math.abs(prevLocation.lng - longitude) > 0.0001) {
        onLocationFound(latitude, longitude);
        prevLocationRef.current = currentLocation;
      }
    }
  }, [latitude, longitude, onLocationFound]);

  return (
    <div className="relative">
      <button
        onClick={handleLocationClick}
        disabled={loading}
        className={`
          bg-white shadow-lg rounded-full p-3 border border-gray-200
          hover:bg-gray-50 active:bg-gray-100 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        title={loading ? 'Đang lấy vị trí...' : 'Định vị vị trí của tôi'}
      >
        <div className={`w-6 h-6 text-blue-600 ${loading ? 'animate-pulse' : ''}`}>
          <MyLocationIcon />
        </div>
      </button>
      
      {error && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-red-100 text-red-700 text-xs rounded shadow-lg whitespace-nowrap z-10">
          {error}
        </div>
      )}
    </div>
  );
};