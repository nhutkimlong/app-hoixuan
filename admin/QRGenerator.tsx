import React from 'react';
import { LANDMARKS } from '../constants';
import { generateQRCodeURL } from '../utils/qrGenerator';

const QRGenerator: React.FC = () => {
  const printAllQRs = () => {
    window.print();
  };

  const downloadQR = (landmarkId: string, landmarkName: string) => {
    const qrURL = generateQRCodeURL(landmarkId);
    const link = document.createElement('a');
    link.href = qrURL;
    link.download = `QR-${landmarkId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🎯 QR Code Generator - Sưu Tầm Dấu Chân Bính Ngọ 2026
          </h1>
          <p className="text-gray-600 mb-6">
            In các mã QR này và dán tại các địa điểm tương ứng
          </p>
          <button
            onClick={printAllQRs}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            🖨️ In tất cả QR Codes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2">
          {LANDMARKS.map((landmark) => (
            <div
              key={landmark.id}
              className="bg-white p-6 rounded-xl shadow-lg print:shadow-none print:border-2 print:border-gray-300 print:break-inside-avoid"
            >
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2 print:text-base">
                  {landmark.name}
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4 print:bg-white">
                  <img 
                    src={generateQRCodeURL(landmark.id)} 
                    alt={`QR Code for ${landmark.name}`}
                    className="mx-auto w-48 h-48 print:w-32 print:h-32"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                
                <div className="text-sm text-gray-600 mb-4 print:text-xs">
                  <p className="font-semibold text-yellow-600">+{landmark.points} điểm</p>
                  <p className="mt-2">{landmark.description}</p>
                  <p className="mt-2 font-mono text-xs bg-gray-100 p-2 rounded print:bg-gray-50">
                    ID: {landmark.id}
                  </p>
                </div>
                
                <button
                  onClick={() => downloadQR(landmark.id, landmark.name)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm print:hidden"
                >
                  📥 Tải xuống
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6 print:hidden">
          <h3 className="text-lg font-bold text-yellow-800 mb-3">📋 Hướng dẫn sử dụng:</h3>
          <ol className="list-decimal list-inside text-yellow-700 space-y-2">
            <li>In tất cả QR codes bằng nút "In tất cả QR Codes"</li>
            <li>Cắt từng QR code theo khung</li>
            <li>Dán QR code tại địa điểm tương ứng</li>
            <li>Đảm bảo QR code được dán ở vị trí dễ thấy và quét được</li>
            <li>Kiểm tra QR code hoạt động bằng app trước khi sự kiện</li>
          </ol>
        </div>

        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6 print:hidden">
          <h3 className="text-lg font-bold text-red-800 mb-3">⚠️ Lưu ý quan trọng:</h3>
          <ul className="list-disc list-inside text-red-700 space-y-2">
            <li>Mỗi QR code chỉ có thể check-in một lần cho mỗi người chơi</li>
            <li>QR code phải được quét bằng app chính thức</li>
            <li>Không chia sẻ QR code trên mạng xã hội</li>
            <li>Bảo vệ QR code khỏi thời tiết và hư hỏng</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;