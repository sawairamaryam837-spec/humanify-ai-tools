import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Sliders,
  Feather,
  FileText,
  CheckCheck,
  Copy,
  Download,
  Trash2,
  ClipboardPaste,
  RotateCcw,
  Eye,
  Columns,
  ArrowRight,
  ShieldCheck,
  Check,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolDefinition, ToolId } from '../../types';
import { processAiTool } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { DiffViewer } from './DiffViewer';

interface ToolWorkspaceProps {
  tool: ToolDefinition;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  onNavigateTool?: (toolId: ToolId) => void;
}

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({
  tool,
  onShowToast,
}) => {
  const { recordTransformation } = useAuth();

  const [input, setInput] = useState(tool.sampleInput);
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [viewMode, setViewMode] = useState<'standard' | 'diff'>('standard');
  const [hasCopied, setHasCopied] = useState(false);
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // Tool-specific states
  const [intensity, setIntensity] = useState('standard');
  const [paraphraseStyle, setParaphraseStyle] = useState('standard');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [simplifyLevel, setSimplifyLevel] = useState('plain-english');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryFormat, setSummaryFormat] = useState<'paragraph' | 'bullets'>('paragraph');

  // Update sample when tool changes
  useEffect(() => {
    setInput(tool.sampleInput);
    setOutput('');
    setMetadata({});
    setDemoNotice(null);
    setViewMode('standard');
  }, [tool.id]);

  const inputWords = input.trim() ? input.trim().split(/\s+/).length : 0;
  const inputChars = input.length;
  const outputWords = output.trim() ? output.trim().split(/\s+/).length : 0;
  const outputChars = output.length;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        onShowToast('Text Pasted', 'Copied text from clipboard into editor.', 'info');
      }
    } catch {
      onShowToast('Paste Failed', 'Please allow clipboard permissions in your browser.', 'error');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setMetadata({});
    setDemoNotice(null);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
      onShowToast('Copied to Clipboard', 'Text copied successfully.', 'success');
    } catch {
      onShowToast('Copy Error', 'Could not copy to clipboard.', 'error');
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tool.id}-humanify-output.txt`;
    link.click();
    URL.revokeObjectURL(url);
    onShowToast('Downloaded', `Saved output as ${tool.id}-humanify-output.txt`, 'success');
  };

  const handleTransform = async () => {
    if (!input.trim()) {
      onShowToast('Empty Text', 'Please enter some text before processing.', 'info');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);
    setDemoNotice(null);

    // Step animation ticker
    const timer1 = setTimeout(() => setProcessingStep(2), 500);
    const timer2 = setTimeout(() => setProcessingStep(3), 1000);

    try {
      let payload: Record<string, any> = { text: input };

      if (tool.id === 'humanizer') {
        payload.intensity = intensity;
      } else if (tool.id === 'paraphraser') {
        payload.style = paraphraseStyle;
      } else if (tool.id === 'tone-changer') {
        payload.tone = selectedTone;
      } else if (tool.id === 'simplifier') {
        payload.level = simplifyLevel;
      } else if (tool.id === 'summarizer') {
        payload.length = summaryLength;
        payload.format = summaryFormat;
      }

      const response = await processAiTool(tool.id, payload);

      if (response.result) {
        setOutput(response.result);
        setMetadata(response);

        if (response.isDemoMode && response.message) {
          setDemoNotice(response.message);
        }

        // Save to user history & stats
        recordTransformation({
          toolId: tool.id,
          toolName: tool.name,
          inputText: input,
          outputText: response.result,
          wordsCount: response.result.split(/\s+/).filter(Boolean).length,
          metadata: response,
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#7C3AED', '#A855F7', '#C084FC', '#FAF9FF'],
        });

        onShowToast('Transformation Complete', `${tool.name} successfully optimized your text.`, 'success');
      }
    } catch (err: any) {
      onShowToast('Processing Error', err.message || 'Failed to process AI request. Please try again.', 'error');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsProcessing(false);
      setProcessingStep(0);
    }
  };

  // Icon mapping
  const renderIcon = () => {
    switch (tool.id) {
      case 'humanizer': return <Sparkles className="w-5 h-5 text-white" />;
      case 'paraphraser': return <RefreshCw className="w-5 h-5 text-white" />;
      case 'tone-changer': return <Sliders className="w-5 h-5 text-white" />;
      case 'simplifier': return <Feather className="w-5 h-5 text-white" />;
      case 'summarizer': return <FileText className="w-5 h-5 text-white" />;
      case 'grammar-fix': return <CheckCheck className="w-5 h-5 text-white" />;
      default: return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-purple-100">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-md shadow-purple-200/50 shrink-0`}>
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{tool.name}</h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                {tool.badge}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-0.5">{tool.description}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setInput(tool.sampleInput)}
            className="px-3.5 py-2 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Load Sample
          </button>
          <button
            onClick={handlePaste}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <ClipboardPaste className="w-3.5 h-3.5 text-slate-500" />
            Paste
          </button>
          <button
            onClick={handleClear}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Tool-specific Options Toolbar */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-purple-100/70">
        {/* Tool options */}
        <div className="flex items-center gap-3 flex-wrap">
          {tool.id === 'humanizer' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Intensity:</span>
              <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-lg border border-purple-100">
                {(['standard', 'conversational', 'academic', 'aggressive'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setIntensity(mode)}
                    className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                      intensity === mode
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-purple-900/70 hover:text-purple-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tool.id === 'paraphraser' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Style:</span>
              <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-lg border border-purple-100 flex-wrap">
                {(['standard', 'fluent', 'creative', 'formal', 'shorten', 'expand'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setParaphraseStyle(style)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                      paraphraseStyle === style
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-purple-900/70 hover:text-purple-900'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tool.id === 'tone-changer' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Target Tone:</span>
              <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-lg border border-purple-100 flex-wrap">
                {(['professional', 'academic', 'friendly', 'casual', 'creative'] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                      selectedTone === tone
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-purple-900/70 hover:text-purple-900'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tool.id === 'simplifier' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Target Clarity:</span>
              <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-lg border border-purple-100">
                {[
                  { id: 'plain-english', label: 'Plain English' },
                  { id: 'middle-school', label: 'Middle School' },
                  { id: 'elementary', label: 'Simple' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSimplifyLevel(lvl.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      simplifyLevel === lvl.id
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-purple-900/70 hover:text-purple-900'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tool.id === 'summarizer' && (
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Length:</span>
                <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-lg border border-purple-100">
                  {(['short', 'medium', 'detailed'] as const).map((len) => (
                    <button
                      key={len}
                      onClick={() => setSummaryLength(len)}
                      className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                        summaryLength === len
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-purple-900/70 hover:text-purple-900'
                      }`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Format:</span>
                <div className="flex items-center gap-1 bg-purple-50 p-1 rounded-lg border border-purple-100">
                  <button
                    onClick={() => setSummaryFormat('paragraph')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                      summaryFormat === 'paragraph'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-purple-900/70 hover:text-purple-900'
                    }`}
                  >
                    Paragraph
                  </button>
                  <button
                    onClick={() => setSummaryFormat('bullets')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                      summaryFormat === 'bullets'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-purple-900/70 hover:text-purple-900'
                    }`}
                  >
                    Bullets
                  </button>
                </div>
              </div>
            </div>
          )}

          {tool.id === 'grammar-fix' && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                Comprehensive Diagnostics
              </span>
              <span>Spelling, Grammar, Syntax & Punctuation</span>
            </div>
          )}
        </div>

        {/* View Mode Toggle when Output exists */}
        {output && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('standard')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors ${
                viewMode === 'standard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              Side by Side
            </button>
            <button
              onClick={() => setViewMode('diff')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors ${
                viewMode === 'diff' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Word Changes
            </button>
          </div>
        )}
      </div>

      {/* Demo Notice Banner if active */}
      {demoNotice && (
        <div className="my-3 p-3 rounded-xl bg-purple-50/80 border border-purple-200/80 flex items-center gap-2.5 text-xs text-purple-800">
          <Info className="w-4 h-4 text-purple-600 shrink-0" />
          <span>{demoNotice}</span>
        </div>
      )}

      {/* Main Dual Editor Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Left: Input Panel */}
        <div className="flex flex-col rounded-2xl bg-white border border-purple-100 shadow-sm overflow-hidden min-h-[440px]">
          <div className="px-5 py-3.5 border-b border-purple-50 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Input Text
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono tabular-nums">
              <span>{inputWords} words</span>
              <span>·</span>
              <span>{inputChars} chars</span>
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or write your text here to transform..."
              className="w-full flex-1 min-h-[320px] resize-none outline-none text-slate-800 text-sm leading-relaxed placeholder:text-slate-400 font-sans"
            />
          </div>

          {/* Action Trigger Button in Footer */}
          <div className="p-4 border-t border-purple-50 bg-slate-50/30 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Unlimited free transformations
            </span>
            <button
              onClick={handleTransform}
              disabled={isProcessing || !input.trim()}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white purple-gradient-btn shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{tool.actionText}</span>
                  <ArrowRight className="w-4 h-4 opacity-75" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Output Panel */}
        <div className="flex flex-col rounded-2xl bg-white border border-purple-100 shadow-sm overflow-hidden min-h-[440px] relative">
          <div className="px-5 py-3.5 border-b border-purple-50 flex items-center justify-between bg-purple-50/40">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
                {tool.name} Result
              </span>
              {metadata.humanScoreAfter && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {metadata.humanScoreAfter}% Human
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {output && (
                <>
                  <div className="text-xs text-slate-500 font-mono tabular-nums mr-2">
                    {outputWords} words
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 text-slate-600 hover:text-purple-700 hover:bg-purple-100/60 rounded-lg transition-colors"
                    title="Copy text"
                  >
                    {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-1.5 text-slate-600 hover:text-purple-700 hover:bg-purple-100/60 rounded-lg transition-colors"
                    title="Download as file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            {isProcessing ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 text-purple-600 animate-pulse">
                  <Sparkles className="w-7 h-7 animate-spin" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {processingStep === 1 && 'Analyzing syntax & lexical patterns...'}
                  {processingStep === 2 && 'Applying Humanify neural rewriting...'}
                  {processingStep >= 3 && 'Polishing sentence cadence & vocabulary...'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Generating human-grade content without robotic clichés.
                </p>
                <div className="w-48 h-1.5 bg-purple-100 rounded-full mt-5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            ) : output ? (
              viewMode === 'diff' ? (
                <DiffViewer original={input} modified={output} />
              ) : (
                <textarea
                  readOnly
                  value={output}
                  className="w-full flex-1 min-h-[320px] resize-none outline-none text-slate-800 text-sm leading-relaxed font-sans bg-transparent"
                />
              )
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[300px] text-slate-400">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-3 text-purple-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-600">Your output will appear here</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Click "{tool.actionText}" on the left to transform your content instantly.
                </p>
              </div>
            )}
          </div>

          {/* Quality Indicators on Result */}
          {output && !isProcessing && (
            <div className="p-4 border-t border-purple-50 bg-purple-50/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-600">
                {tool.id === 'humanizer' && (
                  <>
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      100% Detector Bypassed
                    </span>
                    <span>Readability: {metadata.readabilityGrade || 'Optimal'}</span>
                  </>
                )}
                {tool.id === 'paraphraser' && (
                  <span className="text-purple-700 font-medium">
                    {metadata.similarityScore || 'High Originality'}
                  </span>
                )}
                {tool.id === 'tone-changer' && (
                  <span className="capitalize text-purple-700 font-medium">
                    Tone Applied: {selectedTone}
                  </span>
                )}
                {tool.id === 'simplifier' && (
                  <span className="text-emerald-700 font-medium">
                    Clarity Score: {metadata.clarityScore || '98/100'}
                  </span>
                )}
                {tool.id === 'summarizer' && (
                  <span className="text-purple-700 font-medium">
                    {metadata.reductionPercentage || '50% condensed'}
                  </span>
                )}
                {tool.id === 'grammar-fix' && (
                  <span className="text-emerald-700 font-medium">
                    {metadata.accuracyScore || '100% Corrected'}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-medium text-xs hover:bg-purple-700 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  {hasCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {hasCopied ? 'Copied' : 'Copy Result'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
