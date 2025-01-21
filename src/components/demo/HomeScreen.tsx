import { useState } from 'react';
import { useDemoData } from '../../contexts/DemoDataContext';
import { ArrowLeft, Flame, Heart, PersonStanding, Trophy, Target, BarChart, LineChart, Route } from 'lucide-react';
import { MetricModal } from './MetricModal';

export function HomeScreen() {
  const { metrics } = useDemoData();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Mock data with goals
  const metricGoals = {
    steps: { min: 10000, warning: 7500 },
    distance: { min: 8, warning: 6 },
    heart: { min: 60, max: 100, warning: 80 },
    calories: { min: 2000, warning: 1500 }
  };

  const weeklyData = {
    steps: [6800, 7200, 8100, 6500, 10200, 8500, metrics.steps],
    distance: [5.2, 6.8, 8.2, 7.1, 7.8, 6.9, 7.7],
    heart: [72, 68, 75, 70, 68, 71, 48],
    calories: [1850, 2100, 1950, 2200, 1800, 2050, 1900]
  };

  const getModalColor = (metric: string) => {
    switch(metric) {
      case 'steps': return 'card-purple';
      case 'distance': return 'card-sea-green';
      case 'heart': return 'card-light-red';
      case 'calories': return 'card-yellow';
      default: return 'bg-gray-500';
    }
  };

  const getBarColor = (metric: string, value: number) => {
    const goals = metricGoals[metric as keyof typeof metricGoals];
    
    if (metric === 'heart') {
      if (value < goals.min) return 'bg-yellow-400';
      if (value > goals.max) return 'bg-red-500';
      if (value > goals.warning) return 'bg-yellow-400';
      return 'bg-green-500';
    }

    if (value >= goals.min) return 'bg-green-500';
    if (value >= goals.warning) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const renderChart = (metric: string) => {
    const data = weeklyData[metric as keyof typeof weeklyData];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const max = Math.max(...data, metricGoals[metric as keyof typeof metricGoals].min * 1.2);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Goal: {metricGoals[metric as keyof typeof metricGoals].min} 
            {metric === 'steps' ? ' steps' : 
              metric === 'distance' ? ' km' : 
              metric === 'heart' ? ' BPM' : ' cal'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg ${chartType === 'bar' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <BarChart size={20} />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg ${chartType === 'line' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <LineChart size={20} />
            </button>
          </div>
        </div>

        {chartType === 'bar' ? (
          <div className="flex justify-between items-end h-40 relative">
            <div className="absolute inset-x-0 h-px bg-gray-200" style={{
              top: `${100 - (metricGoals[metric as keyof typeof metricGoals].min / max) * 100}%`
            }} />
            {data.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative group">
                  <div 
                    className={`w-6 rounded-t transition-all ${getBarColor(metric, value)}`}
                    style={{ height: `${(value / max) * 160}px` }}
                  />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                    {value.toFixed(metric === 'distance' ? 1 : 0)}
                    {metric === 'steps' ? ' steps' : 
                      metric === 'distance' ? ' km' : 
                      metric === 'heart' ? ' BPM' : ' cal'}
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{days[index]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d={`M ${data.map((value, index) => 
                  `${(index * 100) / (data.length - 1)},${100 - (value / max) * 100}`
                ).join(' L ')}`}
                fill="none"
                stroke={getModalColor(metric).includes('purple') ? '#9B59B6' : 
                       getModalColor(metric).includes('sea-green') ? '#20B2AA' :
                       getModalColor(metric).includes('light-red') ? '#FF6B6B' : '#FFB347'}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="absolute inset-x-0 h-px bg-gray-200" style={{
              top: `${100 - (metricGoals[metric as keyof typeof metricGoals].min / max) * 100}%`
            }} />
            <div className="absolute bottom-0 left-0 right-0 flex justify-between">
              {days.map((day, index) => (
                <span key={day} className="text-xs text-gray-600">{day}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <button className="p-2 rounded hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">CareVantage Dashboard</h1>
        <div className="w-8" />
      </header>

      {/* Greeting Section */}
      <section className="px-4 pt-6 pb-8">
        <p className="text-sm text-gray-500 mb-1">{currentDate}</p>
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-2xl font-bold">Hi {metrics.userName || 'there'}</h2>
          <span className="text-2xl">👋</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Score */}
          <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm">
            <div className="bg-sea-green/10 p-2 rounded-full mb-2">
              <Target size={20} className="text-sea-green" />
            </div>
            <span className="text-lg font-bold text-gray-900">850</span>
            <span className="text-xs text-gray-500">Score</span>
          </div>

          {/* Rank */}
          <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm">
            <div className="bg-light-red/10 p-2 rounded-full mb-2">
              <Trophy size={20} className="text-light-red" />
            </div>
            <span className="text-lg font-bold text-gray-900">#12</span>
            <span className="text-xs text-gray-500">Rank</span>
          </div>

          {/* Streak */}
          <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm">
            <div className="bg-purple/10 p-2 rounded-full mb-2">
              <Flame size={20} className="text-purple" />
            </div>
            <span className="text-lg font-bold text-gray-900">7</span>
            <span className="text-xs text-gray-500">Streak</span>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-2 gap-4 px-4 py-4">
        {/* Steps Card */}
        <div 
          onClick={() => setSelectedMetric('steps')}
          className="flex flex-col justify-between p-4 rounded-2xl card-purple text-white cursor-pointer hover:opacity-95 transition-opacity"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-1">Walk</h3>
            <PersonStanding size={32} className="text-white" />
          </div>
          <div>
            <p className="text-3xl font-bold">{metrics.steps}</p>
            <p className="text-sm opacity-90">Steps</p>
          </div>
        </div>

        {/* Distance Card */}
        <div 
          onClick={() => setSelectedMetric('distance')}
          className="flex flex-col justify-between p-4 rounded-2xl card-sea-green text-white cursor-pointer hover:opacity-95 transition-opacity"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-1">Distance</h3>
            <Route size={32} className="text-white" />
          </div>
          <div>
            <p className="text-3xl font-bold">7.2</p>
            <p className="text-sm opacity-90">Kilometers</p>
          </div>
        </div>

        {/* Heart Rate Card */}
        <div 
          onClick={() => setSelectedMetric('heart')}
          className="flex flex-col justify-between p-4 rounded-2xl card-light-red text-white cursor-pointer hover:opacity-95 transition-opacity"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-1">Heart</h3>
            <Heart size={32} className="text-white" />
          </div>
          <div>
            <p className="text-3xl font-bold">{metrics.heartRate || '48'}</p>
            <p className="text-sm opacity-90">BPM</p>
          </div>
        </div>

        {/* Calories Card */}
        <div 
          onClick={() => setSelectedMetric('calories')}
          className="flex flex-col justify-between p-4 rounded-2xl card-yellow text-white cursor-pointer hover:opacity-95 transition-opacity"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-1">Calories</h3>
            <Flame size={32} className="text-white" />
          </div>
          <div>
            <p className="text-3xl font-bold">1,900</p>
            <p className="text-sm opacity-90">Calories</p>
          </div>
        </div>
      </section>

      {/* Metric Modals */}
      <MetricModal
        title="Steps History"
        isOpen={selectedMetric === 'steps'}
        onClose={() => setSelectedMetric(null)}
        color="card-purple"
      >
        {renderChart('steps')}
      </MetricModal>

      <MetricModal
        title="Distance History"
        isOpen={selectedMetric === 'distance'}
        onClose={() => setSelectedMetric(null)}
        color="card-sea-green"
      >
        {renderChart('distance')}
      </MetricModal>

      <MetricModal
        title="Heart Rate History"
        isOpen={selectedMetric === 'heart'}
        onClose={() => setSelectedMetric(null)}
        color="card-light-red"
      >
        {renderChart('heart')}
      </MetricModal>

      <MetricModal
        title="Calories History"
        isOpen={selectedMetric === 'calories'}
        onClose={() => setSelectedMetric(null)}
        color="card-yellow"
      >
        {renderChart('calories')}
      </MetricModal>
    </div>
  );
}