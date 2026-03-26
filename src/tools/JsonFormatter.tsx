import React from 'react';
import { Copy, Check, Trash2, AlignLeft, Minimize2 } from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const formatJson = (minify = false) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (e: any) {
      setError('Invalid JSON: ' + e.message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setInput('{\n  "name": "My Tool Hub",\n  "version": "1.0.0",\n  "features": ["Fast", "Secure", "Free"],\n  "active": true\n}');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Input JSON</span>
              <button 
                onClick={loadExample}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Load Example
              </button>
            </div>
            <button 
              onClick={() => setInput('')}
              className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <textarea
            className="w-full h-[400px] p-6 font-mono text-sm bg-transparent border-none focus:ring-0 outline-none resize-none"
            placeholder='{"key": "value"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Formatted Output</span>
            {output && (
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium hover:bg-neutral-50 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div className="flex-1 relative">
            {error ? (
              <div className="absolute inset-0 p-6 text-red-500 font-mono text-sm bg-red-50/30">
                {error}
              </div>
            ) : (
              <pre className="p-6 font-mono text-sm overflow-auto max-h-[400px] whitespace-pre-wrap break-all">
                {output || <span className="text-neutral-300">Formatted JSON will appear here...</span>}
              </pre>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => formatJson(false)}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <AlignLeft size={20} /> Prettify JSON
        </button>
        <button
          onClick={() => formatJson(true)}
          className="flex items-center gap-2 px-8 py-4 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-2xl hover:bg-neutral-50 transition-all shadow-sm"
        >
          <Minimize2 size={20} /> Minify JSON
        </button>
      </div>
    </div>
  );
};
