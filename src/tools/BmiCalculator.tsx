import React from 'react';
import { Scale, Info } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const [weight, setWeight] = React.useState(70);
  const [height, setHeight] = React.useState(170);
  const [unit, setUnit] = React.useState<'metric' | 'imperial'>('metric');

  const bmi = React.useMemo(() => {
    if (unit === 'metric') {
      const heightInMeters = height / 100;
      return weight / (heightInMeters * heightInMeters);
    } else {
      // weight in lbs, height in inches
      return (weight / (height * height)) * 703;
    }
  }, [weight, height, unit]);

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' };
    if (val < 25) return { label: 'Normal weight', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' };
    if (val < 30) return { label: 'Overweight', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' };
    return { label: 'Obese', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' };
  };

  const category = getCategory(bmi);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8">
        {/* Unit Toggle */}
        <div className="flex bg-neutral-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => setUnit('metric')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${unit === 'metric' ? 'bg-white text-indigo-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${unit === 'imperial' ? 'bg-white text-indigo-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            Imperial (lb/in)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-bold text-neutral-900">Weight ({unit === 'metric' ? 'kg' : 'lb'})</label>
                <span className="text-indigo-600 font-bold">{weight}</span>
              </div>
              <input
                type="range"
                min={unit === 'metric' ? 30 : 60}
                max={unit === 'metric' ? 200 : 450}
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-bold text-neutral-900">Height ({unit === 'metric' ? 'cm' : 'in'})</label>
                <span className="text-indigo-600 font-bold">{height}</span>
              </div>
              <input
                type="range"
                min={unit === 'metric' ? 100 : 40}
                max={unit === 'metric' ? 250 : 100}
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col items-center justify-center p-8 bg-neutral-50 rounded-3xl border border-neutral-100 text-center">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Your BMI</div>
            <div className="text-6xl font-black text-neutral-900 mb-4">{bmi.toFixed(1)}</div>
            <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${category.bg} ${category.color} ${category.border}`}>
              {category.label}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-4">
          <div className="text-indigo-600 shrink-0">
            <Info size={24} />
          </div>
          <div className="text-sm text-indigo-900 leading-relaxed">
            <p className="font-bold mb-1">What does this mean?</p>
            Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.
          </div>
        </div>
      </div>
    </div>
  );
};
