import React from 'react';
import { Calculator, Info } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = React.useState(1000000);
  const [interestRate, setInterestRate] = React.useState(8.5);
  const [tenure, setTenure] = React.useState(20);

  const emi = React.useMemo(() => {
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emiValue = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emiValue;
  }, [loanAmount, interestRate, tenure]);

  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 space-y-8 border-r border-neutral-100">
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-neutral-900">Loan Amount</label>
              <span className="text-indigo-600 font-bold">₹{loanAmount.toLocaleString()}</span>
            </div>
            <input type="range" min="10000" max="10000000" step="10000" value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))} className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-neutral-900">Interest Rate (%)</label>
              <span className="text-indigo-600 font-bold">{interestRate}%</span>
            </div>
            <input type="range" min="1" max="20" step="0.1" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-neutral-900">Tenure (Years)</label>
              <span className="text-indigo-600 font-bold">{tenure} Years</span>
            </div>
            <input type="range" min="1" max="30" value={tenure} onChange={(e) => setTenure(parseInt(e.target.value))} className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
          </div>
        </div>

        <div className="p-8 bg-neutral-50 flex flex-col justify-center space-y-8">
          <div className="text-center">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">Monthly EMI</div>
            <div className="text-5xl font-black text-indigo-600">₹{Math.round(emi).toLocaleString()}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 text-center">
              <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Total Interest</div>
              <div className="text-lg font-bold text-neutral-900">₹{Math.round(totalInterest).toLocaleString()}</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-neutral-200 text-center">
              <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Total Payment</div>
              <div className="text-lg font-bold text-neutral-900">₹{Math.round(totalPayment).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
