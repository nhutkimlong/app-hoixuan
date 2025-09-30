
import React, { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface WelcomeScreenProps {
  onLogin: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    } else {
      alert('Vui lòng nhập tên của bạn!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 p-4 text-white">
      <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl max-w-sm sm:max-w-md w-full mx-auto">
        <div className="mx-auto mb-6 h-16 w-16 sm:h-20 sm:w-20">
          <LogoIcon />
        </div>

        {/* Tiêu đề chính - responsive */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Hội Xuân Núi Bà Đen
          </h1>

          {/* Phụ đề */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-orange-100 leading-tight mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Sưu Tầm Kỷ Niệm Bính Ngọ 2026
          </h2>
        </div>

        <div className="mb-6 sm:mb-8 px-2 sm:px-4">
          <p className="text-sm sm:text-base text-orange-50 leading-relaxed text-justify">
            Nhập tên của bạn để bắt đầu hành trình khám phá và thu thập những kỷ niệm độc đáo tại Núi Bà Đen!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 px-2 sm:px-0">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên người chơi..."
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg text-gray-800 bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-shadow duration-300"
            maxLength={25}
          />
          <button
            type="submit"
            className="w-full bg-orange-900 text-white font-bold py-2.5 sm:py-3 px-4 text-sm sm:text-base rounded-lg hover:bg-orange-800 active:scale-95 transform transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            Bắt Đầu Chinh Phục
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
