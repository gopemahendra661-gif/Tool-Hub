import React from 'react';
import { Binary, Trash2, Copy, Check, ArrowRightLeft } from 'lucide-react';

export const Base64TextTool: React.FC<{ mode: 'encode' | 'decode' }> = ({ mode }) => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState('');

  const process = () => {
    setError('');
    try {
      if (mode === 'encode') {
        // UTF-8 safe Base64 encoding
        const bytes = new TextEncoder().encode(input);
        const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
        setOutput(btoa(binString));
      } else {
        // UTF-8 safe Base64 decoding
        const binString = atob(input);
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
        setOutput(new TextDecoder().decode(bytes));
      }
    } catch (e) {
      setError('Invalid input for ' + mode + 'ing');
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
    if (mode === 'encode') {
      setInput('My Tool Hub is the best!');
    } else {
      setInput('TXkgVG9vbCBIdWIgaXMgdGhlIGJlc3Qh');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Input Text</span>
            <button 
              onClick={loadExample}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Load Example
            </button>
          </div>
          <button onClick={() => setInput('')} className="p-2 text-neutral-500 hover:text-red-500 transition-colors" aria-label="Clear input">
            <Trash2 size={18} />
          </button>
        </div>
        <textarea
          className="w-full h-48 p-6 bg-transparent border-none focus:ring-0 outline-none resize-none font-mono text-lg"
          placeholder={mode === 'encode' ? 'Enter plain text...' : 'Enter Base64 string...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
          <ArrowRightLeft size={24} />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden relative">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Output</span>
          <button onClick={handleCopy} disabled={!output} className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium hover:bg-neutral-50 transition-colors disabled:opacity-50" aria-label="Copy output">
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
