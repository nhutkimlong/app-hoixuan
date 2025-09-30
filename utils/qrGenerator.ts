// Utility để tạo QR code cho các landmarks
// Trong thực tế, bạn sẽ cần một service để generate QR codes thực sự

export const generateQRCodeURL = (landmarkId: string): string => {
  // Sử dụng QR Server API để tạo QR code
  const baseURL = 'https://api.qrserver.com/v1/create-qr-code/';
  const params = new URLSearchParams({
    size: '200x200',
    data: landmarkId,
    format: 'png',
    bgcolor: 'ffffff',
    color: '000000',
    margin: '10'
  });
  
  return `${baseURL}?${params.toString()}`;
};

export const generateQRCodeDataURL = (landmarkId: string): string => {
  // Tạo data URL cho QR code (có thể dùng để download)
  return `data:text/plain;charset=utf-8,${encodeURIComponent(landmarkId)}`;
};

// Hàm để validate QR code data
export const validateQRData = (data: string, validLandmarkIds: string[]): boolean => {
  return validLandmarkIds.includes(data);
};

// Hàm để extract landmark ID từ QR data (nếu có format phức tạp hơn)
export const extractLandmarkId = (qrData: string): string => {
  // Hiện tại đơn giản chỉ return data trực tiếp
  // Trong tương lai có thể parse JSON hoặc URL
  return qrData.trim();
};