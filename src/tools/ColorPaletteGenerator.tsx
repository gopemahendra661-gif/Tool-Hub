import React from 'react';
import { Layout, RefreshCcw, Copy, Check } from 'lucide-react';

export const ColorPaletteGenerator: React.FC = () => {
  const [palette, setPalette] = React.useState<string[]>([]);
  const [copied, setCopied] = React.useState<number | null>(null);

  const generatePalette = () => {
    const newPalette = Array.from({ length: 5 }, () => {
      return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    });
    setPalette(newPalette);
  };

  React.useEffect(generatePalette, []);

  const handleCopy = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex justify-center">
        <button
          onClick={generatePalette}
          className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-200 hover:scale-105 transition-all active:scale-95"
        >
          <RefreshCcw size={24} />
          Generate New Palette
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 h-[500px]">
        {palette.map((color, i) => (
          <div
            key={i}
            className="group relative flex flex-col rounded-[2.5rem] overflow-hidden shadow-xl border border-neutral-200 transition-all hover:-translate-y-2"
          >
            <div 
              className="flex-1 w-full" 
              style={{ backgroundColor: color }}
            />
            <div className="p-6 bg-white flex flex-col items-center gap-4">
              <div className="text-xl font-black text-neutral-900 uppercase tracking-tight">{color}</div>
              <button
                onClick={() => handleCopy(color, i)}
                className="w-full py-3 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-neutral-500 hover:bg-neutral-100 transition-colors"
              >
                {copied === i ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                {copied === i ? 'Copied!' : 'Copy HEX'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900 p-8 rounded-3xl text-center">
        <div className="text-neutral-500 text-sm font-bold uppercase tracking-widest mb-4">Quick Tip</div>
        <p className="text-neutral-300 font-medium">
          Press the <span className="text-white font-black">Spacebar</span> to generate a new palette instantly!
        </p>
      </div>
    </div>
  );
};
