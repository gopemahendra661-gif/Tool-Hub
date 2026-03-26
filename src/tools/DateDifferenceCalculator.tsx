import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export const DateDifferenceCalculator: React.FC = () => {
  const [date1, setDate1] = React.useState(new Date().toISOString().split('T')[0]);
  const [date2, setDate2] = React.useState(new Date().toISOString().split('T')[0]);

  const diff = React.useMemo(() => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    const finalDays = remainingDays % 30;

    return { days, years, months, finalDays };
  }, [date1, date2]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full">
            <label className="block text-sm font-bold text-neutral-900 mb-2">Start Date</label>
            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="text-neutral-300 hidden md:block"><ArrowRight size={32} /></div>
          <div className="w-full">
            <label className="block text-sm font-bold text-neutral-900 mb-2">End Date</label>
            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white text-center shadow-xl shadow-indigo-100">
            <div className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-2">Total Days</div>
            <div className="text-5xl font-black">{diff.days.toLocaleString()}</div>
          </div>
          <div className="p-8 bg-neutral-900 rounded-[2.5rem] text-white text-center">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Detailed Breakdown</div>
            <div className="flex justify-around items-center">
              <div>
                <div className="text-2xl font-bold">{diff.years}</div>
                <div className="text-xs text-neutral-500 uppercase font-bold">Years</div>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <div className="text-2xl font-bold">{diff.months}</div>
                <div className="text-xs text-neutral-500 uppercase font-bold">Months</div>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <div className="text-2xl font-bold">{diff.finalDays}</div>
                <div className="text-xs text-neutral-500 uppercase font-bold">Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
