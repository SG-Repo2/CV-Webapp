import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: ReactNode;
  color: string;
  goal: number;
}

export function MetricCard({ title, value, unit, icon, color, goal }: MetricCardProps) {
  const progress = Math.min((value / goal) * 100, 100);

  return (
    <div className={`${color} rounded-xl p-6 text-white relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        {icon}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold">
          {value} <span className="text-lg font-normal">{unit}</span>
        </div>
        
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-sm text-white text-opacity-90">
          {progress.toFixed(0)}% of daily goal
        </div>
      </div>
    </div>
  );
}