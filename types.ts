
// Định nghĩa cấu trúc dữ liệu cho một điểm check-in (landmark)
export interface Landmark {
  id: string;
  name: string;
  position: [number, number]; // Tọa độ [latitude, longitude]
  description: string;
  points: number;
  image: string; // URL hình ảnh của điểm check-in
}

// Định nghĩa cấu trúc dữ liệu cho người chơi
export interface Player {
  name: string;
  checkedInLandmarks: string[]; // Mảng chứa ID của các điểm đã check-in
}

// Định nghĩa cấu trúc cho một người chơi trên bảng xếp hạng
export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
}

// Enum định nghĩa các tab điều hướng chính
export enum NavigationTab {
  Map = 'MAP',
  Scan = 'SCAN',
  Leaderboard = 'LEADERBOARD',
  Profile = 'PROFILE',
}

// Định nghĩa cấu trúc cho vị trí người dùng
export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}
