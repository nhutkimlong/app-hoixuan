// FIX: Import 'React' to make types like React.Dispatch available.
import React, { useState, useEffect } from 'react';

// Custom hook để quản lý state đồng bộ với localStorage
// Giúp lưu trữ dữ liệu người dùng ngay cả khi họ đóng/mở lại trình duyệt
export function useLocalStorage<T,>(key: string, initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Lấy giá trị từ localStorage hoặc sử dụng giá trị khởi tạo
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse JSON đã lưu hoặc trả về giá trị khởi tạo nếu không có
      return item ? JSON.parse(item) : (typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Sử dụng useEffect để cập nhật localStorage mỗi khi state thay đổi
  useEffect(() => {
    try {
      // Lưu state vào localStorage dưới dạng chuỗi JSON
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}