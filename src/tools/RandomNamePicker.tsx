import React from 'react';
import { User, RefreshCw, Trash2, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const RandomNamePicker: React.FC = () => {
  const [namesText, setNamesText] = React.useState('');
  const [winner, setWinner] = React.useState<string | null>(null);
  const [picking, setPicking] = React.useState(false);

  const pickWinner = async () => {
    const names = namesText.split('\n').map(n => n.trim()).filter(n => n !== '');
    if (names.length === 0) return;

    setPicking(true);
    setWinner(null);

    // Simulate picking animation
    for (let i = 0; i < 20; i++) {
      setWinner(names[Math.floor(Math.random() * names.length)]);
      await new Promise(r => setTimeout(r, 50 + i * 10));
    }

    setWinner(names[Math.floor(Math.random() * names.length)]);
    setPicking(false);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 space-y-6">
        <div>
          <label className="block text-sm font-bold text-neutral-900 mb-2">Enter Names (One per line)</label>
          <textarea
            className="w-full h-80 p-6 bg-neutral-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all resize-none outline-none font-medium"
            placeholder="John Doe&#10;Jane Smith&#10;Bob Wilson..."
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={pickWinner}
            disabled={picking || !namesText.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
          >
            <RefreshCw size={20} className={picking ? 'animate-spin' : ''} />
            {picking ? 'Picking...' : 'Pick a Winner'}
          </button>
          <button onClick={() => {setNamesText(''); setWinner(null);}} className="p-4 text-neutral-400 hover:text-red-500 transition-colors">
            <Trash2 size={24} />
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl" />
        </div>

        <AnimatePresence mode="wait">
          {winner ? (
            <motion.div
              key={winner}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="space-y-6 relative z-10"
            >
              <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-amber-400/20">
                <Trophy size={48} className="text-amber-900" />
              </div>
              <div className="text-sm font-bold text-indigo-400 uppercase tracking-[0.3em]">The Winner Is</div>
              <div className="text-5xl font-black text-white break-all">{winner}</div>
            </motion.div>
          ) : (
            <div className="space-y-4 relative z-10">
              <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
                <User size={40} className="text-neutral-600" />
              </div>
              <p className="text-neutral-500 font-medium">Add names and click the button to pick a winner!</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
