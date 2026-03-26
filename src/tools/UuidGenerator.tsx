import React from 'react';
import { Fingerprint, RefreshCw, Copy, Check } from 'lucide-react';

export const UuidGenerator: React.FC = () => {
  const [uuid, setUuid] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generate = () => {
    const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setUuid(newUuid);
  };

  React.useEffect(generate, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-12 text-center space-y-8">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
          <Fingerprint size={40} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Generated UUID v4</h3>
          <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 font-mono text-xl md:text-2xl text-neutral-900 break-all">
            {uuid}
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={generate}
            className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <RefreshCw size={20} /> Generate New
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-8 py-4 bg-white border border-neutral-200 text-neutral-900 font-bold rounded-2xl hover:bg-neutral-50 transition-all shadow-sm"
          >
            {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
            {copied ? 'Copied!' : 'Copy UUID'}
          </button>
        </div>
      </div>
    </div>
  );
};
