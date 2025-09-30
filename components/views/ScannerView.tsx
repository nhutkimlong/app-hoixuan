
import React, { useState } from 'react';
import { LANDMARKS } from '../../constants';
import { CheckBadgeIcon, QrCodeIcon } from '../icons/ActionIcons';
import QRScanner from '../QRScanner';

interface ScannerViewProps {
  onCheckIn: (landmarkId: string) => void;
  checkedInLandmarks: string[];
}

const ScannerView: React.FC<ScannerViewProps> = ({ onCheckIn, checkedInLandmarks }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    console.log('Scanned QR:', decodedText);
    
    // Trim và validate QR data
    const cleanedData = decodedText.trim();
    
    // Kiểm tra xem mã QR có phải là ID của landmark không
    const landmark = LANDMARKS.find(l => l.id === cleanedData);
    if (landmark) {
      onCheckIn(cleanedData);
      setIsScanning(false);
      setScanError(null);
    } else {
      setScanError(`Mã QR không hợp lệ! Đây không phải mã QR của sự kiện "Sưu Tầm Kỷ Niệm Bính Ngọ 2026"`);
      // Không tự động dừng quét để người dùng có thể thử lại
      setTimeout(() => setScanError(null), 5000);
    }
  };

  const handleScanError = (error: string) => {
    console.error('QR Scanner Error:', error);
    setScanError(error);
    setTimeout(() => setScanError(null), 5000);
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanError(null);
  };

  const stopScanning = () => {
    setIsScanning(false);
    setScanError(null);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div className="text-center mb-6 pt-4">
        <div className="inline-block p-4 bg-orange-100 rounded-full mb-3">
          <div className="w-12 h-12 text-orange-600">
            <QrCodeIcon />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Quét Mã QR</h1>
        <p className="text-gray-600 mt-2">
          Tìm và quét mã QR tại các địa điểm trong danh sách bên dưới để thu thập điểm.
        </p>
      </div>

      {/* QR Scanner Section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        {!isScanning ? (
          <div className="text-center">
            <button
              onClick={startScanning}
              className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-700 active:scale-95 transform transition-all duration-200 shadow-sm"
            >
              Bắt đầu quét QR
            </button>
          </div>
        ) : (
          <div>
            <QRScanner
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
              isActive={isScanning}
            />
            <div className="text-center mt-4">
              <button
                onClick={stopScanning}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Dừng quét
              </button>
            </div>
          </div>
        )}
        
        {scanError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {scanError}
          </div>
        )}
      </div>

      {/* Danh sách địa điểm và trạng thái check-in */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Các địa điểm tham gia:</h2>
        <p className="text-sm text-gray-600 mb-4">
          Quét mã QR tại các địa điểm bên dưới để thu thập điểm
        </p>
      </div>

      <div className="space-y-3">
        {LANDMARKS.map((landmark) => {
          const isCheckedIn = checkedInLandmarks.includes(landmark.id);
          return (
            <div
              key={landmark.id}
              className={`bg-white p-4 rounded-xl shadow-md flex items-center justify-between transition-all duration-300 ${
                isCheckedIn ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <img src={landmark.image} alt={landmark.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{landmark.name}</h3>
                  <p className="text-sm text-yellow-600 font-semibold">+{landmark.points} điểm</p>
                  <p className="text-xs text-gray-500 mt-1">{landmark.description}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                {isCheckedIn ? (
                  <div className="flex items-center text-green-600">
                    <span className="font-semibold mr-2 text-sm">✓ Hoàn thành</span>
                    <div className="w-6 h-6">
                      <CheckBadgeIcon />
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    Chưa check-in
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScannerView;
