import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateMockMetrics, generateMockLeaderboard } from '../services/demoDataService';

interface HealthMetrics {
  steps: number;
  distance: number;
  calories: number;
  activeMinutes: number;
}

interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  rank: number;
}

interface DemoDataContextType {
  metrics: HealthMetrics;
  leaderboardData: Record<'daily' | 'weekly' | 'monthly', LeaderboardEntry[]>;
  updateMetrics: (updates: Partial<HealthMetrics>) => void;
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<HealthMetrics>(() => generateMockMetrics());
  const [leaderboardData] = useState<Record<'daily' | 'weekly' | 'monthly', LeaderboardEntry[]>>(() => ({
    daily: generateMockLeaderboard(),
    weekly: generateMockLeaderboard(),
    monthly: generateMockLeaderboard(),
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(current => ({
        ...current,
        steps: current.steps + Math.floor(Math.random() * 100)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DemoDataContext.Provider
      value={{
        metrics,
        leaderboardData,
        updateMetrics: (updates) => setMetrics(current => ({ ...current, ...updates }))
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
}