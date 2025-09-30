// Tính khoảng cách giữa hai điểm theo công thức Haversine
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Bán kính Trái Đất tính bằng km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Khoảng cách tính bằng km
  
  return distance;
};

// Chuyển đổi độ sang radian
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Format khoảng cách thành chuỗi dễ đọc
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

// Kiểm tra xem người dùng có đủ gần để check-in không
export const isWithinCheckInRange = (distance: number): boolean => {
  return distance <= 0.1; // 100m
};