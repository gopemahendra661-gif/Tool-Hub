import React from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    sentences: text.split(/[.!?]+/).filter(Boolean).length,
    paragraphs: text.split(/\n+/).filter(Boolean).length,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-colors"
          >
            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button 
            onClick={() => setText('')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <textarea
          className="w-full h-64 p-6 bg-neutral-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all resize-none text-lg outline-none"
          placeholder="Paste or type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 border-t border-neutral-100">
        <div className="p-6 text-center border-r border-neutral-100">
          <div className="text-2xl font-bold text-indigo-600">{stats.words}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1">Words</div>
        </div>
        <div className="p-6 text-center border-r border-neutral-100">
          <div className="text-2xl font-bold text-neutral-900">{stats.characters}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1">Characters</div>
        </div>
        <div className="p-6 text-center border-r border-neutral-100">
          <div className="text-2xl font-bold text-neutral-900">{stats.charactersNoSpaces}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1">No Spaces</div>
        </div>
        <div className="p-6 text-center border-r border-neutral-100">
          <div className="text-2xl font-bold text-neutral-900">{stats.sentences}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1">Sentences</div>
        </div>
        <div className="p-6 text-center">
          <div className="text-2xl font-bold text-neutral-900">{stats.paragraphs}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1">Paragraphs</div>
        </div>
      </div>
    </div>
  );
};
