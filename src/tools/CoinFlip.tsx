import React from 'react';
import { CircleDot, RefreshCw } from 'lucide-react';
import { motion, useAnimation } from 'motion/react';

export const CoinFlip: React.FC = () => {
  const [result, setResult] = React.useState<'Heads' | 'Tails'>('Heads');
  const [flipping, setFlipping] = React.useState(false);
  const controls = useAnimation();

  const flip = async () => {
    if (flipping) return;
    setFlipping(true);
    
    await controls.start({
      rotateY: [0, 720, 1440],
      scale: [1, 1.5, 1],
      transition: { duration: 0.8, ease: "easeInOut" }
    });

    const newResult = Math.random() > 0.5 ? 'Heads' : 'Tails';
    setResult(newResult);
    setFlipping(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-12 text-center space-y-12">
        <motion.div
          animate={controls}
          className="w-40 h-40 bg-amber-400 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-amber-100 border-8 border-amber-500 relative overflow-hidden"
        >
          <div className="text-amber-800 font-black text-4xl uppercase tracking-tighter">
            {result[0]}
          </div>
          <div className="absolute inset-0 border-4 border-amber-300/30 rounded-full pointer-events-none" />
        </motion.div>

        <div className="space-y-6">
          <div className="text-4xl font-black text-neutral-900">It's {result}!</div>
          <button
            onClick={flip}
            disabled={flipping}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            <RefreshCw size={20} className={flipping ? 'animate-spin' : ''} />
            {flipping ? 'Flipping...' : 'Flip Coin'}
          </button>
        </div>
      </div>
    </div>
  );
};
