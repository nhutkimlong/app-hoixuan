# Tính Năng Định Vị Người Dùng

## Tổng Quan
Đã thêm tính năng định vị người dùng trên bản đồ với các chức năng thông minh để hỗ trợ trải nghiệm check-in tại Núi Bà Đen.

## Các Tính Năng Mới

### 1. 🎯 Nút Định Vị
- **Vị trí**: Góc dưới bên phải của bản đồ
- **Icon**: Biểu tượng vị trí với animation xoay khi đang tải
- **Chức năng**: Lấy vị trí GPS hiện tại của người dùng
- **Trạng thái**: 
  - Bình thường: Icon tĩnh màu xanh
  - Đang tải: Icon có hiệu ứng pulse
  - Lỗi: Hiển thị thông báo lỗi

### 2. 📍 Marker Vị Trí Người Dùng
- **Hiển thị**: Chấm tròn màu xanh với hiệu ứng pulse
- **Animation**: Hiệu ứng ping để dễ nhận biết
- **Popup**: Hiển thị tọa độ chính xác của người dùng

### 3. 📏 Tính Khoảng Cách
- **Hiển thị**: Khoảng cách từ vị trí người dùng đến từng điểm check-in
- **Đơn vị**: Mét (< 1km) hoặc Kilomet (≥ 1km)
- **Vị trí**: Trong popup của mỗi landmark
- **Màu sắc**: Xanh dương để dễ phân biệt

### 4. ✅ Thông Báo Check-in
- **Điều kiện**: Khi người dùng ở trong bán kính 100m từ điểm check-in
- **Hiển thị**: Thông báo màu xanh lá ở đầu màn hình
- **Nội dung**: Tên điểm, số điểm nhận được
- **Hành động**: Nút "Check-in" chuyển trực tiếp đến tab Scanner
- **Tự động ẩn**: Sau 10 giây hoặc khi người dùng đóng

### 5. 📋 Danh Sách Điểm Gần Nhất
- **Kích hoạt**: Tự động hiện khi định vị thành công
- **Nội dung**: 5 điểm gần nhất với thông tin:
  - Tên điểm
  - Mô tả ngắn
  - Khoảng cách
  - Số điểm
  - Trạng thái (đã check-in/có thể check-in/chưa thể)
- **Tương tác**: Click để focus vào điểm trên bản đồ

## Cách Sử Dụng

### Bước 1: Bật Định Vị
1. Mở tab "Bản Đồ"
2. Nhấn nút định vị (📍) ở góc dưới bên phải
3. Cho phép truy cập vị trí khi trình duyệt yêu cầu

### Bước 2: Xem Thông Tin
- Bản đồ sẽ tự động zoom đến vị trí của bạn
- Danh sách điểm gần nhất sẽ hiển thị
- Khoảng cách đến các điểm sẽ được cập nhật trong popup

### Bước 3: Check-in Thông Minh
- Khi đến gần điểm (< 100m), thông báo sẽ xuất hiện
- Nhấn "Check-in" để chuyển đến tab Scanner
- Quét mã QR để hoàn tất check-in

## Xử Lý Lỗi

### Lỗi Quyền Truy Cập
- **Nguyên nhân**: Người dùng từ chối quyền truy cập vị trí
- **Giải pháp**: Hướng dẫn bật lại trong cài đặt trình duyệt

### Lỗi Không Khả Dụng
- **Nguyên nhân**: GPS không hoạt động hoặc tín hiệu yếu
- **Giải pháp**: Di chuyển ra ngoài trời, kiểm tra cài đặt GPS

### Lỗi Timeout
- **Nguyên nhân**: Mất quá nhiều thời gian để lấy vị trí
- **Giải pháp**: Thử lại sau hoặc kiểm tra kết nối mạng

## Tối Ưu Hóa

### Hiệu Suất
- Sử dụng `enableHighAccuracy: true` cho độ chính xác cao
- Timeout 10 giây để tránh chờ quá lâu
- Cache vị trí trong 1 phút để giảm số lần gọi GPS

### Trải Nghiệm
- Animation mượt mà khi zoom đến vị trí
- Thông báo tự động ẩn để không làm phiền
- Màu sắc phân biệt rõ ràng cho các trạng thái

### Bảo Mật
- Không lưu trữ vị trí người dùng
- Chỉ sử dụng vị trí để tính khoảng cách
- Tuân thủ quyền riêng tư của trình duyệt

## Files Liên Quan

### Components
- `components/UserLocationButton.tsx` - Nút định vị
- `components/LocationNotification.tsx` - Thông báo check-in
- `components/NearbyLandmarks.tsx` - Danh sách điểm gần
- `components/views/MapView.tsx` - Bản đồ chính (đã cập nhật)

### Hooks
- `hooks/useGeolocation.ts` - Hook quản lý GPS

### Utils
- `utils/distanceCalculator.ts` - Tính toán khoảng cách

### Icons
- `components/icons/ActionIcons.tsx` - Thêm LocationIcon, MyLocationIcon

### Types
- `types.ts` - Thêm UserLocation interface

## Tương Lai

### Cải Tiến Có Thể
1. **Theo dõi lộ trình**: Ghi lại đường đi của người dùng
2. **Gợi ý tối ưu**: Đề xuất thứ tự check-in hiệu quả nhất
3. **Chia sẻ vị trí**: Cho phép chia sẻ vị trí với bạn bè
4. **Offline mode**: Hoạt động khi không có mạng
5. **AR integration**: Thực tế ảo để tìm điểm check-in