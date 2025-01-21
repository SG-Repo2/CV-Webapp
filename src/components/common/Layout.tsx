import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-4">
      <main className="pb-20">
        {children}
      </main>
      <Navigation />
    </div>
  );
}