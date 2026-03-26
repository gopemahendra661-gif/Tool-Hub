import React from 'react';
import { Copy, Check, Trash2, Type } from 'lucide-react';

export const CaseConverter: React.FC = () => {
  const [text, setText] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const convert = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'camel') => {
    let result = text;
    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'camel':
        result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
    }
    setText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100 flex flex-wrap gap-3 bg-neutral-50/50">
        <button onClick={() => convert('upper')} className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all">UPPERCASE</button>
        <button onClick={() => convert('lower')} className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all">lowercase</button>
        <button onClick={() => convert('title')} className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all">Title Case</button>
        <button onClick={() => convert('sentence')} className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all">Sentence case</button>
        <button onClick={() => convert('camel')} className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-indigo-500 hover:text-indigo-600 transition-all">camelCase</button>
      </div>

      <div className="p-6">
        <textarea
          className="w-full h-64 p-6 bg-neutral-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all resize-none text-lg outline-none"
          placeholder="Paste or type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="p-6 border-t border-neutral-100 flex justify-between items-center bg-neutral-50/50">
        <div className="text-sm text-neutral-500 font-medium">
          {text.length} characters | {text.trim() ? text.trim().split(/\s+/).length : 0} words
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setText('')}
            className="p-3 text-neutral-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>
    </div>
  );
};
