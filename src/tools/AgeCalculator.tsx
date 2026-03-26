import React from 'react';
import { Calendar, Clock, Info } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = React.useState('');
  const [age, setAge] = React.useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8">
        <div className="space-y-6 mb-12">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Select Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="date"
                className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={calculateAge}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Calculate Age
          </button>
        </div>

        {age && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
              <div className="text-3xl font-black text-indigo-600">{age.years}</div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mt-1">Years</div>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 text-center">
              <div className="text-3xl font-black text-purple-600">{age.months}</div>
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mt-1">Months</div>
            </div>
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
              <div className="text-3xl font-black text-emerald-600">{age.days}</div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mt-1">Days</div>
            </div>
          </div>
        )}

        {!age && (
          <div className="p-12 text-center bg-neutral-50 rounded-3xl border border-dashed border-neutral-200">
            <Clock size={48} className="mx-auto mb-4 text-neutral-300" />
            <p className="text-neutral-500">Enter your birth date to see your age</p>
          </div>
        )}
      </div>
    </div>
  );
};
