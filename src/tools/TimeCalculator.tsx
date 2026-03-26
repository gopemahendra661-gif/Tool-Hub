import React from 'react';
import { Clock, Plus, Minus, Trash2, RotateCcw } from 'lucide-react';

export const TimeCalculator: React.FC = () => {
  const [hours1, setHours1] = React.useState('0');
  const [minutes1, setMinutes1] = React.useState('0');
  const [seconds1, setSeconds1] = React.useState('0');
  const [hours2, setHours2] = React.useState('0');
  const [minutes2, setMinutes2] = React.useState('0');
  const [seconds2, setSeconds2] = React.useState('0');
  const [operation, setOperation] = React.useState<'add' | 'subtract'>('add');
  const [result, setResult] = React.useState({ h: 0, m: 0, s: 0 });

  const calculate = () => {
    const t1 = (parseInt(hours1) || 0) * 3600 + (parseInt(minutes1) || 0) * 60 + (parseInt(seconds1) || 0);
    const t2 = (parseInt(hours2) || 0) * 3600 + (parseInt(minutes2) || 0) * 60 + (parseInt(seconds2) || 0);
    
    let totalSeconds = operation === 'add' ? t1 + t2 : t1 - t2;
    if (totalSeconds < 0) totalSeconds = 0;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    setResult({ h, m, s });
  };

  React.useEffect(calculate, [hours1, minutes1, seconds1, hours2, minutes2, seconds2, operation]);

  const reset = () => {
    setHours1('0'); setMinutes1('0'); setSeconds1('0');
    setHours2('0'); setMinutes2('0'); setSeconds2('0');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-neutral-200 space-y-6">
          <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Time Duration 1</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Hours</label>
              <input type="number" value={hours1} onChange={(e) => setHours1(e.target.value)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Minutes</label>
              <input type="number" value={minutes1} onChange={(e) => setMinutes1(e.target.value)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Seconds</label>
              <input type="number" value={seconds1} onChange={(e) => setSeconds1(e.target.value)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-neutral-200 space-y-6">
          <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Time Duration 2</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Hours</label>
              <input type="number" value={hours2} onChange={(e) => setHours2(e.target.value)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Minutes</label>
              <input type="number" value={minutes2} onChange={(e) => setMinutes2(e.target.value)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Seconds</label>
              <input type="number" value={seconds2} onChange={(e) => setSeconds2(e.target.value)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setOperation('add')}
          className={`p-6 rounded-2xl font-bold transition-all ${operation === 'add' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-white text-neutral-400 border border-neutral-200 hover:bg-neutral-50'}`}
        >
          <Plus size={32} />
        </button>
        <button
          onClick={() => setOperation('subtract')}
          className={`p-6 rounded-2xl font-bold transition-all ${operation === 'subtract' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-white text-neutral-400 border border-neutral-200 hover:bg-neutral-50'}`}
        >
          <Minus size={32} />
        </button>
        <button onClick={reset} className="p-6 bg-white text-neutral-400 border border-neutral-200 rounded-2xl hover:text-red-500 transition-all">
          <RotateCcw size={32} />
        </button>
      </div>

      <div className="bg-neutral-900 rounded-[3rem] p-12 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Clock size={120} className="text-white" />
        </div>
        <div className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Calculated Result</div>
        <div className="flex justify-center gap-8">
          <div className="space-y-2">
            <div className="text-6xl font-black text-white">{result.h}</div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Hours</div>
          </div>
          <div className="text-6xl font-black text-neutral-700">:</div>
          <div className="space-y-2">
            <div className="text-6xl font-black text-white">{result.m}</div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Minutes</div>
          </div>
          <div className="text-6xl font-black text-neutral-700">:</div>
          <div className="space-y-2">
            <div className="text-6xl font-black text-white">{result.s}</div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};
