import React from 'react';
import { Ruler, Weight, Thermometer, Droplets, ArrowRightLeft } from 'lucide-react';

const UNITS = {
  length: {
    name: 'Length',
    icon: Ruler,
    units: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      miles: 0.000621371,
      yards: 1.09361,
      feet: 3.28084,
      inches: 39.3701
    }
  },
  weight: {
    name: 'Weight',
    icon: Weight,
    units: {
      kilograms: 1,
      grams: 1000,
      milligrams: 1000000,
      pounds: 2.20462,
      ounces: 35.274,
      metric_tons: 0.001
    }
  },
  temperature: {
    name: 'Temperature',
    icon: Thermometer,
    units: {
      celsius: 'C',
      fahrenheit: 'F',
      kelvin: 'K'
    }
  }
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = React.useState<keyof typeof UNITS>('length');
  const [fromUnit, setFromUnit] = React.useState('');
  const [toUnit, setToUnit] = React.useState('');
  const [value, setValue] = React.useState('1');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    const unitKeys = Object.keys(UNITS[category].units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
  }, [category]);

  const convert = () => {
    if (!value || isNaN(parseFloat(value))) return;
    const val = parseFloat(value);

    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5/9;
      if (fromUnit === 'kelvin') celsius = val - 273.15;

      let final = celsius;
      if (toUnit === 'fahrenheit') final = (celsius * 9/5) + 32;
      if (toUnit === 'kelvin') final = celsius + 273.15;
      setResult(final.toFixed(2));
    } else {
      const units = UNITS[category].units as Record<string, number>;
      const baseValue = val / units[fromUnit];
      const final = baseValue * units[toUnit];
      setResult(final.toLocaleString(undefined, { maximumFractionDigits: 4 }));
    }
  };

  React.useEffect(convert, [value, fromUnit, toUnit, category]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(UNITS).map(([key, data]) => {
          const Icon = data.icon;
          return (
            <button
              key={key}
              onClick={() => setCategory(key as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${category === key ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-neutral-500 border border-neutral-200 hover:bg-neutral-50'}`}
            >
              <Icon size={20} />
              {data.name}
            </button>
          );
        })}
      </div>

      <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-3">From</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-2xl font-black outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-40 p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-bold outline-none"
                >
                  {Object.keys(UNITS[category].units).map(u => (
                    <option key={u} value={u}>{u.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-12 h-12 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center">
                <ArrowRightLeft size={24} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-3">To</label>
              <div className="flex gap-4">
                <div className="flex-1 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-2xl font-black text-indigo-600">
                  {result}
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-40 p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-bold outline-none"
                >
                  {Object.keys(UNITS[category].units).map(u => (
                    <option key={u} value={u}>{u.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center p-12 bg-neutral-50 rounded-[2.5rem] border border-neutral-100">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Conversion Result</div>
            <div className="text-5xl font-black text-neutral-900 mb-2">{result}</div>
            <div className="text-xl font-bold text-indigo-600 uppercase tracking-tight">{toUnit.replace('_', ' ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
