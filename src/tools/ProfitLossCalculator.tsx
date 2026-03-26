import React from 'react';
import { BarChart3 } from 'lucide-react';

export const ProfitLossCalculator: React.FC = () => {
  const [cp, setCp] = React.useState(100);
  const [sp, setSp] = React.useState(120);

  const diff = sp - cp;
  const percentage = (Math.abs(diff) / cp) * 100;
  const isProfit = diff >= 0;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Cost Price (₹)</label>
            <input type="number" value={cp} onChange={(e) => setCp(parseFloat(e.target.value) || 0)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Selling Price (₹)</label>
            <input type="number" value={sp} onChange={(e) => setSp(parseFloat(e.target.value) || 0)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>

        <div className={`p-8 rounded-[2.5rem] text-white space-y-6 shadow-xl ${isProfit ? 'bg-emerald-600 shadow-emerald-100' : 'bg-red-600 shadow-red-100'}`}>
          <div className="text-center">
            <div className="text-sm font-bold opacity-80 uppercase tracking-widest mb-2">{isProfit ? 'Profit' : 'Loss'} Amount</div>
            <div className="text-5xl font-black">₹{Math.abs(diff).toFixed(2)}</div>
          </div>
          <div className="pt-6 border-t border-white/20 flex justify-between items-center">
            <span className="text-lg font-bold">{isProfit ? 'Profit' : 'Loss'} Percentage</span>
            <span className="text-3xl font-black">{percentage.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
