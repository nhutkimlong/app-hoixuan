
import React, { useState } from 'react';
import type { Player } from '../types';
import { NavigationTab } from '../types';
import MapView from './views/MapView';
import ScannerView from './views/ScannerView';

import ProfileView from './views/ProfileView';
import { MapIcon, QrCodeIcon, UserIcon } from './icons/NavIcons';

interface MainLayoutProps {
  player: Player;
  score: number;
  progress: number;
  onCheckIn: (landmarkId: string) => void;
  onLogout: () => void;
  canGetCertificate: boolean;
  certificateLevel: any;
  landmarkCount: number;
}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.Map);

  const handleCheckInPrompt = (landmarkId: string) => {
    // Chuyển sang tab Scanner khi người dùng muốn check-in
    setActiveTab(NavigationTab.Scan);
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.Map:
        return (
          <MapView 
            checkedInLandmarks={props.player.checkedInLandmarks} 
            onCheckInPrompt={handleCheckInPrompt}
          />
        );
      case NavigationTab.Scan:
        return <ScannerView onCheckIn={props.onCheckIn} checkedInLandmarks={props.player.checkedInLandmarks} />;

      case NavigationTab.Profile:
        return <ProfileView {...props} />;
      default:
        return (
          <MapView 
            checkedInLandmarks={props.player.checkedInLandmarks} 
            onCheckInPrompt={handleCheckInPrompt}
          />
        );
    }
  };

  const navItems = [
    { id: NavigationTab.Map, label: 'Bản Đồ', icon: <MapIcon /> },
    { id: NavigationTab.Scan, label: 'Quét QR', icon: <QrCodeIcon /> },
    { id: NavigationTab.Profile, label: 'Hồ Sơ', icon: <UserIcon /> },
  ];

  return (
    <div className="w-full max-w-lg mx-auto h-screen flex flex-col">
      <main className="flex-grow overflow-y-auto pb-24">
        {renderContent()}
      </main>
      
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 w-full max-w-lg mx-auto bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-t-lg">
        <div className="flex justify-around h-16">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-full pt-1 transition-colors duration-300 ${activeTab === item.id ? 'text-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
            >
              <div className="w-6 h-6 mb-1">{item.icon}</div>
              <span className={`text-xs font-semibold ${activeTab === item.id ? 'font-bold' : ''}`}>{item.label}</span>
              {activeTab === item.id && <div className="w-8 h-1 bg-orange-600 rounded-full absolute -top-0.5"></div>}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
