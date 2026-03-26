import React from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [minutes, setMinutes] = React.useState(5);
  const [seconds, setSeconds] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(300);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound or alert
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => {});
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  
  const reset = () => {
    setIsActive(false);
    setTimeLeft(minutes * 60 + seconds);
  };

  const setTimer = () => {
    setIsActive(false);
    setTimeLeft(minutes * 60 + seconds);
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-12 text-center space-y-12">
        <div className="flex justify-center items-center gap-4">
          <div className="w-24">
            <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Min</label>
            <input type="number" value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value) || 0)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-center font-bold text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-300 mt-6">:</div>
          <div className="w-24">
            <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Sec</label>
            <input type="number" value={seconds} onChange={(e) => setSeconds(parseInt(e.target.value) || 0)} className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-center font-bold text-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button onClick={setTimer} className="mt-6 px-6 py-4 bg-neutral-900 text-white font-bold rounded-2xl hover:bg-neutral-800 transition-all">Set</button>
        </div>

        <div className="relative inline-flex items-center justify-center">
          <svg className="w-64 h-64 transform -rotate-90">
            <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-neutral-100" />
            <circle 
              cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray={754}
              strokeDashoffset={754 - (754 * timeLeft) / (minutes * 60 + seconds || 1)}
              className="text-indigo-600 transition-all duration-1000"
            />
          </svg>
          <div className="absolute text-6xl font-black text-neutral-900 font-mono">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggle}
            className={`flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-lg ${isActive ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-indigo-600 text-white shadow-indigo-200'}`}
          >
            {isActive ? <Pause size={24} /> : <Play size={24} />}
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-10 py-5 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-2xl hover:bg-neutral-50 transition-all shadow-sm"
          >
            <RotateCcw size={24} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};
