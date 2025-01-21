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

export function generateMockMetrics(): HealthMetrics {
  return {
    steps: Math.floor(Math.random() * 8000) + 2000,
    distance: parseFloat((Math.random() * 5 + 1).toFixed(2)),
    calories: Math.floor(Math.random() * 300) + 100,
    activeMinutes: Math.floor(Math.random() * 45) + 15
  };
}

export function generateMockLeaderboard(): LeaderboardEntry[] {
  const users = [
    { name: 'Alex', baseScore: 850 },
    { name: 'Sam', baseScore: 920 },
    { name: 'Jamie', baseScore: 780 },
    { name: 'Taylor', baseScore: 660 },
    { name: 'Jordan', baseScore: 710 },
    { name: 'Casey', baseScore: 900 },
  ];

  return users
    .map((user, index) => ({
      userId: `user-${index}`,
      name: user.name,
      score: user.baseScore + Math.floor(Math.random() * 100),
      rank: index + 1
    }))
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({ ...user, rank: index + 1 }));
}