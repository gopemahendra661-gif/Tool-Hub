import React from 'react';
import { RefreshCcw, Copy, Check } from 'lucide-react';

export const ColorCodeConverter: React.FC = () => {
  const [hex, setHex] = React.useState('#6366f1');
  const [copied, setCopied] = React.useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb = hexToRgb(hex);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-12 space-y-12">
        <div className="flex flex-col items-center gap-8">
          <div className="w-32 h-32 rounded-3xl shadow-xl border-4 border-white" style={{ backgroundColor: hex }} />
          <div className="w-full">
            <label className="block text-xs font-bold text-neutral-400 uppercase mb-2 text-center">HEX Color Code</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full p-6 bg-neutral-50 border border-neutral-200 rounded-2xl text-center font-black text-3xl uppercase tracking-tight outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-neutral-400 uppercase mb-1">RGB</div>
              <div className="text-xl font-bold text-neutral-900">
                {rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'Invalid HEX'}
              </div>
            </div>
            <button
              onClick={() => handleCopy(rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '', 'rgb')}
              className="p-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all shadow-sm"
            >
              {copied === 'rgb' ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
            </button>
          </div>

          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-neutral-400 uppercase mb-1">RGBA</div>
              <div className="text-xl font-bold text-neutral-900">
                {rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : 'Invalid HEX'}
              </div>
            </div>
            <button
              onClick={() => handleCopy(rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` : '', 'rgba')}
              className="p-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all shadow-sm"
            >
              {copied === 'rgba' ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
