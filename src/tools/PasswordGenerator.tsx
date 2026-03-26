import React from 'react';
import { Copy, Check, RefreshCw, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = React.useState(16);
  const [options, setOptions] = React.useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generatePassword = React.useCallback(() => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let availableChars = '';
    if (options.uppercase) availableChars += charset.uppercase;
    if (options.lowercase) availableChars += charset.lowercase;
    if (options.numbers) availableChars += charset.numbers;
    if (options.symbols) availableChars += charset.symbols;

    if (!availableChars) {
      setPassword('Please select at least one option');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    setPassword(result);
  }, [length, options]);

  React.useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (password.length < 8) return { label: 'Weak', color: 'text-red-500', icon: ShieldAlert };
    if (password.length < 12) return { label: 'Medium', color: 'text-amber-500', icon: Shield };
    return { label: 'Strong', color: 'text-emerald-500', icon: ShieldCheck };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-8">
        {/* Result Display */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative flex items-center bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
            <div className="flex-1 font-mono text-2xl md:text-3xl tracking-wider text-neutral-900 break-all">
              {password}
            </div>
            <div className="flex gap-2 ml-4">
              <button 
                onClick={generatePassword}
                className="p-3 text-neutral-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm"
                title="Regenerate"
              >
                <RefreshCw size={24} />
              </button>
              <button 
                onClick={handleCopy}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                title="Copy"
              >
                {copied ? <Check size={24} /> : <Copy size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Strength Indicator */}
        <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-100">
          <strength.icon className={strength.color} size={20} />
          <span className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Strength:</span>
          <span className={`text-sm font-bold ${strength.color}`}>{strength.label}</span>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-neutral-900">Password Length</label>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg font-bold">{length}</span>
            </div>
            <input
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100 cursor-pointer hover:border-indigo-200 transition-colors group">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setOptions(prev => ({ ...prev, [key]: !value }))}
                  className="w-5 h-5 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-bold text-neutral-700 capitalize group-hover:text-indigo-600 transition-colors">
                  Include {key}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
