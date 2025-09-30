
import React, { useEffect, useState } from 'react';
import type { Landmark } from '../types';
import Confetti from 'react-confetti';

interface CheckinModalProps {
  landmark: Landmark;
  onClose: () => void;
}

const CheckinModal: React.FC<CheckinModalProps> = ({ landmark, onClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Lấy kích thước cửa sổ để confetti toàn màn hình
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={400}
        gravity={0.15}
      />
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-center max-w-xs sm:max-w-sm w-full mx-auto animate-fade-in-up">
        {/* Tiêu đề thành công - responsive */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-green-600 leading-tight">
            Check-in
          </h2>
          <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-2 leading-tight">
            Thành Công!
          </h2>
        </div>
        
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 px-2">
          Bạn đã khám phá địa điểm:
        </p>
        
        {/* Tên địa điểm - responsive và xuống dòng tự động */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600 mb-4 leading-tight px-2 break-words">
          {landmark.name}
        </h3>
        
        <img
          src={landmark.image}
          alt={landmark.name}
          className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4"
        />
        
        <div className="bg-yellow-100 text-yellow-800 text-lg sm:text-xl md:text-2xl font-bold py-2 sm:py-3 rounded-lg mb-4 sm:mb-6">
          +{landmark.points} ĐIỂM
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-orange-600 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg hover:bg-orange-700 active:scale-95 transform transition-all duration-300 text-sm sm:text-base"
        >
          Tiếp Tục Hành Trình
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CheckinModal;
