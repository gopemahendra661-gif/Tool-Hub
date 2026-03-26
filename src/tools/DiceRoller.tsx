import React from 'react';
import { Dice5, RefreshCw } from 'lucide-react';
import { motion, useAnimation } from 'motion/react';

export const DiceRoller: React.FC = () => {
  const [result, setResult] = React.useState(1);
  const [rolling, setRolling] = React.useState(false);
  const controls = useAnimation();

  const roll = async () => {
    if (rolling) return;
    setRolling(true);
    
    // Animation
    await controls.start({
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    });

    const newResult = Math.floor(Math.random() * 6) + 1;
    setResult(newResult);
    setRolling(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-12 text-center space-y-12">
        <motion.div
          animate={controls}
          className="w-40 h-40 bg-indigo-600 rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl shadow-indigo-200 text-white"
        >
          <div className="grid grid-cols-3 grid-rows-3 gap-3 p-6 w-full h-full">
            {/* Dice dots logic */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              const show = (
                (result === 1 && i === 5) ||
                (result === 2 && (i === 1 || i === 9)) ||
                (result === 3 && (i === 1 || i === 5 || i === 9)) ||
                (result === 4 && (i === 1 || i === 3 || i === 7 || i === 9)) ||
                (result === 5 && (i === 1 || i === 3 || i === 5 || i === 7 || i === 9)) ||
                (result === 6 && (i === 1 || i === 3 || i === 4 || i === 6 || i === 7 || i === 9))
              );
              return (
                <div key={i} className={`rounded-full bg-white transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`} />
              );
            })}
          </div>
        </motion.div>

        <div className="space-y-6">
          <div className="text-4xl font-black text-neutral-900">You rolled a {result}!</div>
          <button
            onClick={roll}
            disabled={rolling}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            <RefreshCw size={20} className={rolling ? 'animate-spin' : ''} />
            {rolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        </div>
      </div>
    </div>
  );
};
