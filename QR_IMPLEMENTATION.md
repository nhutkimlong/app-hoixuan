# Hướng dẫn sử dụng tính năng QR Code

## Tính năng đã implement

### 1. QR Scanner thực sự
- Sử dụng thư viện `html5-qrcode` để quét QR code bằng camera
- Hỗ trợ torch (đèn flash) và zoom nếu thiết bị hỗ trợ
- Tự động dừng quét khi phát hiện QR code hợp lệ

### 2. Validation QR Code
- Kiểm tra QR code có phải là landmark ID hợp lệ không
- Ngăn check-in trùng lặp
- Hiển thị thông báo lỗi rõ ràng

### 3. QR Code Generator (cho testing)
- Tạo QR code cho từng landmark
- Có thể xem và tải xuống QR code
- Sử dụng API miễn phí để generate QR

## Cách sử dụng

### Cho người dùng:
1. Vào tab "Quét QR"
2. Nhấn "Bắt đầu quét QR"
3. Cho phép truy cập camera
4. Hướng camera vào mã QR tại địa điểm
5. Hệ thống sẽ tự động check-in khi quét thành công

### Cho admin/testing:
1. Nhấn nút "Xem QR" bên cạnh mỗi landmark
2. QR code sẽ hiển thị trong modal
3. Có thể tải xuống QR code để in ra
4. Sử dụng nút "Demo" để test check-in không cần QR

## Cấu trúc file mới

```
components/
├── QRScanner.tsx          # Component quét QR thực sự
├── QRCodeDisplay.tsx      # Modal hiển thị QR code
└── views/
    └── ScannerView.tsx    # Updated với QR scanner

utils/
└── qrGenerator.ts         # Utilities cho QR code
```

## Cài đặt

Thư viện đã được cài đặt:
```bash
npm install html5-qrcode
```

## Lưu ý kỹ thuật

1. **Camera Permission**: App đã có permission camera trong metadata.json
2. **QR Format**: Hiện tại QR chứa trực tiếp landmark ID
3. **Error Handling**: Xử lý lỗi camera, QR không hợp lệ, check-in trùng lặp
4. **Performance**: Scanner tự động dừng sau khi quét thành công

## Tương lai có thể mở rộng

1. **QR Format phức tạp**: JSON với thêm thông tin timestamp, location
2. **Offline QR**: Lưu QR codes locally
3. **Batch QR Generation**: Tạo nhiều QR cùng lúc
4. **QR Analytics**: Theo dõi số lần quét, thời gian quét
5. **Custom QR Design**: QR với logo, màu sắc tùy chỉnh