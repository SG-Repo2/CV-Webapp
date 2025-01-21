import { useState } from 'react';
import { useDemoData } from '../../contexts/DemoDataContext';
import { ArrowLeft, Medal } from 'lucide-react';

type TimeFrame = 'daily' | 'weekly' | 'monthly';

export function LeaderboardScreen() {
  const { leaderboardData } = useDemoData();
  const [timeframe, setTimeframe] = useState<TimeFrame>('daily');

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow mb-6">
        <button className="p-2 rounded hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Leaderboard</h1>
        <div className="w-8" /> {/* Spacer for alignment */}
      </header>

      <div className="px-4">
        {/* Time Frame Selector */}
        <div className="mb-6">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as TimeFrame)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 
                     focus:ring-sea-green focus:border-sea-green"
          >
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
          </select>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {leaderboardData[timeframe].map((entry, index) => {
            let bgColor = 'bg-white';
            let accentColor = 'text-gray-900';
            
            if (index === 0) {
              bgColor = 'card-sea-green text-white';
              accentColor = 'text-white';
            } else if (index === 1) {
              bgColor = 'card-light-red text-white';
              accentColor = 'text-white';
            } else if (index === 2) {
              bgColor = 'card-purple text-white';
              accentColor = 'text-white';
            }

            return (
              <div
                key={entry.userId}
                className={`flex items-center justify-between p-4 rounded-xl ${bgColor} transition-transform hover:scale-[1.02]`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${index > 2 ? 'bg-gray-100' : 'bg-white/20'}`}>
                    <span className={`font-bold ${index <= 2 ? 'text-white' : 'text-gray-600'}`}>
                      #{entry.rank}
                    </span>
                  </div>
                  <span className={`font-medium ${accentColor}`}>{entry.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold ${accentColor}`}>{entry.score}</span>
                  <span className={index <= 2 ? 'text-white/80' : 'text-gray-500'}>pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}