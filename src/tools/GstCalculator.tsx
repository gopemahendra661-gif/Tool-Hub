import React from 'react';
import { Percent, IndianRupee } from 'lucide-react';

export const GstCalculator: React.FC = () => {
  const [amount, setAmount] = React.useState(1000);
  const [gstRate, setGstRate] = React.useState(18);
  const [type, setType] = React.useState<'add' | 'remove'>('add');

  const gstAmount = type === 'add' 
    ? (amount * gstRate) / 100 
    : amount - (amount * (100 / (100 + gstRate)));
  
  const totalAmount = type === 'add' ? amount + gstAmount : amount;
  const netAmount = type === 'add' ? amount : amount - gstAmount;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-8">
        <div className="flex bg-neutral-100 p-1 rounded-2xl">
          <button
            onClick={() => setType('add')}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${type === 'add' ? 'bg-white text-indigo-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            Add GST
          </button>
          <button
            onClick={() => setType('remove')}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${type === 'remove' ? 'bg-white text-indigo-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            Remove GST
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">GST Rate (%)</label>
            <div className="grid grid-cols-4 gap-3">
              {[5, 12, 18, 28].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setGstRate(rate)}
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${gstRate === rate ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-neutral-100 bg-neutral-50 text-neutral-500 hover:border-neutral-200'}`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 bg-neutral-900 rounded-[2.5rem] text-white space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 font-bold">Net Amount</span>
            <span className="text-xl font-bold">₹{netAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400 font-bold">GST Amount ({gstRate}%)</span>
            <span className="text-xl font-bold text-emerald-400">+ ₹{gstAmount.toFixed(2)}</span>
          </div>
          <div className="pt-6 border-t border-neutral-800 flex justify-between items-center">
            <span className="text-lg font-bold">Total Amount</span>
            <span className="text-3xl font-black text-indigo-400">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
