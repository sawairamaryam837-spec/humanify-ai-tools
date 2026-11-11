import React from 'react';
import { MousePointerClick, Edit3, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Tool',
      description: 'Select the AI writing tool you need from our suite of 6 specialized engines.',
      icon: MousePointerClick,
    },
    {
      num: '02',
      title: 'Enter Your Text',
      description: 'Paste or write your content, select desired intensity, style, or tone preferences.',
      icon: Edit3,
    },
    {
      num: '03',
      title: 'Get Your Results',
      description: 'Generate, review word-by-word diffs, and copy or download your perfected writing instantly.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-3">
            <span>Seamless 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From rough draft to publication-ready prose in three intuitive steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-300/40">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-white text-purple-700 font-extrabold text-xs flex items-center justify-center border-2 border-purple-600 shadow-xs font-mono">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
