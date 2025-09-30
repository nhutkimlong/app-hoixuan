
import React, { useState } from 'react';
import type { Player } from '../../types';
import CertificateModal from '../CertificateModal';
import { LogoIcon } from '../icons/LogoIcon';
import { TOTAL_LANDMARKS } from '../../constants';

interface ProfileViewProps {
  player: Player;
  score: number;
  progress: number;
  onLogout: () => void;
  canGetCertificate: boolean;
  certificateLevel: any;
  landmarkCount: number;
}

const ProfileView: React.FC<ProfileViewProps> = ({ player, score, progress, onLogout, canGetCertificate, certificateLevel, landmarkCount }) => {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <div className="p-4 bg-gray-50 min-h-full pt-8 text-center">
      <div className="inline-block mb-4">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
            <div className="w-20 h-20">
                <LogoIcon />
            </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800">{player.name}</h1>
      <p className="text-gray-500 mb-6">Nhà thám hiểm Bính Ngọ</p>

      {/* Certificate Level Badge */}
      {certificateLevel && (
        <div className="mb-6">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full text-white font-bold shadow-lg"
            style={{ backgroundColor: certificateLevel.color }}
          >
            <span className="text-2xl mr-2">{certificateLevel.icon}</span>
            <span>{certificateLevel.name}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{certificateLevel.description}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center mb-8">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <p className="text-2xl font-bold text-orange-600">{score}</p>
          <p className="text-xs text-gray-500">Điểm số</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <p className="text-2xl font-bold text-orange-600">{landmarkCount}/{TOTAL_LANDMARKS}</p>
          <p className="text-xs text-gray-500">Địa điểm</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <p className="text-2xl font-bold text-orange-600">{progress}%</p>
          <p className="text-xs text-gray-500">Hoàn thành</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-gray-700">Tiến độ khám phá</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="space-y-4">
         <button
          onClick={() => setShowCertificate(true)}
          disabled={!canGetCertificate}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {canGetCertificate 
            ? `${certificateLevel?.icon} Nhận Chứng Nhận ${certificateLevel?.name}` 
            : `Cần ${certificateLevel?.minLandmarks || 5} địa điểm để nhận chứng nhận`
          }
        </button>

        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
        >
          Chơi Lại
        </button>
      </div>

      {showCertificate && canGetCertificate && (
        <CertificateModal 
          playerName={player.name} 
          score={score}
          landmarkCount={landmarkCount}
          onClose={() => setShowCertificate(false)} 
        />
      )}
    </div>
  );
};

export default ProfileView;
