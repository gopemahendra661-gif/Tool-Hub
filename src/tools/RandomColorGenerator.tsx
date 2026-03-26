import React from 'react';
import { Palette, RefreshCw, Copy, Check } from 'lucide-react';

export const RandomColorGenerator: React.FC = () => {
  const [color, setColor] = React.useState('#6366f1');
  const [copied, setCopied] = React.useState(false);

  const generate = () => {
    const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(hex);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-12 flex flex-col items-center gap-12">
        <div 
          className="w-64 h-64 rounded-[3rem] shadow-2xl shadow-neutral-200 transition-colors duration-500 border-8 border-white"
          style={{ backgroundColor: color }}
        />
        
        <div className="text-center">
          <div className="text-4xl font-black text-neutral-900 mb-4 uppercase tracking-tight">{color}</div>
          <div className="flex gap-4">
            <button
              onClick={generate}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              <RefreshCw size={20} /> New Color
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-8 py-4 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-2xl hover:bg-neutral-50 transition-all shadow-sm"
            >
              {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
              {copied ? 'Copied!' : 'Copy HEX'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
