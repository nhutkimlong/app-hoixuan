import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

interface QRScannerFixedProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
  isActive: boolean;
}

const QRScannerFixed: React.FC<QRScannerFixedProps> = ({ onScanSuccess, onScanError, isActive }) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [scannerId] = useState(() => `qr-reader-${Date.now()}`); // Unique ID

  // Cleanup function
  const cleanupScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear().catch(() => {
          // Ignore cleanup errors
        });
      } catch (error) {
        // Ignore cleanup errors
      } finally {
        scannerRef.current = null;
      }
    }
    
    // Manual DOM cleanup
    if (containerRef.current) {
      const scannerElement = containerRef.current.querySelector(`#${scannerId}`);
      if (scannerElement) {
        try {
          // Clear all child elements
          scannerElement.innerHTML = '';
        } catch (error) {
          console.warn('Manual cleanup warning:', error);
        }
      }
    }
  };

  useEffect(() => {
    if (isActive && !isScanning) {
      startScanner();
    } else if (!isActive && isScanning) {
      stopScanner();
    }

    return () => {
      cleanupScanner();
      setIsScanning(false);
      setIsLoading(false);
    };
  }, [isActive]);

  const startScanner = async () => {
    try {
      setIsLoading(true);
      setDebugInfo('Đang khởi động scanner...');
      console.log('Starting QR scanner...');
      
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: false,
        videoConstraints: {
          facingMode: { ideal: "environment" }
        }
      };

      // Đợi DOM sẵn sàng
      setTimeout(() => {
        try {
          const readerElement = document.getElementById(scannerId);
          if (!readerElement) {
            throw new Error('QR reader element not found');
          }

          const scanner = new Html5QrcodeScanner(scannerId, config, false);
          
          scanner.render(
            (decodedText: string) => {
              console.log('QR Code detected:', decodedText);
              setDebugInfo('QR code đã quét thành công!');
              onScanSuccess(decodedText);
              // Delay stop để tránh DOM conflict
              setTimeout(() => stopScanner(), 200);
            },
            (error: string) => {
              if (!error.includes('NotFoundException')) {
                console.warn('QR scan error:', error);
              }
            }
          );

          scannerRef.current = scanner;
          setIsScanning(true);
          setIsLoading(false);
          setDebugInfo('Camera đã sẵn sàng!');
          
        } catch (initError) {
          console.error('Scanner initialization failed:', initError);
          setDebugInfo(`Lỗi khởi tạo: ${initError instanceof Error ? initError.message : 'Unknown error'}`);
          setIsLoading(false);
          onScanError?.('Lỗi khởi tạo scanner. Vui lòng thử lại.');
        }
      }, 300);
      
    } catch (error) {
      console.error('Scanner error:', error);
      setDebugInfo(`Lỗi: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
      onScanError?.('Không thể khởi động camera');
    }
  };

  const stopScanner = () => {
    setDebugInfo('Đang dừng scanner...');
    cleanupScanner();
    setIsScanning(false);
    setDebugInfo('Scanner đã dừng');
  };

  return (
    <div className="w-full" ref={containerRef}>
      <div 
        id={scannerId}
        className="w-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden relative"
        style={{ 
          minHeight: '300px',
          width: '100%',
          position: 'relative'
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang khởi động camera...</p>
            </div>
          </div>
        )}
        
        {isActive && !isLoading && !isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
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
              Phiên bản cải tiến - tránh lỗi DOM
            </p>
            {debugInfo && (
              <p className="text-xs text-gray-500 mt-2 italic">
                {debugInfo}
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* CSS để đảm bảo camera hiển thị đúng */}
      {isActive && (
        <style dangerouslySetInnerHTML={{
          __html: `
            #${scannerId} video {
              width: 100% !important;
              height: auto !important;
              border-radius: 8px !important;
              max-width: 100% !important;
              display: block !important;
            }
            
            #${scannerId} canvas {
              width: 100% !important;
              height: auto !important;
              border-radius: 8px !important;
              max-width: 100% !important;
              display: block !important;
            }
            
            #${scannerId} > div {
              border: none !important;
              width: 100% !important;
              background: transparent !important;
            }
            
            #${scannerId}__dashboard {
              background: white !important;
              border-radius: 8px !important;
              margin-top: 10px !important;
              padding: 10px !important;
            }
          `
        }} />
      )}
    </div>
  );
};

export default QRScannerFixed;