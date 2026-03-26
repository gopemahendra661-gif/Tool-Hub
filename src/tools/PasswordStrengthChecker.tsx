import React from 'react';
import { ShieldCheck, ShieldAlert, Shield, Check, X } from 'lucide-react';

export const PasswordStrengthChecker: React.FC = () => {
  const [password, setPassword] = React.useState('');

  const getStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return { score: 0, label: 'None', color: 'bg-neutral-200' };
    
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500', icon: ShieldAlert };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-amber-500', icon: Shield };
    return { score, label: 'Strong', color: 'bg-emerald-500', icon: ShieldCheck };
  };

  const strength = getStrength(password);
  const Icon = strength.icon || Shield;

  const checks = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
    { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200">
        <label className="block text-sm font-bold text-neutral-900 mb-4 uppercase tracking-wider">Test Your Password</label>
        <input
          type="text"
          className="w-full p-6 bg-neutral-50 border border-neutral-200 rounded-2xl text-2xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${strength.color} text-white shadow-lg`}>
              <Icon size={32} />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Strength</div>
              <div className="text-3xl font-black text-neutral-900">{strength.label}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Score</div>
            <div className="text-3xl font-black text-neutral-900">{strength.score}/5</div>
          </div>
        </div>

        <div className="h-4 w-full bg-neutral-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${strength.color}`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {checks.map((check, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              {check.met ? (
                <Check size={20} className="text-emerald-500" />
              ) : (
                <X size={20} className="text-neutral-300" />
              )}
              <span className={`text-sm font-bold ${check.met ? 'text-neutral-900' : 'text-neutral-400'}`}>
                {check.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
