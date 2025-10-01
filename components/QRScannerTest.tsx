import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

const QRScannerTest: React.FC = () => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');

  const startScanner = () => {
    setIsActive(true);
    setMessage('Đang khởi động scanner...');

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    const scanner = new Html5QrcodeScanner("test-qr-reader", config, false);
    
    scanner.render(
      (decodedText: string) => {
        setMessage(`QR Code detected: ${decodedText}`);
        console.log('QR Code detected:', decodedText);
      },
      (error: string) => {
        if (!error.includes('NotFoundException')) {
          console.warn('QR scan error:', error);
        }
      }
    );

    scannerRef.current = scanner;
    setMessage('Scanner đã khởi động');
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
        .then(() => {
          scannerRef.current = null;
          setIsActive(false);
          setMessage('Scanner đã dừng');
        })
        .catch(console.error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">QR Scanner Test</h2>
      
      <div className="mb-4">
        {!isActive ? (
          <button
            onClick={startScanner}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Bắt đầu Test Scanner
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Dừng Scanner
          </button>
        )}
      </div>

      {message && (
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <p className="text-sm">{message}</p>
        </div>
      )}

      <div 
        id="test-qr-reader" 
        className="w-full min-h-[300px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg"
        style={{ minHeight: '300px' }}
      >
        {!isActive && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Khu vực camera sẽ hiển thị ở đây</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScannerTest;