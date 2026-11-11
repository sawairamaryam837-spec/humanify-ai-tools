import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Clock,
  Zap,
  Copy,
  Trash2,
  ExternalLink,
  Check,
  User,
  ShieldCheck,
  Settings,
  Database,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TOOLS } from '../lib/sampleTexts';
import { ToolId } from '../types';

interface DashboardProps {
  onSelectTool: (toolId: ToolId) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectTool, onShowToast }) => {
  const { user, history, clearHistory, removeHistoryItem, updateProfileName, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview');
  const [nameInput, setNameInput] = useState(user?.name || 'Sawaira Maryam');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyHistory = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      onShowToast('Copied', 'Output text copied to clipboard.', 'success');
    } catch {
      onShowToast('Copy Error', 'Failed to copy text.', 'error');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileName(nameInput);
    onShowToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 text-white shadow-xl shadow-purple-900/15 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 text-xl font-bold font-mono">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                Active Member
              </span>
              <span className="text-xs text-purple-200/80">· Free Forever Plan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
              Welcome back, {user?.name || 'Sawaira Maryam'}
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
              Your AI writing suite is ready. You have processed{' '}
              <strong className="text-white font-mono">{user?.wordsProcessed.toLocaleString() || '4,280'} words</strong> so far.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTool('humanizer')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-purple-900 bg-white hover:bg-purple-50 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Launch Humanizer</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-purple-100 pb-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
          }`}
        >
          Overview & Quick Launch
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
          }`}
        >
          <span>Activity & History</span>
          <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono">
            {history.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Profile & API Settings</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Total Words Processed</span>
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {user?.wordsProcessed.toLocaleString() || '4,280'}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">
                +12% efficiency gain
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Documents Saved</span>
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {history.length + (user?.documentsSaved || 0)}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                Saved in local session
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Active Suite Plan</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Free Forever
              </div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">
                Unlimited Transformations
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">Detection Bypass</span>
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-mono tabular-nums">
                98.4%
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                Optimal human authenticity
              </div>
            </div>
          </div>

          {/* Quick Access to All 6 Tools */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Available AI Tools</h2>
              <span className="text-xs text-slate-500 font-medium">6 Specialized Engines</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white text-xs shadow-xs`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {tool.tagline}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Outputs Highlights */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Recent Writing Outputs</h2>
              {history.length > 0 && (
                <button
                  onClick={() => setActiveTab('history')}
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900"
                >
                  View All ({history.length})
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-purple-100 text-center text-slate-500 text-sm">
                No recent activity yet. Select a tool above to start generating!
              </div>
            ) : (
              <div className="space-y-3">
                {history.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                          {item.toolName}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-500 font-mono tabular-nums">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 italic">
                        "{item.inputText}"
                      </p>
                      <p className="text-sm text-slate-800 font-medium line-clamp-2">
                        {item.outputText}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopyHistory(item.id, item.outputText)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={() => onSelectTool(item.toolId)}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-xs font-medium text-white flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <span>Re-open</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FULL HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Transformation History</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved records of your transformed content and outputs.
              </p>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All History</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white border border-purple-100 text-center text-slate-500">
              <p className="text-sm font-medium">No history entries found.</p>
              <p className="text-xs text-slate-400 mt-1">Transform content with any AI tool to log activity here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-purple-50 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                        {item.toolName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono tabular-nums">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500 font-mono tabular-nums">
                        {item.wordsCount} words
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyHistory(item.id, item.outputText)}
                        className="p-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Copy text"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => removeHistoryItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                      <span className="font-semibold text-slate-600 block mb-1">Original Input:</span>
                      <p className="text-slate-700 whitespace-pre-wrap">{item.inputText}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100">
                      <span className="font-semibold text-purple-900 block mb-1">Humanify Output:</span>
                      <p className="text-slate-900 font-medium whitespace-pre-wrap">{item.outputText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-8">
          <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600" />
              <span>User Profile</span>
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || 'sawairamaryam837@gmail.com'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white purple-gradient-btn shadow-xs cursor-pointer"
                >
                  Save Profile Changes
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </form>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-600" />
              <span>Backend Connectivity</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              AI server processing is powered by Google Gemini (model gemini-3.8-flash) via secure server-side proxy routes.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                <span className="text-slate-700 font-medium">Model Engine</span>
                <span className="font-mono text-purple-700 font-semibold">gemini-3.8-flash</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                <span className="text-slate-700 font-medium">Server Route Proxy</span>
                <span className="font-mono text-emerald-700 font-semibold">Express + Vite (Active)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                <span className="text-slate-700 font-medium">Creator</span>
                <span className="text-purple-900 font-semibold">Sawaira Maryam</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
