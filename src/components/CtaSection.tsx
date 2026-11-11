import React from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

interface CtaSectionProps {
  onStartWriting: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartWriting }) => {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 p-8 sm:p-14 md:p-16 text-center text-white shadow-2xl shadow-purple-900/30 overflow-hidden">
          {/* Subtle glowing animated background discs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold mb-6 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Created by Sawaira Maryam</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Transform Your Writing?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-purple-100/90 leading-relaxed max-w-xl mx-auto">
              All tools are completely free with no limits. Start creating better content today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartWriting}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-purple-950 bg-white hover:bg-purple-50 shadow-lg shadow-black/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-700" />
                <span>Start Writing Better</span>
                <ArrowRight className="w-4 h-4 text-purple-700 ml-0.5" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-purple-200/80 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                No sign-up mandatory
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Instant browser results
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Private & secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
