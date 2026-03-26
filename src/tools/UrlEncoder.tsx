import React from 'react';
import { Copy, Check, Trash2, Link as LinkIcon, Unlink } from 'lucide-react';

export const UrlEncoder: React.FC = () => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (e) {
      setOutput('Error: Could not encode URL');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput('Error: Invalid URL encoding');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = () => {
    setInput('https://www.mytoolhub.info/search?q=free online tools&category=developer');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Input URL / Text</span>
              <button 
                onClick={loadExample}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Load Example
              </button>
            </div>
            <button 
              onClick={() => setInput('')}
              className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <textarea
            className="w-full h-[300px] p-6 font-mono text-sm bg-transparent border-none focus:ring-0 outline-none resize-none"
            placeholder="https://example.com?query=hello world"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Result</span>
            {output && (
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium hover:bg-neutral-50 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-auto max-h-[300px] whitespace-pre-wrap break-all">
            {output || <span className="text-neutral-300">Encoded/Decoded result will appear here...</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handleEncode}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <LinkIcon size={20} /> Encode URL
        </button>
        <button
          onClick={handleDecode}
          className="flex items-center gap-2 px-8 py-4 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-2xl hover:bg-neutral-50 transition-all shadow-sm"
        >
          <Unlink size={20} /> Decode URL
        </button>
      </div>
    </div>
  );
};
