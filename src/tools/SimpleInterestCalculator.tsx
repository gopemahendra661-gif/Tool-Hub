import React from 'react';
import { TrendingUp } from 'lucide-react';

export const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = React.useState(10000);
  const [rate, setRate] = React.useState(5);
  const [time, setTime] = React.useState(1);

  const interest = (principal * rate * time) / 100;
  const total = principal + interest;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Principal (₹)</label>
            <input type="number" value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Rate (% p.a.)</label>
            <input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Time (Years)</label>
            <input type="number" value={time} onChange={(e) => setTime(parseFloat(e.target.value) || 0)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>

        <div className="p-8 bg-neutral-900 rounded-[2.5rem] text-white space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 font-bold">Interest Amount</span>
            <span className="text-2xl font-bold text-emerald-400">₹{interest.toFixed(2)}</span>
          </div>
          <div className="pt-6 border-t border-neutral-800 flex justify-between items-center">
            <span className="text-lg font-bold">Total Amount</span>
            <span className="text-4xl font-black text-indigo-400">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
