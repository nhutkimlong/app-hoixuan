import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
  isActive: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError, isActive }) => {
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

  const startScanner = async () => {
    try {
      // Kiểm tra quyền camera trước
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Dừng stream test
      
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
      };

      const scanner = new Html5QrcodeScanner("qr-reader", config, false);
      
      scanner.render(
        (decodedText: string) => {
          console.log('QR Code detected:', decodedText);
          onScanSuccess(decodedText);
          stopScanner();
        },
        (error: string) => {
          // Chỉ log lỗi nghiêm trọng, bỏ qua lỗi thường xuyên
          if (!error.includes('NotFoundException')) {
            console.warn('QR scan error:', error);
            onScanError?.(error);
          }
        }
      );

      scannerRef.current = scanner;
      setIsScanning(true);
    } catch (error) {
      console.error('Camera access error:', error);
      let errorMessage = 'Không thể truy cập camera';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Bạn cần cho phép truy cập camera để quét QR code';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'Không tìm thấy camera trên thiết bị';
        } else if (error.name === 'NotSupportedError') {
          errorMessage = 'Trình duyệt không hỗ trợ camera';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Camera đang được sử dụng bởi ứng dụng khác';
        }
      }
      
      onScanError?.(errorMessage);
      setIsScanning(false);
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
      <div id="qr-reader" className="w-full"></div>
      {isActive && (
        <div className="mt-4 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 font-medium mb-1">
              📱 Hướng camera vào mã QR
            </p>
            <p className="text-xs text-blue-600">
              Giữ camera ổn định và đảm bảo QR code nằm trong khung vuông
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;