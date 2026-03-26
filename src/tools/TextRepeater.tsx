import React from 'react';
import { Repeat, Copy, Check, Trash2 } from 'lucide-react';

export const TextRepeater: React.FC = () => {
  const [text, setText] = React.useState('');
  const [count, setCount] = React.useState(10);
  const [separator, setSeparator] = React.useState('newline');
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const repeatText = () => {
    if (!text) return;
    const sep = separator === 'newline' ? '\n' : separator === 'space' ? ' ' : '';
    const result = Array(count).fill(text).join(sep);
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Text to Repeat</label>
            <input
              type="text"
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Hello World"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Repeat Count ({count})</label>
            <input
              type="range"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={separator === 'newline'} onChange={() => setSeparator('newline')} className="text-indigo-600" />
              <span className="text-sm font-medium">New Line</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={separator === 'space'} onChange={() => setSeparator('space')} className="text-indigo-600" />
              <span className="text-sm font-medium">Space</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={separator === 'none'} onChange={() => setSeparator('none')} className="text-indigo-600" />
              <span className="text-sm font-medium">None</span>
            </label>
          </div>
          <button
            onClick={repeatText}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Repeat Text
          </button>
        </div>
      </div>

      {output && (
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Result</span>
            <div className="flex gap-2">
              <button onClick={() => setOutput('')} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
              <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium hover:bg-neutral-50 transition-colors">
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <textarea
            className="w-full h-64 p-6 font-mono text-sm bg-transparent border-none focus:ring-0 outline-none resize-none"
            value={output}
            readOnly
          />
        </div>
      )}
    </div>
  );
};
