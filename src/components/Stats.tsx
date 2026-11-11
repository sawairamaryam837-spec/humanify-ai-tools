import React, { useState, useEffect, useRef } from 'react';
import { Layers, Sparkles, Infinity, Clock } from 'lucide-react';

export const Stats: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [toolCount, setToolCount] = useState(0);
  const [freePct, setFreePct] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          let t = 0;
          const interval = setInterval(() => {
            t += 1;
            setToolCount(Math.min(6, t));
            setFreePct(Math.min(100, t * 17));
            if (t >= 6) {
              setFreePct(100);
              clearInterval(interval);
            }
          }, 80);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  const statsList = [
    {
      value: `${toolCount}`,
      suffix: ' AI Tools',
      label: 'Specialized writing engines',
      icon: Layers,
      color: 'from-purple-600 to-indigo-600',
    },
    {
      value: `${freePct}%`,
      suffix: ' Free',
      label: 'No credit cards or fees',
      icon: Sparkles,
      color: 'from-violet-600 to-purple-600',
    },
    {
      value: 'Unlimited',
      suffix: '',
      label: 'Transform as much as you need',
      icon: Infinity,
      color: 'from-purple-600 to-pink-600',
    },
    {
      value: '24/7',
      suffix: ' Available',
      label: 'Instant high-speed processing',
      icon: Clock,
      color: 'from-indigo-600 to-purple-700',
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 border-y border-purple-100 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-2xl bg-gradient-to-b from-purple-50/50 to-transparent border border-purple-100/60 transition-all hover:border-purple-300 hover:shadow-md hover:shadow-purple-100/50"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-purple-900/70 tracking-wide uppercase">
                    Stat 0{index + 1}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                    {item.value}
                  </span>
                  {item.suffix && (
                    <span className="text-lg sm:text-xl font-bold text-purple-700">
                      {item.suffix}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-500 font-medium">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
