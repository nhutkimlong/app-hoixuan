
import React from 'react';
import { LEADERBOARD_DATA } from '../../constants';
import { TrophyIcon } from '../icons/ActionIcons';

const LeaderboardView: React.FC = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <div className="text-center mb-6 pt-4">
         <div className="inline-block p-4 bg-yellow-100 rounded-full mb-3">
          <div className="w-12 h-12 text-yellow-500">
            <TrophyIcon />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Bảng Xếp Hạng</h1>
        <p className="text-gray-600 mt-2">
          Vinh danh những nhà chinh phục xuất sắc nhất!
        </p>
      </div>

      <div className="space-y-3">
        {LEADERBOARD_DATA.map((entry, index) => (
          <div
            key={entry.rank}
            className={`flex items-center p-3 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 ${
              index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-300' : 
              index === 1 ? 'bg-gradient-to-r from-gray-300 to-slate-200' :
              index === 2 ? 'bg-gradient-to-r from-orange-400 to-amber-300' :
              'bg-white'
            }`}
          >
            <div className="flex-shrink-0 w-10 text-center">
              <span className={`text-xl font-bold ${
                index < 3 ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {entry.rank}
              </span>
            </div>
            <img 
              src={entry.avatar} 
              alt={entry.name} 
              className="w-12 h-12 rounded-full mx-4 border-2 border-white shadow-sm"
            />
            <div className="flex-grow">
              <p className="font-bold text-gray-800">{entry.name}</p>
            </div>
            <div className="text-right">
              <p className={`font-bold text-lg ${
                index < 3 ? 'text-orange-900' : 'text-orange-600'
              }`}>
                {entry.score}
              </p>
              <p className="text-xs text-gray-600">điểm</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardView;
