import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

interface QRScannerSimpleProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
  isActive: boolean;
}

const QRScannerSimple: React.FC<QRScannerSimpleProps> = ({ onScanSuccess, onScanError, isActive }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isActive && !isScanning) {
      startScanner();
    } else if (!isActive && isScanning) {
      stopScanner();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [isActive, isScanning]);

  const startScanner = () => {
    try {
      console.log('Starting simple QR scanner...');
      
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        videoConstraints: {
          facingMode: { ideal: "environment" }
        }
      };

      const scanner = new Html5QrcodeScanner("qr-reader-simple", config, false);
      
      scanner.render(
        (decodedText: string) => {
          console.log('QR Code detected:', decodedText);
          onScanSuccess(decodedText);
          stopScanner();
        },
        (error: string) => {
          // Chỉ log lỗi nghiêm trọng
          if (!error.includes('NotFoundException')) {
            console.warn('QR scan error:', error);
          }
        }
      );

      scannerRef.current = scanner;
      setIsScanning(true);
      console.log('Simple scanner started');
    } catch (error) {
      console.error('Simple scanner error:', error);
      onScanError?.('Không thể khởi động camera');
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
        .then(() => {
          scannerRef.current = null;
          setIsScanning(false);
        })
        .catch(console.error);
    }
  };

  return (
    <div className="w-full">
      <div 
        id="qr-reader-simple" 
        className="w-full min-h-[300px] bg-gray-100 rounded-lg"
        style={{ minHeight: '300px' }}
      />
      
      {isActive && (
        <div className="mt-4 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 font-medium mb-1">
              📱 Hướng camera vào mã QR
            </p>
            <p className="text-xs text-blue-600">
              Phiên bản đơn giản - ít lỗi hơn
            </p>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          #qr-reader-simple video {
            width: 100% !important;
            height: auto !important;
            border-radius: 8px !important;
          }
          
          #qr-reader-simple canvas {
            width: 100% !important;
            height: auto !important;
            border-radius: 8px !important;
          }
        `
      }} />
    </div>
  );
};

export default QRScannerSimple;