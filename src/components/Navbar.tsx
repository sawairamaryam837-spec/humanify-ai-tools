import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronDown,
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  RefreshCw,
  Sliders,
  Feather,
  FileText,
  CheckCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TOOLS } from '../lib/sampleTexts';
import { ToolId } from '../types';

interface NavbarProps {
  currentView: 'home' | 'tool' | 'dashboard';
  activeToolId?: ToolId;
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onSelectTool: (toolId: ToolId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  activeToolId,
  onNavigateHome,
  onNavigateDashboard,
  onSelectTool,
}) => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getToolIcon = (id: ToolId) => {
    switch (id) {
      case 'humanizer': return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'paraphraser': return <RefreshCw className="w-4 h-4 text-purple-600" />;
      case 'tone-changer': return <Sliders className="w-4 h-4 text-purple-600" />;
      case 'simplifier': return <Feather className="w-4 h-4 text-purple-600" />;
      case 'summarizer': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'grammar-fix': return <CheckCheck className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled || currentView !== 'home'
          ? 'bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-200/60 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">
              Humanify <span className="purple-gradient-text">AI</span>
            </div>
            <div className="text-[10px] text-purple-600 font-semibold tracking-wider uppercase mt-0.5">
              Suite
            </div>
          </div>
        </button>

        {/* Desktop Nav Zone */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={onNavigateHome}
            className={`hover:text-purple-700 transition-colors cursor-pointer ${
              currentView === 'home' ? 'text-purple-700 font-semibold' : ''
            }`}
          >
            Home
          </button>

          {/* AI Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
              className={`flex items-center gap-1 hover:text-purple-700 transition-colors cursor-pointer ${
                currentView === 'tool' ? 'text-purple-700 font-semibold' : ''
              }`}
            >
              <span>AI Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl bg-white border border-purple-100 shadow-xl shadow-purple-900/10 grid gap-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                {TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onSelectTool(tool.id);
                      setToolsDropdownOpen(false);
                    }}
                    className={`p-2.5 rounded-xl flex items-center gap-3 text-left w-full hover:bg-purple-50/70 transition-colors cursor-pointer ${
                      currentView === 'tool' && activeToolId === tool.id ? 'bg-purple-50 text-purple-900' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100/60 flex items-center justify-center shrink-0">
                      {getToolIcon(tool.id)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{tool.name}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{tool.tagline}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#why-choose-us" className="hover:text-purple-700 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-purple-700 transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-purple-700 transition-colors">
            Pricing
          </a>
        </nav>

        {/* Right Action Zone */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-purple-200/70 bg-purple-50/50 hover:bg-purple-100/50 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                  {user?.name?.charAt(0) || 'S'}
                </div>
                <span className="text-xs font-semibold text-slate-800 max-w-[120px] truncate">
                  {user?.name || 'Sawaira'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 p-2 rounded-2xl bg-white border border-purple-100 shadow-xl shadow-purple-900/10 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-purple-50 text-xs text-slate-500">
                    Signed in as <strong className="text-slate-800 block truncate">{user?.email}</strong>
                  </div>
                  <button
                    onClick={() => {
                      onNavigateDashboard();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full mt-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-purple-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 text-purple-600" />
                    <span>User Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-4 py-2 text-xs font-semibold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => onSelectTool('humanizer')}
            className="px-4.5 py-2.5 rounded-xl font-bold text-xs text-white purple-gradient-btn shadow-md shadow-purple-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get Started Free</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-purple-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-purple-100 px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-800">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-purple-700"
            >
              Home
            </button>

            <div className="border-y border-purple-50 py-3 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                AI Tools
              </span>
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-1.5 text-xs text-slate-700 hover:text-purple-700 flex items-center justify-between"
                >
                  <span>{tool.name}</span>
                  <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                    {tool.badge}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                onNavigateDashboard();
                setMobileMenuOpen(false);
              }}
              className="text-left py-1"
            >
              Dashboard
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl border border-purple-200 text-xs font-bold text-purple-900 bg-white"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl border border-rose-200 text-xs font-bold text-rose-600 bg-white"
              >
                Sign Out
              </button>
            )}

            <button
              onClick={() => {
                onSelectTool('humanizer');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl text-xs font-bold text-white purple-gradient-btn"
            >
              Start Free (AI Humanizer)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
