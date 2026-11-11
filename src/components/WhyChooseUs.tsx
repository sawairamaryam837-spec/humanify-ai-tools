import React from 'react';
import { Zap, Brain, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Lightning Fast',
      description: 'Get results in seconds with optimized AI processing and ultra-low latency response cycles.',
      icon: Zap,
      gradient: 'from-amber-500 to-purple-600',
      metric: '0.4s response',
    },
    {
      title: 'Smart AI',
      description: 'Advanced AI models understand context, nuances, and writing styles to output natural prose.',
      icon: Brain,
      gradient: 'from-purple-600 to-indigo-600',
      metric: 'Context-Aware',
    },
    {
      title: 'High Quality',
      description: 'Professional-quality writing improvements that bypass robotic hallmarks and preserve your intent.',
      icon: Award,
      gradient: 'from-indigo-600 to-violet-700',
      metric: 'Human-Grade',
    },
    {
      title: 'User Friendly',
      description: 'Simple and intuitive interface with powerful multi-style controls, word diffs, and instant exports.',
      icon: Sparkles,
      gradient: 'from-fuchsia-600 to-purple-700',
      metric: 'Zero Learning Curve',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-gradient-to-b from-purple-50/40 via-white to-purple-50/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Unmatched Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Our AI Tools?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Engineered for professionals, authors, marketers, students, and creators who demand perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-white mb-5 shadow-sm shadow-purple-200`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-50 text-[11px] font-semibold text-purple-700 font-mono">
                  {feat.metric}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
