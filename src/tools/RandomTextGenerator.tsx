import React from 'react';
import { Type, RefreshCw, Copy, Check, Trash2 } from 'lucide-react';

export const RandomTextGenerator: React.FC = () => {
  const [length, setLength] = React.useState(16);
  const [includeUppercase, setIncludeUppercase] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSymbols, setIncludeSymbols] = React.useState(false);
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generate = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setOutput(result);
  };

  React.useEffect(generate, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-bold text-neutral-900">String Length</label>
                <span className="text-indigo-600 font-bold">{length}</span>
              </div>
              <input type="range" min="4" max="128" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
                <span className="font-bold text-neutral-700">Include Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
                <span className="font-bold text-neutral-700">Include Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
                <span className="font-bold text-neutral-700">Include Symbols (!@#)</span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center text-center p-8 bg-neutral-50 rounded-[2.5rem] border border-neutral-100">
            <div className="w-16 h-16 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm mb-6">
              <Type size={32} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Random String</h3>
            <p className="text-neutral-500 mb-8">Generate random text for testing, passwords, or identifiers.</p>
            <button
              onClick={generate}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              <RefreshCw size={20} /> Generate New
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Generated Result</span>
          <div className="flex gap-2">
            <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors">
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="p-8 font-mono text-2xl text-neutral-900 break-all text-center">
          {output}
        </div>
      </div>
    </div>
  );
};
