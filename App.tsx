
import React, { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Player, Landmark } from './types';
import { LANDMARKS, getCertificateLevel } from './constants';
import { extractLandmarkId, validateQRData } from './utils/qrGenerator';
import WelcomeScreen from './components/WelcomeScreen';
import MainLayout from './components/MainLayout';
import CheckinModal from './components/CheckinModal';

const App: React.FC = () => {
  // Sử dụng custom hook để lưu và lấy dữ liệu người chơi từ localStorage
  const [player, setPlayer] = useLocalStorage<Player | null>('playerData', null);
  
  // State quản lý modal khi check-in thành công
  const [checkedInLandmark, setCheckedInLandmark] = useState<Landmark | null>(null);

  // Tính toán điểm số, tiến trình và cấp độ chứng nhận của người chơi
  const { score, progress, canGetCertificate, certificateLevel } = useMemo(() => {
    if (!player) return { score: 0, progress: 0, canGetCertificate: false, certificateLevel: null };
    
    const currentScore = player.checkedInLandmarks.reduce((total, id) => {
      const landmark = LANDMARKS.find(l => l.id === id);
      return total + (landmark?.points || 0);
    }, 0);
    
    const landmarkCount = player.checkedInLandmarks.length;
    const currentProgress = (landmarkCount / LANDMARKS.length) * 100;
    const currentCertificateLevel = getCertificateLevel(landmarkCount, currentScore);
    
    return { 
      score: currentScore, 
      progress: Math.round(currentProgress),
      canGetCertificate: currentCertificateLevel !== null,
      certificateLevel: currentCertificateLevel
    };
  }, [player]);

  // Hàm xử lý khi người chơi đăng nhập
  const handleLogin = (name: string): void => {
    setPlayer({
      name,
      checkedInLandmarks: [],
    });
  };
  
  // Hàm xử lý khi người chơi đăng xuất (reset game)
  const handleLogout = (): void => {
    if (window.confirm("Bạn có chắc muốn bắt đầu lại? Mọi tiến trình sẽ bị xóa.")) {
      setPlayer(null);
    }
  };

  // Hàm xử lý khi quét mã QR thành công
  const handleCheckIn = useCallback((qrData: string): void => {
    if (!player) return;

    // Extract và validate landmark ID từ QR data
    const landmarkId = extractLandmarkId(qrData);
    const validLandmarkIds = LANDMARKS.map(l => l.id);
    
    if (!validateQRData(landmarkId, validLandmarkIds)) {
      alert("Mã QR không hợp lệ hoặc không thuộc sự kiện này!");
      return;
    }

    // Kiểm tra xem đã check-in điểm này chưa
    if (player.checkedInLandmarks.includes(landmarkId)) {
      alert("Bạn đã check-in tại địa điểm này rồi!");
      return;
    }

    const landmark = LANDMARKS.find(l => l.id === landmarkId);
    if (landmark) {
      // Cập nhật state người chơi
      setPlayer(prevPlayer => ({
        ...prevPlayer!,
        checkedInLandmarks: [...prevPlayer!.checkedInLandmarks, landmarkId],
      }));
      // Hiển thị modal chúc mừng
      setCheckedInLandmark(landmark);
    }
  }, [player, setPlayer]);

  // Render màn hình chào mừng nếu chưa có thông tin người chơi
  if (!player) {
    return <WelcomeScreen onLogin={handleLogin} />;
  }

  // Render giao diện chính của ứng dụng
  return (
    <div className="bg-orange-50 min-h-screen">
      <MainLayout
        player={player}
        score={score}
        progress={progress}
        onCheckIn={handleCheckIn}
        onLogout={handleLogout}
        canGetCertificate={canGetCertificate}
        certificateLevel={certificateLevel}
        landmarkCount={player.checkedInLandmarks.length}
      />
      {checkedInLandmark && (
        <CheckinModal
          landmark={checkedInLandmark}
          onClose={() => setCheckedInLandmark(null)}
        />
      )}
    </div>
  );
};

export default App;
