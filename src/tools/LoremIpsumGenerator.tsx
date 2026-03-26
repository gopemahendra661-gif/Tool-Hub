import React from 'react';
import { Copy, Check, RefreshCw, Type } from 'lucide-react';

export const LoremIpsumGenerator: React.FC = () => {
  const [paragraphs, setParagraphs] = React.useState(3);
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generateLorem = React.useCallback(() => {
    const text = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
    ];

    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      result.push(text[i % text.length]);
    }
    setOutput(result.join('\n\n'));
  }, [paragraphs]);

  React.useEffect(() => {
    generateLorem();
  }, [generateLorem]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <label className="block text-sm font-bold text-neutral-900 mb-2">Number of Paragraphs</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value))}
                className="flex-1 h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold min-w-[3rem] text-center">{paragraphs}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={generateLorem}
              className="p-4 text-neutral-400 hover:text-indigo-600 hover:bg-neutral-50 rounded-2xl transition-all"
            >
              <RefreshCw size={24} />
            </button>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
        </div>

        <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 min-h-[300px] prose prose-neutral max-w-none">
          {output.split('\n\n').map((p, i) => (
            <p key={i} className="text-neutral-600 leading-relaxed mb-4">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
