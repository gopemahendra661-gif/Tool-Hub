import React from 'react';
import { RefreshCw, Copy, Check, Hash } from 'lucide-react';

export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = React.useState(1);
  const [max, setMax] = React.useState(100);
  const [result, setResult] = React.useState<number | null>(null);
  const [copied, setCopied] = React.useState(false);

  const generate = () => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(num);
  };

  const handleCopy = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-12">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-4">Minimum Value</label>
            <input
              type="number"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-4">Maximum Value</label>
            <input
              type="number"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-lg"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="relative py-12 flex flex-col items-center justify-center bg-neutral-900 rounded-[2.5rem] text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent pointer-events-none" />
          <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Random Result</div>
          <div className="text-8xl font-black tracking-tighter mb-8">
            {result !== null ? result : '?'}
          </div>
          <div className="flex gap-4">
            <button
              onClick={generate}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
            >
              <RefreshCw size={20} /> Generate
            </button>
            {result !== null && (
              <button
                onClick={handleCopy}
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm flex items-center gap-2"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
