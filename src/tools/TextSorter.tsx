import React from 'react';
import { SortAsc, SortDesc, Trash2, Copy, Check } from 'lucide-react';

export const TextSorter: React.FC = () => {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const sort = (direction: 'asc' | 'desc') => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    lines.sort((a, b) => {
      return direction === 'asc' 
        ? a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
        : b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' });
    });
    setText(lines.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100 flex flex-wrap gap-4 justify-between items-center bg-neutral-50/50">
        <div className="flex gap-3">
          <button
            onClick={() => sort('asc')}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <SortAsc size={18} /> Sort A-Z
          </button>
          <button
            onClick={() => sort('desc')}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-xl hover:bg-neutral-50 transition-all shadow-sm"
          >
            <SortDesc size={18} /> Sort Z-A
          </button>
        </div>
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
          className="w-full h-80 p-6 bg-neutral-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all resize-none text-lg outline-none font-mono"
          placeholder="Enter lines to sort..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};
