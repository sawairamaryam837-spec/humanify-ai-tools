import React from 'react';
import { Sparkles, Heart, Mail, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { ToolId } from '../types';

interface FooterProps {
  onSelectTool: (toolId: ToolId) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, onNavigateHome }) => {
  return (
    <footer className="bg-white border-t border-purple-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-purple-100">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-purple-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-purple-700 transition-colors">
                Humanify <span className="purple-gradient-text">AI</span>
              </span>
            </button>

            <p className="text-xs text-slate-500 leading-relaxed">
              Professional AI writing suite designed and developed by{' '}
              <strong className="text-slate-700 font-semibold">Sawaira Maryam</strong>. Free, privacy-friendly, and crafted for perfection.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="mailto:sawairamaryam837@gmail.com"
                className="hover:text-purple-600 transition-colors p-1"
                aria-label="Email creator"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-600 transition-colors p-1"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-600 transition-colors p-1"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-600 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: 6 AI Tools */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              AI Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onSelectTool('humanizer')}
                  className="hover:text-purple-700 transition-colors"
                >
                  AI Humanizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('paraphraser')}
                  className="hover:text-purple-700 transition-colors"
                >
                  Paraphraser
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('tone-changer')}
                  className="hover:text-purple-700 transition-colors"
                >
                  Tone Changer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('simplifier')}
                  className="hover:text-purple-700 transition-colors"
                >
                  Simplifier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('summarizer')}
                  className="hover:text-purple-700 transition-colors"
                >
                  Summarizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTool('grammar-fix')}
                  className="hover:text-purple-700 transition-colors"
                >
                  Grammar Fix
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform & Features */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a href="#features" className="hover:text-purple-700 transition-colors">
                  Product Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-purple-700 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-purple-700 transition-colors">
                  Why Choose Humanify
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-purple-700 transition-colors">
                  Free Forever Guarantee
                </a>
              </li>
              <li>
                <span className="text-emerald-600 font-medium">98% Human Score Engine</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Creator */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Creator & Contact
            </h4>
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-900">Sawaira Maryam</div>
              <p className="text-[11px] text-slate-500">
                Founder, Product Designer & Developer of Humanify AI Suite.
              </p>
              <a
                href="mailto:sawairamaryam837@gmail.com"
                className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 font-medium text-[11px] pt-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>sawairamaryam837@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with exact required phrases */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Humanify AI Suite. Advanced AI tools for everyone, completely free.</p>
          <p className="flex items-center gap-1 text-slate-600">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by</span>
            <span className="font-semibold text-purple-900">Sawaira Maryam</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
