import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { ToolsGrid } from './components/ToolsGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ToolWorkspace } from './components/tools/ToolWorkspace';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';
import { TOOLS } from './lib/sampleTexts';
import { ToolId, ToastMessage } from './types';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'tool' | 'dashboard'>('home');
  const [activeToolId, setActiveToolId] = useState<ToolId>('humanizer');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectTool = (toolId: ToolId) => {
    setActiveToolId(toolId);
    setCurrentView('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTools = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('ai-tools');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('ai-tools');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeTool = TOOLS.find((t) => t.id === activeToolId) || TOOLS[0];

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9FF] text-[#171329]">
        {/* Navigation Bar */}
        <Navbar
          currentView={currentView}
          activeToolId={activeToolId}
          onNavigateHome={handleNavigateHome}
          onNavigateDashboard={handleNavigateDashboard}
          onSelectTool={handleSelectTool}
        />

        {/* Dynamic Main View */}
        <main className="flex-1">
          {currentView === 'home' && (
            <>
              <Hero
                onSelectTool={handleSelectTool}
                onScrollToTools={handleScrollToTools}
              />
              <Stats />
              <ToolsGrid onSelectTool={handleSelectTool} />
              <WhyChooseUs />
              <HowItWorks />
              <Pricing onStartFree={() => handleSelectTool('humanizer')} />
              <CtaSection onStartWriting={() => handleSelectTool('humanizer')} />
            </>
          )}

          {currentView === 'tool' && (
            <div>
              {/* Breadcrumb Navigation Strip */}
              <div className="bg-white/70 border-b border-purple-100 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleNavigateHome}
                      className="text-slate-500 hover:text-purple-700 flex items-center gap-1 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Home</span>
                    </button>
                    <span className="text-slate-300">/</span>
                    <span className="text-purple-700 font-semibold">{activeTool.name}</span>
                  </div>

                  {/* Quick Switcher among all 6 tools */}
                  <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto">
                    {TOOLS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelectTool(t.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                          activeToolId === t.id
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tool Workspace Component */}
              <ToolWorkspace
                tool={activeTool}
                onShowToast={showToast}
                onNavigateTool={handleSelectTool}
              />
            </div>
          )}

          {currentView === 'dashboard' && (
            <Dashboard
              onSelectTool={handleSelectTool}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onSelectTool={handleSelectTool}
          onNavigateHome={handleNavigateHome}
        />

        {/* Modals & Overlays */}
        <AuthModal onShowToast={showToast} />
        <NotificationToast toasts={toasts} onDismiss={dismissToast} />
      </div>
    </AuthProvider>
  );
}
