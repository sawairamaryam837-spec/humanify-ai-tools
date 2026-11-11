import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onShowToast }) => {
  const { authModalOpen, authModalTab, closeAuthModal, openAuthModal, login, register, resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (authModalTab === 'login') {
        const res = await login(email, password);
        if (res.success) {
          onShowToast('Welcome back!', 'You are now signed into Humanify AI Suite.', 'success');
        } else {
          setErrorMsg(res.error || 'Invalid email or password.');
        }
      } else if (authModalTab === 'register') {
        if (!name.trim()) {
          setErrorMsg('Please enter your full name.');
          setLoading(false);
          return;
        }
        const res = await register(name, email, password);
        if (res.success) {
          onShowToast('Account Created!', `Welcome to Humanify AI Suite, ${name}!`, 'success');
        } else {
          setErrorMsg(res.error || 'Failed to create account.');
        }
      } else if (authModalTab === 'forgot') {
        const res = await resetPassword(email);
        setSuccessMsg(res.message);
        onShowToast('Password Reset', res.message, 'info');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-purple-100 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-purple-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {authModalTab === 'login' && 'Sign in to Humanify AI'}
            {authModalTab === 'register' && 'Create your free account'}
            {authModalTab === 'forgot' && 'Reset your password'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isSupabaseConfigured
              ? 'Secured with Supabase Cloud Authentication'
              : 'Free Forever · Instant Access'}
          </p>
        </div>

        {/* Tab switcher */}
        {authModalTab !== 'forgot' && (
          <div className="flex rounded-xl bg-purple-50 p-1 mb-6 border border-purple-100">
            <button
              onClick={() => { setErrorMsg(null); openAuthModal('login'); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authModalTab === 'login' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setErrorMsg(null); openAuthModal('register'); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authModalTab === 'register' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Register Free
            </button>
          </div>
        )}

        {/* Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalTab === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sawaira Maryam"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {authModalTab !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-700">
                  Password
                </label>
                {authModalTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setErrorMsg(null); openAuthModal('forgot'); }}
                    className="text-xs text-purple-600 hover:text-purple-800"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm text-white purple-gradient-btn shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Please wait...</span>
            ) : (
              <>
                <span>
                  {authModalTab === 'login' && 'Sign In'}
                  {authModalTab === 'register' && 'Create Account'}
                  {authModalTab === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {authModalTab === 'forgot' && (
          <div className="mt-4 text-center">
            <button
              onClick={() => openAuthModal('login')}
              className="text-xs font-semibold text-purple-600 hover:text-purple-800"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
