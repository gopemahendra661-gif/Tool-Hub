import React from 'react';
import { Binary, Trash2, Copy, Check, ArrowRightLeft } from 'lucide-react';

export const BinaryConverter: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [mode, setMode] = React.useState<'textToBinary' | 'binaryToText'>('textToBinary');
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState('');

  const process = () => {
    setError('');
    try {
      if (mode === 'textToBinary') {
        const result = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        setOutput(result);
      } else {
        const result = input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        setOutput(result);
      }
    } catch (e) {
      setError('Invalid input for conversion');
      setOutput('');
    }
  };

  React.useEffect(() => {
    if (input) process();
    else setOutput('');
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    if (mode === 'textToBinary') {
      setInput('Hello');
    } else {
      setInput('01001000 01100101 01101100 01101100 01101111');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex bg-white p-1 rounded-xl border border-neutral-200">
              <button
                onClick={() => setMode('textToBinary')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'textToBinary' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-500 hover:bg-neutral-50'}`}
              >
                Text to Binary
              </button>
              <button
                onClick={() => setMode('binaryToText')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'binaryToText' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-500 hover:bg-neutral-50'}`}
              >
                Binary to Text
              </button>
            </div>
            <button 
              onClick={loadExample}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Load Example
            </button>
          </div>
          <button onClick={() => setInput('')} className="p-2 text-neutral-500 hover:text-red-500 transition-colors" aria-label="Clear input">
            <Trash2 size={20} />
          </button>
        </div>
        <textarea
          className="w-full h-48 p-6 bg-transparent border-none focus:ring-0 outline-none resize-none font-mono text-lg"
          placeholder={mode === 'textToBinary' ? 'Enter text...' : 'Enter binary (e.g., 01001000 01100101...)'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
          <ArrowRightLeft size={24} />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Result</span>
          <button onClick={handleCopy} disabled={!output} className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium hover:bg-neutral-50 transition-colors disabled:opacity-50" aria-label="Copy result">
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <textarea
          className={`w-full h-48 p-6 bg-transparent border-none focus:ring-0 outline-none resize-none font-mono text-lg ${error ? 'text-red-500' : ''}`}
          value={error || output}
          readOnly
        />
      </div>
    </div>
  );
};
