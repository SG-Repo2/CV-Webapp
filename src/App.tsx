import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseProvider } from './contexts/SupabaseContext';
import { DemoDataProvider } from './contexts/DemoDataContext';
import { WaitlistForm } from './components/waitlist/WaitlistForm';
import { HomeScreen } from './components/demo/HomeScreen';
import { LeaderboardScreen } from './components/demo/LeaderboardScreen';
import { Layout } from './components/common/Layout';

export default function App() {
  return (
    <SupabaseProvider>
      <DemoDataProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/waitlist" element={<WaitlistForm />} />
              <Route path="/leaderboard" element={<LeaderboardScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </DemoDataProvider>
    </SupabaseProvider>
  );
}