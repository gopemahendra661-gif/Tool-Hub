import React from 'react';
import { Link2, Trash2, Copy, Check } from 'lucide-react';

export const SlugGenerator: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const slug = React.useMemo(() => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200">
        <label className="block text-sm font-bold text-neutral-900 mb-2">Enter Text to Slugify</label>
        <div className="flex gap-4">
          <input
            type="text"
            className="flex-1 p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="How to make a website in 2026"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => setInput('')} className="p-4 text-neutral-400 hover:text-red-500 transition-colors">
            <Trash2 size={24} />
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-[2.5rem] p-12 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <Link2 size={48} className="text-neutral-800" />
        </div>
        <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest">URL Friendly Slug</div>
        <div className="text-3xl font-black text-indigo-400 break-all">
          {slug || 'your-slug-here'}
        </div>
        <button
          onClick={handleCopy}
          disabled={!slug}
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
        >
          {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
          {copied ? 'Copied Slug!' : 'Copy Slug'}
        </button>
      </div>
    </div>
  );
};
