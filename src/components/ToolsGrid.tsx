import React from 'react';
import {
  Sparkles,
  RefreshCw,
  Sliders,
  Feather,
  FileText,
  CheckCheck,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { TOOLS } from '../lib/sampleTexts';
import { ToolId } from '../types';

interface ToolsGridProps {
  onSelectTool: (toolId: ToolId) => void;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({ onSelectTool }) => {
  const getToolIcon = (id: ToolId) => {
    switch (id) {
      case 'humanizer':
        return <Sparkles className="w-6 h-6 text-white" />;
      case 'paraphraser':
        return <RefreshCw className="w-6 h-6 text-white" />;
      case 'tone-changer':
        return <Sliders className="w-6 h-6 text-white" />;
      case 'simplifier':
        return <Feather className="w-6 h-6 text-white" />;
      case 'summarizer':
        return <FileText className="w-6 h-6 text-white" />;
      case 'grammar-fix':
        return <CheckCheck className="w-6 h-6 text-white" />;
      default:
        return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="ai-tools" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            <span>Complete Writing Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional AI Writing Suite
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Every tool you need to create, transform, and perfect your writing.
          </p>
        </div>

        {/* 6 Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOOLS.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="group relative p-7 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Subtle glowing animated border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-500/30 transition-colors pointer-events-none" />
              
              {/* Top Accent Gradient Flare */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-100/60 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                {/* Header row with Icon and Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-md shadow-purple-300/40 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {getToolIcon(tool.id)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                    {tool.badge}
                  </span>
                </div>

                {/* Tool Name and Short Description */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Card Footer with Try Now Button */}
              <div className="mt-6 pt-5 border-t border-purple-50 flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>Try Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  100% Free
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
