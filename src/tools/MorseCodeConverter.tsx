import React from 'react';
import { Radio, Trash2, Copy, Check, ArrowRightLeft } from 'lucide-react';

const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

export const MorseCodeConverter: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [mode, setMode] = React.useState<'textToMorse' | 'morseToText'>('textToMorse');
  const [copied, setCopied] = React.useState(false);

  const process = () => {
    if (mode === 'textToMorse') {
      const result = input.toUpperCase().split('').map(char => MORSE_MAP[char] || char).join(' ');
      setOutput(result);
    } else {
      const result = input.split(' ').map(code => REVERSE_MORSE_MAP[code] || code).join('');
      setOutput(result);
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

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <div className="flex bg-white p-1 rounded-xl border border-neutral-200">
            <button
              onClick={() => setMode('textToMorse')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'textToMorse' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-500 hover:bg-neutral-50'}`}
            >
              Text to Morse
            </button>
            <button
              onClick={() => setMode('morseToText')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'morseToText' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-500 hover:bg-neutral-50'}`}
            >
              Morse to Text
            </button>
          </div>
          <button onClick={() => setInput('')} className="p-2 text-neutral-500 hover:text-red-500 transition-colors" aria-label="Clear input">
            <Trash2 size={20} />
          </button>
        </div>
        <textarea
          className="w-full h-48 p-6 bg-transparent border-none focus:ring-0 outline-none resize-none font-mono text-lg"
          placeholder={mode === 'textToMorse' ? 'Enter text...' : 'Enter morse code (e.g., .... . .-.. .-.. ---)'}
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
          className="w-full h-48 p-6 bg-transparent border-none focus:ring-0 outline-none resize-none font-mono text-lg"
          value={output}
          readOnly
        />
      </div>
    </div>
  );
};
