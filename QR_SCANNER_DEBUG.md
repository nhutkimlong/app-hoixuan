# QR Scanner Debug Guide

## Vấn đề hiện tại
Camera có quyền truy cập nhưng không có khu vực hiển thị để quét QR code.

## Các bước đã thực hiện để sửa lỗi:

### 1. Cải thiện QRScanner Component
- ✅ Thêm CSS styling để đảm bảo camera hiển thị đúng
- ✅ Thêm loading state và fallback UI
- ✅ Cải thiện cấu hình scanner với videoConstraints
- ✅ Thêm timeout để đảm bảo DOM sẵn sàng
- ✅ Thêm debug logging

### 2. Tạo trang test riêng
- ✅ Tạo file `public/qr-scanner-test.html` để test độc lập

## Cách kiểm tra:

### Phương pháp 1: Test với trang HTML riêng
1. Mở trình duyệt và truy cập: `http://localhost:5173/qr-scanner-test.html`
2. Click "Bắt đầu Scanner"
3. Cho phép truy cập camera
4. Kiểm tra xem camera có hiển thị không

### Phương pháp 2: Test trong ứng dụng chính
1. Chạy ứng dụng: `npm run dev`
2. Đăng nhập vào ứng dụng
3. Chuyển sang tab "Quét QR"
4. Click "Bắt đầu quét QR"
5. Kiểm tra console để xem debug messages

## Debug Console Messages
Khi scanner hoạt động đúng, bạn sẽ thấy:
```
Starting QR scanner...
Camera permission granted, stream: MediaStream {...}
Scanner created, rendering...
Scanner started successfully
```

## Các vấn đề có thể gặp:

### 1. Camera không hiển thị
- **Nguyên nhân**: CSS không được áp dụng đúng
- **Giải pháp**: Kiểm tra DevTools để xem element #qr-reader có được tạo không

### 2. Lỗi quyền camera
- **Nguyên nhân**: Trình duyệt chặn quyền camera
- **Giải pháp**: Kiểm tra icon camera trên address bar và cho phép

### 3. Scanner không khởi tạo
- **Nguyên nhân**: html5-qrcode library chưa load
- **Giải pháp**: Kiểm tra Network tab trong DevTools

## Kiểm tra bổ sung:

### 1. Kiểm tra element DOM
```javascript
// Mở Console và chạy:
document.getElementById('qr-reader')
// Phải trả về element, không phải null
```

### 2. Kiểm tra CSS
```javascript
// Kiểm tra style của element:
const element = document.getElementById('qr-reader');
console.log(window.getComputedStyle(element));
```

### 3. Kiểm tra camera permissions
```javascript
// Kiểm tra quyền camera:
navigator.permissions.query({name: 'camera'}).then(result => {
  console.log('Camera permission:', result.state);
});
```

## Nếu vẫn không hoạt động:

1. Thử trên trình duyệt khác (Chrome, Firefox, Safari)
2. Kiểm tra xem có extension nào chặn camera không
3. Thử trên thiết bị khác
4. Kiểm tra console để xem có lỗi JavaScript nào không

## Liên hệ hỗ trợ:
Nếu vẫn gặp vấn đề, hãy cung cấp:
- Trình duyệt và phiên bản
- Thông báo lỗi trong console
- Screenshot của trang