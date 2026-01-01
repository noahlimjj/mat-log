/**
 * MatLog Pro - Main App Component
 * 
 * Features:
 * - Bottom navigation for mobile-first design
 * - View routing (Dashboard, Logger, Vault, Settings)
 * - MatProvider context wrapper
 * - Dark theme (Minimalist Athletic Dashboard)
 * 
 * Design: Minimalist Athletic Dashboard with semantic colors
 */

import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MatProvider } from '@/contexts/MatContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import DashboardView from '@/pages/DashboardView';
import LoggerView from '@/pages/LoggerView';
import VaultView from '@/pages/VaultView';
import SettingsView from '@/pages/SettingsView';
import { BarChart3, Plus, BookOpen, Settings } from 'lucide-react';

type View = 'dashboard' | 'logger' | 'vault' | 'settings';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'logger':
        return <LoggerView />;
      case 'vault':
        return <VaultView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4">
        {renderView()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto px-0 flex items-center justify-around h-16">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              currentView === 'dashboard'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Dashboard"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentView('logger')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              currentView === 'logger'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Log Session"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs font-medium">Log</span>
          </button>

          <button
            onClick={() => setCurrentView('vault')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              currentView === 'vault'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Technique Vault"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-medium">Vault</span>
          </button>

          <button
            onClick={() => setCurrentView('settings')}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              currentView === 'settings'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <MatProvider>
            <Toaster />
            <AppContent />
          </MatProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
