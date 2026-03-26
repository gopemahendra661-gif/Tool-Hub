import React from 'react';
import { Trash2, Copy, Check, Sparkles } from 'lucide-react';

export const TextCleaner: React.FC = () => {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const cleanText = () => {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    setText(cleaned);
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
          onClick={cleanText}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Sparkles size={18} /> Remove Extra Spaces
        </button>
        <div className="flex gap-2">
          <button onClick={() => setText('')} className="p-3 text-neutral-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
          <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-xl hover:bg-neutral-50 transition-all shadow-sm">
            {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>
      <div className="p-6">
        <textarea
          className="w-full h-64 p-6 bg-neutral-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all resize-none text-lg outline-none"
          placeholder="Paste text with   extra    spaces..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};
