import React from 'react';
import { Copy, Check, Trash2, Scissors } from 'lucide-react';

export const DuplicateLineRemover: React.FC = () => {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const removeDuplicates = () => {
    const lines = text.split('\n');
    const uniqueLines = Array.from(new Set(lines.map(l => l.trim()))).filter(Boolean);
    setText(uniqueLines.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
        <button
          onClick={removeDuplicates}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Scissors size={18} /> Remove Duplicate Lines
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => setText('')}
            className="p-3 text-neutral-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-xl hover:bg-neutral-50 transition-all shadow-sm"
          >
            {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <textarea
          className="w-full h-80 p-6 bg-neutral-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all resize-none font-mono text-sm outline-none"
          placeholder="Paste your list here (one item per line)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="p-4 bg-neutral-50 text-center text-xs text-neutral-400 font-bold uppercase tracking-widest">
        {text.split('\n').filter(Boolean).length} total lines
      </div>
    </div>
  );
};
