import React from 'react';
import { generateQRCodeURL } from '../utils/qrGenerator';
import type { Landmark } from '../types';

interface QRCodeDisplayProps {
  landmark: Landmark;
  onClose: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ landmark, onClose }) => {
  const qrCodeURL = generateQRCodeURL(landmark.id);

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeURL;
    link.download = `qr-${landmark.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            QR Code - {landmark.name}
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <img 
              src={qrCodeURL} 
              alt={`QR Code for ${landmark.name}`}
              className="mx-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Quét mã QR này tại {landmark.name} để nhận {landmark.points} điểm
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={downloadQR}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tải xuống
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;