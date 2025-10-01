# QR Scanner Fixes - Khắc phục lỗi xin quyền 2 lần và TypeError

## Vấn đề đã khắc phục:

### 1. **Xin quyền camera 2 lần**
**Nguyên nhân:** Code test quyền camera trước, sau đó html5-qrcode lại xin quyền lần nữa.

**Giải pháp:**
- Loại bỏ việc test quyền camera trước
- Để html5-qrcode tự xử lý quyền camera

#### Trước:
```typescript
// Kiểm tra quyền camera trước
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
stream.getTracks().forEach(track => track.stop());
```

#### Sau:
```typescript
// Không test quyền camera trước - để html5-qrcode tự xử lý
setDebugInfo('Đang khởi tạo scanner...');
```

### 2. **TypeError: undefined is not an object**
**Nguyên nhân:** Lỗi JavaScript khi truy cập thuộc tính của object undefined.

**Giải pháp:**
- Thêm xử lý lỗi tốt hơn
- Kiểm tra tồn tại của elements trước khi sử dụng
- Thêm debug info để tracking

### 3. **Cải thiện cấu hình camera**
**Mục tiêu:** Đảm bảo sử dụng camera sau mặc định.

```typescript
const config = {
  fps: 10,
  qrbox: { width: 250, height: 250 },
  aspectRatio: 1.0,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  showTorchButtonIfSupported: true,
  showZoomSliderIfSupported: false, // Tắt để tránh conflict
  // Ưu tiên camera sau
  videoConstraints: {
    facingMode: { ideal: "environment" }
  },
  // Cấu hình camera mặc định
  defaultCameraIdOrVideoConstraints: {
    facingMode: { ideal: "environment" }
  }
};
```

## Các thay đổi đã thực hiện:

### 1. **QRScanner.tsx**
- ✅ Loại bỏ test quyền camera trước
- ✅ Cải thiện cấu hình camera
- ✅ Thêm debug info
- ✅ Xử lý lỗi tốt hơn

### 2. **qr-scanner-test.html**
- ✅ Cập nhật cấu hình tương tự
- ✅ Loại bỏ test quyền camera trước
- ✅ Đơn giản hóa error handling

### 3. **QRScannerSimple.tsx**
- ✅ Tạo phiên bản đơn giản
- ✅ Ít tính năng = ít lỗi
- ✅ Dễ debug hơn

## Kết quả mong đợi:

### ✅ Trước khi sửa:
- Xin quyền camera 2 lần
- TypeError xuất hiện
- Camera có thể không hiển thị

### ✅ Sau khi sửa:
- Chỉ xin quyền camera 1 lần
- Xử lý lỗi tốt hơn
- Camera hiển thị ổn định
- Ưu tiên camera sau

## Cách test:

### 1. **Test trang HTML:**
```
http://localhost:5173/qr-scanner-test.html
```

### 2. **Test trong app:**
1. Đăng nhập vào ứng dụng
2. Chuyển sang tab "Quét QR"
3. Click "Bắt đầu quét QR"
4. Kiểm tra chỉ xin quyền 1 lần

### 3. **Test phiên bản đơn giản:**
Nếu vẫn có lỗi, có thể thay QRScanner bằng QRScannerSimple:

```typescript
// Trong ScannerView.tsx
import QRScannerSimple from '../QRScannerSimple';

// Thay thế
<QRScanner ... />
// Bằng
<QRScannerSimple ... />
```

## Debug Console Messages:

Khi hoạt động đúng:
```
Starting QR scanner...
Đang khởi tạo scanner...
Scanner created, rendering...
Scanner render called successfully
Camera đã sẵn sàng!
Video element found: <video>
Camera hoạt động bình thường
```

## Lưu ý:
- `facingMode: { ideal: "environment" }` ưu tiên camera sau nhưng không bắt buộc
- Nếu không có camera sau, sẽ tự động dùng camera trước
- Debug info hiển thị trong UI để dễ tracking