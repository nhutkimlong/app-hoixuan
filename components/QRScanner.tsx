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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      console.log('Starting QR scanner...');
      
      // Kiểm tra quyền camera trước
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera permission granted, stream:', stream);
      stream.getTracks().forEach(track => track.stop()); // Dừng stream test
      
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
        // Đảm bảo camera hiển thị đầy đủ
        videoConstraints: {
          facingMode: "environment", // Camera sau
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        // Cấu hình hiển thị
        rememberLastUsedCamera: true,
        useBarCodeDetectorIfSupported: true
      };

      // Đợi một chút để đảm bảo DOM đã sẵn sàng
      setTimeout(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", config, false);
        console.log('Scanner created, rendering...');
        
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
        setIsLoading(false);
        console.log('Scanner started successfully');
      }, 100);
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
      setIsLoading(false);
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
        id="qr-reader" 
        className="w-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden relative"
        style={{ 
          minHeight: '300px',
          width: '100%',
          position: 'relative'
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang khởi động camera...</p>
            </div>
          </div>
        )}
        
        {isActive && !isLoading && !isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center text-gray-500">
              <p>Khu vực camera sẽ hiển thị ở đây</p>
            </div>
          </div>
        )}
      </div>
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
      
      {/* CSS để đảm bảo camera hiển thị đúng */}
      {/* Global CSS để đảm bảo camera hiển thị đúng */}
      {isActive && (
        <style dangerouslySetInnerHTML={{
          __html: `
            #qr-reader video {
              width: 100% !important;
              height: auto !important;
              border-radius: 8px !important;
              max-width: 100% !important;
            }
            
            #qr-reader canvas {
              width: 100% !important;
              height: auto !important;
              border-radius: 8px !important;
              max-width: 100% !important;
            }
            
            #qr-reader > div {
              border: none !important;
              width: 100% !important;
            }
            
            #qr-reader__dashboard {
              background: transparent !important;
            }
            
            #qr-reader__dashboard_section {
              background: white !important;
              border-radius: 8px !important;
              margin-top: 10px !important;
              padding: 10px !important;
            }
            
            #qr-reader__scan_region {
              width: 100% !important;
            }
            
            #qr-reader__scan_region video {
              width: 100% !important;
              height: auto !important;
            }
          `
        }} />
      )}
    </div>
  );
};

export default QRScanner;