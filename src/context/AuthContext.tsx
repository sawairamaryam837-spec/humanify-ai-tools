import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, TransformationHistoryItem } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  history: TransformationHistoryItem[];
  authModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot';
  openAuthModal: (tab?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updateProfileName: (name: string) => void;
  recordTransformation: (item: Omit<TransformationHistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  removeHistoryItem: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'humanify_user_session';
const LOCAL_STORAGE_HISTORY_KEY = 'humanify_history_log';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse stored user:', e);
    }
    // Default logged-in experience for Sawaira Maryam or guest
    return {
      id: 'usr_sawaira_01',
      name: 'Sawaira Maryam',
      email: 'sawairamaryam837@gmail.com',
      role: 'Founder & Lead Creator',
      wordsProcessed: 4280,
      documentsSaved: 12,
      createdAt: '2026-01-15T08:00:00Z',
    };
  });

  const [history, setHistory] = useState<TransformationHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse history:', e);
    }
    return [
      {
        id: 'hist_01',
        toolId: 'humanizer',
        toolName: 'AI Humanizer',
        inputText: "Furthermore, it is crucial to delve into the tapestry of customer retention paradigms.",
        outputText: "Most importantly, let's look at what actually keeps customers coming back over the long run.",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        wordsCount: 16,
        metadata: { score: '98% Human' },
      },
      {
        id: 'hist_02',
        toolId: 'tone-changer',
        toolName: 'Tone Changer',
        inputText: "We need the report finished ASAP because clients are mad.",
        outputText: "Please prioritize finalizing the client report today so we can promptly address their expectations and maintain strong partnership alignment.",
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        wordsCount: 22,
        metadata: { tone: 'Professional' },
      },
    ];
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const openAuthModal = (tab: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = async (email: string, _pass: string) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: _pass });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            name: data.user.user_metadata?.name || email.split('@')[0],
            email: data.user.email || email,
            wordsProcessed: 0,
            documentsSaved: 0,
            createdAt: data.user.created_at,
          });
          closeAuthModal();
          return { success: true };
        }
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    }

    // Local authentication fallback
    const mockUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      wordsProcessed: 120,
      documentsSaved: 1,
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    closeAuthModal();
    return { success: true };
  };

  const register = async (name: string, email: string, _pass: string) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: _pass,
          options: { data: { name } },
        });
        if (error) return { success: false, error: error.message };
        if (data.user) {
          setUser({
            id: data.user.id,
            name: name,
            email: email,
            wordsProcessed: 0,
            documentsSaved: 0,
            createdAt: new Date().toISOString(),
          });
          closeAuthModal();
          return { success: true };
        }
      } catch (e: any) {
        return { success: false, error: e.message };
      }
    }

    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      wordsProcessed: 0,
      documentsSaved: 0,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    closeAuthModal();
    return { success: true };
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(console.error);
    }
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) return { success: false, message: error.message };
      } catch (e: any) {
        return { success: false, message: e.message };
      }
    }
    return {
      success: true,
      message: `Password reset instructions have been dispatched to ${email}.`,
    };
  };

  const updateProfileName = (name: string) => {
    if (!user) return;
    setUser({ ...user, name });
  };

  const recordTransformation = (item: Omit<TransformationHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: TransformationHistoryItem = {
      ...item,
      id: 'hist_' + Date.now().toString(36),
      timestamp: new Date().toISOString(),
    };
    setHistory(prev => [newItem, ...prev.slice(0, 49)]); // keep latest 50
    if (user) {
      setUser(prev => prev ? {
        ...prev,
        wordsProcessed: prev.wordsProcessed + item.wordsCount,
        documentsSaved: prev.documentsSaved + 1,
      } : null);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        history,
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        resetPassword,
        updateProfileName,
        recordTransformation,
        clearHistory,
        removeHistoryItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
