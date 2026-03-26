import React from 'react';
import { Hash, Trash2, Copy, Check } from 'lucide-react';

export const CharacterCounter: React.FC = () => {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const stats = {
    withSpaces: text.length,
    withoutSpaces: text.replace(/\s/g, '').length,
    lines: text ? text.split('\n').length : 0,
    words: text ? text.trim().split(/\s+/).length : 0
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-[3rem] shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white border border-neutral-200 rounded-lg text-indigo-600">
              <Hash size={20} />
            </div>
            <span className="font-bold text-neutral-900">Character Counter</span>
          </div>
          <button onClick={() => setText('')} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
        <textarea
          className="w-full h-64 p-8 bg-transparent border-none focus:ring-0 outline-none resize-none text-xl leading-relaxed"
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 text-center">
          <div className="text-4xl font-black text-indigo-600 mb-2">{stats.withSpaces}</div>
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">With Spaces</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 text-center">
          <div className="text-4xl font-black text-indigo-600 mb-2">{stats.withoutSpaces}</div>
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">No Spaces</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 text-center">
          <div className="text-4xl font-black text-indigo-600 mb-2">{stats.words}</div>
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Words</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 text-center">
          <div className="text-4xl font-black text-indigo-600 mb-2">{stats.lines}</div>
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Lines</div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleCopy}
          disabled={!text}
          className="flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl disabled:opacity-50"
        >
          {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
          {copied ? 'Copied Text!' : 'Copy All Text'}
        </button>
      </div>
    </div>
  );
};
