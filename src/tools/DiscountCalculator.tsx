import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';

export const DiscountCalculator: React.FC = () => {
  const [price, setPrice] = React.useState(1000);
  const [discount, setDiscount] = React.useState(20);

  const savings = (price * discount) / 100;
  const finalPrice = price - savings;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Original Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white space-y-6 shadow-xl shadow-emerald-100">
          <div className="flex justify-between items-center">
            <span className="text-emerald-100 font-bold">You Save</span>
            <span className="text-2xl font-bold">₹{savings.toFixed(2)}</span>
          </div>
          <div className="pt-6 border-t border-emerald-500 flex justify-between items-center">
            <span className="text-lg font-bold">Final Price</span>
            <span className="text-4xl font-black">₹{finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
