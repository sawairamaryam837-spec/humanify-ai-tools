import React from 'react';
import { Check, Sparkles, Heart } from 'lucide-react';

interface PricingProps {
  onStartFree: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onStartFree }) => {
  const perks = [
    'All 6 specialized AI writing tools included',
    'No subscription fees or recurring billing',
    'No hidden charges or credit card required',
    'No artificial daily limits in the interface',
    'Full access from desktop, tablet, and mobile devices',
    'Word-by-word diff engine and before/after comparisons',
    'Fast export to TXT, Markdown, and clipboard',
    'Persistent writing history and user dashboard',
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-white via-purple-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 text-purple-600 fill-purple-600/30" />
            <span>Honest & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Completely Free. Zero Surprises.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Created with the mission to give everyone access to world-class writing technology without paywalls.
          </p>
        </div>

        {/* Free Plan Card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 sm:p-10 rounded-3xl bg-white border-2 border-purple-200/80 shadow-xl shadow-purple-900/5 overflow-hidden">
            {/* Top highlight ribbon */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-xl shadow-xs">
              COMMUNITY EDITION
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-purple-100">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                  The Plan
                </span>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                  Free Forever
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Full suite access without fees or expiration dates.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-5xl font-extrabold text-slate-900 font-mono">
                  $0
                </span>
                <span className="text-slate-500 text-sm font-medium"> / forever</span>
              </div>
            </div>

            <div className="py-8">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                What's Included:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                No credit card required. Start creating immediately.
              </div>
              <button
                onClick={onStartFree}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white purple-gradient-btn shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Writing Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
