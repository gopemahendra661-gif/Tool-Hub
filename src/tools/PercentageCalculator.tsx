import React from 'react';
import { Percent, ArrowRight } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = React.useState(10);
  const [val2, setVal2] = React.useState(100);
  
  const result1 = (val1 / 100) * val2;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-12">
        <div className="text-center">
          <h3 className="text-xl font-bold text-neutral-900 mb-8">What is X% of Y?</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="w-full md:w-32">
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Percentage (%)</label>
              <input type="number" value={val1} onChange={(e) => setVal1(parseFloat(e.target.value))} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-center font-bold text-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="text-neutral-300"><ArrowRight size={24} /></div>
            <div className="w-full md:w-48">
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Of Value</label>
              <input type="number" value={val2} onChange={(e) => setVal2(parseFloat(e.target.value))} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-center font-bold text-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white text-center shadow-xl shadow-indigo-200">
          <div className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-2">Result</div>
          <div className="text-6xl font-black">{result1.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
