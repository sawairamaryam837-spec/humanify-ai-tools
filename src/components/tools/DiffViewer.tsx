import React from 'react';
import * as Diff from 'diff';

interface DiffViewerProps {
  original: string;
  modified: string;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ original, modified }) => {
  if (!original && !modified) return null;

  const diffResult = Diff.diffWords(original, modified);

  return (
    <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100 text-sm leading-relaxed max-h-[360px] overflow-y-auto">
      <div className="flex items-center gap-4 mb-3 pb-2 border-b border-purple-100/60 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-200 border border-rose-300 inline-block" />
          <span>Removed robotic / cliché wording</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-200 border border-emerald-300 inline-block" />
          <span>Natural human-enhanced phrasing</span>
        </span>
      </div>

      <div className="whitespace-pre-wrap font-sans text-slate-800">
        {diffResult.map((part, index) => {
          if (part.added) {
            return (
              <span
                key={index}
                className="bg-emerald-100/80 text-emerald-900 px-1 py-0.5 rounded font-medium border-b-2 border-emerald-300 mx-0.5"
              >
                {part.value}
              </span>
            );
          }
          if (part.removed) {
            return (
              <span
                key={index}
                className="bg-rose-100/80 text-rose-800 line-through px-1 py-0.5 rounded opacity-70 mx-0.5"
              >
                {part.value}
              </span>
            );
          }
          return <span key={index}>{part.value}</span>;
        })}
      </div>
    </div>
  );
};
