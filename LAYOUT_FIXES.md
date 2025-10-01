# Layout Fixes - Map Area & Navigation

## Vấn đề đã khắc phục
Khu vực bản đồ và thanh navigation dài hơn màn hình hiển thị, gây ra việc không thể xem đầy đủ cả hai phần.

## Các thay đổi đã thực hiện:

### 1. Cập nhật MapView Component
**File:** `components/views/MapView.tsx`

#### Trước:
```tsx
<MapContainer className="h-[calc(100vh-4rem)]" />
```

#### Sau:
```tsx
<MapContainer className="map-container" />
```

### 2. Tạo CSS Utilities
**File:** `public/index.css`

Thêm các class CSS mới:
- `.map-container`: Tính toán chiều cao phù hợp với layout
- `.content-area`: Cho các khu vực nội dung có scroll
- `.map-overlay`: Vị trí overlay trên bản đồ
- Media queries cho màn hình nhỏ

### 3. Cải thiện Overlay Positioning
- Nút định vị người dùng: Sử dụng class `.map-overlay`
- Danh sách điểm gần: Điều chỉnh vị trí để không bị che khuất

## Kết quả:

### ✅ Trước khi sửa:
- Map container: `calc(100vh - 4rem)` = Chỉ trừ navigation (4rem)
- Không tính padding và margin khác
- Overlay bị che khuất bởi navigation

### ✅ Sau khi sửa:
- Map container: `calc(100vh - 8rem)` = Trừ navigation + padding
- Minimum height để đảm bảo usability
- Responsive cho màn hình nhỏ
- Overlay được định vị chính xác

## Responsive Design:

### Desktop/Tablet (> 600px height):
```css
.map-container {
  height: calc(100vh - 8rem);
  min-height: 400px;
}
```

### Mobile (≤ 600px height):
```css
.map-container {
  height: calc(100vh - 6rem);
  min-height: 300px;
}
```

## Layout Structure:

```
┌─────────────────────────┐
│     Main Content        │ ← flex-grow, pb-24
│                         │
│  ┌─────────────────┐    │
│  │   Map Container │    │ ← map-container class
│  │                 │    │
│  │  ┌─────────────┐│    │
│  │  │   Leaflet   ││    │ ← 100% height
│  │  │     Map     ││    │
│  │  └─────────────┘│    │
│  │                 │    │
│  │  [Overlays]     │    │ ← map-overlay class
│  └─────────────────┘    │
│                         │
└─────────────────────────┘
┌─────────────────────────┐
│    Bottom Navigation    │ ← fixed, h-16
└─────────────────────────┘
```

## Testing:

1. **Desktop**: Map hiển thị đầy đủ, không bị cắt
2. **Mobile**: Map vẫn có kích thước hợp lý
3. **Overlays**: Button và popup không bị che khuất
4. **Navigation**: Luôn hiển thị ở bottom

## Lưu ý:
- CSS được load từ `public/index.css` trong `index.html`
- Sử dụng `!important` cho Leaflet để override default styles
- Media queries đảm bảo responsive trên mọi thiết bị