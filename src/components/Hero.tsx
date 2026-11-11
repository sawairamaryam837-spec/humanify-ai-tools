import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, ShieldCheck, Zap, RefreshCw, Wand2, Star } from 'lucide-react';
import { ToolId } from '../types';

interface HeroProps {
  onSelectTool: (toolId: ToolId) => void;
  onScrollToTools: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTool, onScrollToTools }) => {
  const [heroInput, setHeroInput] = useState(
    "Furthermore, it is crucial to delve into the multifaceted tapestry of modern writing paradigms to optimize efficacy."
  );
  const [heroOutput, setHeroOutput] = useState(
    "Most importantly, let's explore how modern writing really works so your message connects naturally and clearly."
  );
  const [isTransforming, setIsTransforming] = useState(false);
  const [activeTab, setActiveTab] = useState<'after' | 'compare'>('after');

  const handleHeroRun = () => {
    setIsTransforming(true);
    setTimeout(() => {
      setIsTransforming(false);
      setHeroOutput(
        "To make your message stick, speak with natural rhythm, real nuance, and direct clarity that sounds unmistakably human."
      );
    }, 700);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient purple gradients & glowing shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-200/50 via-violet-200/30 to-fuchsia-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-6 text-center lg:text-left">
            {/* Top creator attribution & announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 mb-6 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-xs font-semibold text-purple-900">
                Created by Sawaira Maryam
              </span>
              <span className="text-purple-300 text-xs">·</span>
              <span className="text-xs text-purple-700 font-medium">100% Free Forever</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Transform Your{' '}
              <span className="purple-gradient-text">Writing Instantly</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Professional AI-powered writing tools that help you create, transform, and perfect your content. All features are completely free – no limits, no subscriptions.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => onSelectTool('humanizer')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white purple-gradient-btn shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Try AI Humanizer</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={onScrollToTools}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-purple-900 bg-white border border-purple-200/80 hover:bg-purple-50/70 hover:border-purple-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>View All Tools</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="mt-10 pt-6 border-t border-purple-100/70 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 flex-wrap">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Zero Subscription Fees</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Undetectable AI Rewriting</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Instant Word Diff Engine</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive AI Writing Dashboard Preview */}
          <div className="lg:col-span-6 relative">
            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-purple-100 flex items-center gap-2 z-20 animate-bounce duration-1000">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-900">98% Human Score</div>
                <div className="text-[10px] text-emerald-600">Bypasses AI Detectors</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-purple-100 flex items-center gap-2 z-20">
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-900">Lightning Fast</div>
                <div className="text-[10px] text-purple-600">0.4s Generation Speed</div>
              </div>
            </div>

            {/* Dashboard Card Preview */}
            <div className="rounded-2xl bg-white/90 backdrop-blur-xl border border-purple-200/80 shadow-2xl shadow-purple-900/10 overflow-hidden relative">
              {/* Window Header */}
              <div className="px-5 py-3.5 bg-gradient-to-r from-purple-50 via-white to-purple-50/50 border-b border-purple-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 ml-2">
                    Humanify Studio · Interactive Live Preview
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-purple-100/60 p-0.5 rounded-lg text-[11px]">
                  <button
                    onClick={() => setActiveTab('after')}
                    className={`px-2.5 py-0.5 rounded-md font-medium transition-all ${
                      activeTab === 'after' ? 'bg-white text-purple-900 shadow-xs' : 'text-purple-700'
                    }`}
                  >
                    Natural Output
                  </button>
                  <button
                    onClick={() => setActiveTab('compare')}
                    className={`px-2.5 py-0.5 rounded-md font-medium transition-all ${
                      activeTab === 'compare' ? 'bg-white text-purple-900 shadow-xs' : 'text-purple-700'
                    }`}
                  >
                    Comparison
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Input Text Block */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Robotic AI Draft
                    </span>
                    <span className="font-mono text-[11px]">Detected: 82% AI-Generated</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {heroInput}
                  </div>
                </div>

                {/* Interactive Action Bar */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-xs text-purple-800 font-medium">
                    <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Click below to see live transformation:</span>
                  </div>
                  <button
                    onClick={handleHeroRun}
                    disabled={isTransforming}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    {isTransforming ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Polishing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Run Humanizer</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Output Panel with Animated State */}
                <div>
                  <div className="flex items-center justify-between text-xs text-purple-900 mb-1.5">
                    <span className="font-semibold flex items-center gap-1 text-purple-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Humanify Natural Prose
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      98% Human Score
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans relative overflow-hidden min-h-[92px]">
                    {isTransforming ? (
                      <div className="flex items-center justify-center gap-2 py-6 text-purple-700 font-medium text-xs">
                        <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
                        <span>Neutralizing clichés & varying sentence rhythm...</span>
                      </div>
                    ) : activeTab === 'compare' ? (
                      <div className="space-y-2 text-xs">
                        <p className="line-through text-rose-700/80 bg-rose-50/70 p-2 rounded">
                          {heroInput}
                        </p>
                        <p className="text-emerald-800 bg-emerald-50/70 p-2 rounded font-medium">
                          {heroOutput}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-900 font-medium">{heroOutput}</p>
                    )}
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-100 text-center">
                  <div className="p-2 rounded-lg bg-white border border-purple-100">
                    <div className="text-[10px] text-slate-400 font-medium">Readability</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">8th Grade</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-purple-100">
                    <div className="text-[10px] text-slate-400 font-medium">AI Clichés</div>
                    <div className="text-xs font-bold text-emerald-600 mt-0.5">0 Found</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-purple-100">
                    <div className="text-[10px] text-slate-400 font-medium">Tone Depth</div>
                    <div className="text-xs font-bold text-purple-600 mt-0.5">Nuanced</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
