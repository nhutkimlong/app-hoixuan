
import React, { useRef, useEffect, useCallback } from 'react';
import { DownloadIcon, ShareIcon, XMarkIcon } from './icons/ActionIcons';
import { getCertificateLevel } from '../constants';

interface CertificateModalProps {
  playerName: string;
  score: number;
  landmarkCount: number;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ playerName, score, landmarkCount, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const certificateImage = '/assets/images/background.webp'; // Nền chứng nhận
  const locationIcon = '/assets/images/location.png'; // Icon định vị

  const drawCertificate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, bgImg: HTMLImageElement, locImg: HTMLImageElement) => {
    // Lấy thông tin cấp độ chứng nhận
    const certificateLevel = getCertificateLevel(landmarkCount, score);
    
    // Vẽ ảnh nền
    ctx.drawImage(bgImg, 0, 0, width, height);

    // Thêm lớp phủ màu theo cấp độ
    if (certificateLevel) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, certificateLevel.bgColor + '40');
      gradient.addColorStop(1, certificateLevel.bgColor + '20');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Cài đặt font chữ
    ctx.textAlign = 'center';

    // Dòng tiêu đề với icon cấp độ
    ctx.font = 'bold 60px Arial, sans-serif';
    ctx.fillStyle = certificateLevel?.color || '#c2410c';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    
    const titleText = certificateLevel ? `${certificateLevel.icon} CHỨNG NHẬN ${certificateLevel.icon}` : 'CHỨNG NHẬN';
    ctx.strokeText(titleText, width / 2, height * 0.2);
    ctx.fillText(titleText, width / 2, height * 0.2);

    // Cấp độ chứng nhận
    if (certificateLevel) {
      ctx.font = 'bold 45px Arial, sans-serif';
      ctx.fillStyle = certificateLevel.color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeText(certificateLevel.name.toUpperCase(), width / 2, height * 0.28);
      ctx.fillText(certificateLevel.name.toUpperCase(), width / 2, height * 0.28);
    }

    // Dòng "chứng nhận"
    ctx.font = '28px Arial, sans-serif';
    ctx.fillStyle = '#2c5530';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeText('TRÂN TRỌNG TRAO TẶNG', width / 2, height * 0.36);
    ctx.fillText('TRÂN TRỌNG TRAO TẶNG', width / 2, height * 0.36);

    // Tên người chơi
    ctx.font = 'bold 75px Arial, sans-serif';
    ctx.fillStyle = '#b91c1c';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeText(playerName, width / 2, height * 0.48);
    ctx.fillText(playerName, width / 2, height * 0.48);

    // Mô tả thành tích theo cấp độ
    ctx.font = '28px Arial, sans-serif';
    ctx.fillStyle = '#2c5530';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    const achievementText = certificateLevel?.description || 'Đã hoàn thành hành trình khám phá';
    ctx.strokeText(achievementText, width / 2, height * 0.56);
    ctx.fillText(achievementText, width / 2, height * 0.56);

    // Tên sự kiện với bag icon
    const eventText = 'SƯU TẦM KỶ NIỆM BÍNH NGỌ 2026';
    ctx.font = 'bold 35px Arial, sans-serif';
    ctx.fillStyle = '#2c5530';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;

    // Vẽ location icon bên trái text
    const iconSize = 35;
    const textMetrics = ctx.measureText(eventText);
    const textWidth = textMetrics.width;
    const iconX = (width - textWidth) / 2 - iconSize - 10;
    const iconY = height * 0.64 - iconSize / 2;

    ctx.drawImage(locImg, iconX, iconY, iconSize, iconSize);
    ctx.strokeText(eventText, width / 2, height * 0.64);
    ctx.fillText(eventText, width / 2, height * 0.64);

    // Thống kê chi tiết
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.fillStyle = certificateLevel?.color || '#c2410c';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeText(`${landmarkCount}/15 địa điểm • ${score} điểm`, width / 2, height * 0.72);
    ctx.fillText(`${landmarkCount}/15 địa điểm • ${score} điểm`, width / 2, height * 0.72);

    // Thêm địa điểm
    ctx.font = '24px Arial, sans-serif';
    ctx.fillStyle = '#2c5530';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeText('TẠI NÚI BÀ ĐEN - TÂY NINH', width / 2, height * 0.8);
    ctx.fillText('TẠI NÚI BÀ ĐEN - TÂY NINH', width / 2, height * 0.8);

    // Ngày tháng
    const currentDate = new Date().toLocaleDateString('vi-VN');
    ctx.font = '20px Arial, sans-serif';
    ctx.fillStyle = '#666';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeText(`Ngày ${currentDate}`, width / 2, height * 0.88);
    ctx.fillText(`Ngày ${currentDate}`, width / 2, height * 0.88);

  }, [playerName, score, landmarkCount]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let imagesLoaded = 0;
    const totalImages = 2;

    const bgImg = new Image();
    const locImg = new Image();

    const checkAllImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        drawCertificate(context, canvas.width, canvas.height, bgImg, locImg);
      }
    };

    bgImg.crossOrigin = "Anonymous";
    bgImg.src = certificateImage;
    bgImg.onload = checkAllImagesLoaded;

    locImg.crossOrigin = "Anonymous";
    locImg.src = locationIcon;
    locImg.onload = checkAllImagesLoaded;
  }, [drawCertificate, certificateImage, locationIcon]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `chung-nhan-${playerName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (blob && navigator.share) {
        const file = new File([blob], `chung-nhan-${playerName}.png`, { type: 'image/png' });
        try {
          await navigator.share({
            title: 'Chứng Nhận Sưu Tầm Kỷ Niệm Bính Ngọ',
            text: `Tôi đã hoàn thành thử thách tại Núi Bà Đen với ${score} điểm!`,
            files: [file],
          });
        } catch (error) {
          console.error('Lỗi khi chia sẻ:', error);
        }
      } else {
        alert('Trình duyệt của bạn không hỗ trợ chức năng chia sẻ hoặc đã có lỗi xảy ra.');
      }
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-3xl animate-fade-in-up relative">
        <button onClick={onClose} className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg text-gray-700 hover:text-red-500">
          <div className="w-8 h-8"><XMarkIcon /></div>
        </button>
        <h2 className="text-center text-xl font-bold text-gray-800 mb-4">Chúc Mừng! Đây là thành quả của bạn!</h2>

        <canvas ref={canvasRef} width={1200} height={800} className="w-full h-auto rounded-md border" />

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            <div className="w-6 h-6"><DownloadIcon /></div>
            Tải Về
          </button>
          {navigator.share && (
            <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
              <div className="w-6 h-6"><ShareIcon /></div>
              Chia Sẻ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
