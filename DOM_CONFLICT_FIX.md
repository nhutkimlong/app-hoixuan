# DOM Conflict Fix - Khắc phục lỗi React DOM

## Vấn đề gốc:
```
NotFoundError: Failed to execute 'removeChild' on 'Node': 
The node to be removed is not a child of this node.
```

## Nguyên nhân:
1. **html5-qrcode** tự tạo và xóa DOM elements
2. **React** cũng quản lý DOM elements
3. **Conflict** xảy ra khi cả hai cùng thao tác với cùng một element
4. **Timing issue** khi component unmount nhưng html5-qrcode vẫn đang hoạt động

## Giải pháp đã áp dụng:

### 1. **QRScannerFixed.tsx** - Phiên bản cải tiến
- ✅ Unique ID cho mỗi scanner instance
- ✅ Manual DOM cleanup
- ✅ Better error handling
- ✅ Proper timing for start/stop

#### Key Features:
```typescript
// Unique ID để tránh conflict
const [scannerId] = useState(() => `qr-reader-${Date.now()}`);

// Manual cleanup function
const cleanupScanner = () => {
  if (scannerRef.current) {
    try {
      scannerRef.current.clear().catch(() => {});
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
        scannerElement.innerHTML = '';
      } catch (error) {
        console.warn('Manual cleanup warning:', error);
      }
    }
  }
};
```

### 2. **Cải thiện timing**
```typescript
// Delay stop để tránh DOM conflict
setTimeout(() => stopScanner(), 200);

// Đợi DOM sẵn sàng trước khi khởi tạo
setTimeout(() => {
  // Initialize scanner
}, 300);
```

### 3. **Better error handling**
```typescript
useEffect(() => {
  // ... logic

  return () => {
    cleanupScanner();
    setIsScanning(false);
    setIsLoading(false);
  };
}, [isActive]); // Chỉ depend vào isActive
```

## So sánh các phiên bản:

### QRScanner.tsx (Original)
- ❌ DOM conflict issues
- ❌ React removeChild errors
- ❌ Popup gây trắng website

### QRScannerSimple.tsx (Simplified)
- ✅ Ít tính năng = ít lỗi
- ⚠️ Vẫn có thể có DOM conflict
- ✅ Dễ debug

### QRScannerFixed.tsx (Recommended)
- ✅ Khắc phục DOM conflict
- ✅ Unique IDs
- ✅ Manual cleanup
- ✅ Better timing
- ✅ Robust error handling

## Cách sử dụng:

### Trong ScannerView.tsx:
```typescript
import QRScannerFixed from '../QRScannerFixed';

// Thay thế
<QRScanner ... />
// Bằng
<QRScannerFixed ... />
```

## Testing:

### 1. **Test DOM cleanup:**
1. Bắt đầu quét QR
2. Chuyển tab khác (Map/Profile)
3. Quay lại tab Scanner
4. Kiểm tra console không có lỗi DOM

### 2. **Test multiple start/stop:**
1. Bắt đầu quét → Dừng quét
2. Lặp lại nhiều lần
3. Kiểm tra không có memory leak

### 3. **Test camera permission:**
1. Deny permission → Allow permission
2. Kiểm tra scanner hoạt động bình thường

## Debug Console Messages:

### Hoạt động bình thường:
```
Starting QR scanner...
Đang khởi động scanner...
Camera đã sẵn sàng!
QR code đã quét thành công!
Đang dừng scanner...
Scanner đã dừng
```

### Có lỗi:
```
Scanner initialization failed: [error details]
Lỗi khởi tạo: [error message]
Manual cleanup warning: [cleanup details]
```

## Lưu ý quan trọng:

1. **Unique IDs**: Mỗi scanner instance có ID riêng
2. **Manual cleanup**: Không chỉ dựa vào html5-qrcode cleanup
3. **Error tolerance**: Ignore cleanup errors để tránh crash
4. **Timing**: Delay các operations để tránh race conditions

## Kết quả mong đợi:
- ✅ Không còn lỗi DOM removeChild
- ✅ Không còn popup gây trắng website  
- ✅ Scanner hoạt động ổn định
- ✅ Proper cleanup khi chuyển tab