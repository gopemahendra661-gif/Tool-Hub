import React from 'react';
import { FileCode2, Trash2, Copy, Check, Zap } from 'lucide-react';

export const DevTools: React.FC<{ mode: 'html-min' | 'css-min' | 'js-min' | 'html-fmt' | 'css-fmt' | 'js-fmt' }> = ({ mode }) => {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const process = () => {
    if (!input) {
      setOutput('');
      return;
    }

    let result = input;
    switch (mode) {
      case 'html-min':
        result = input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').replace(/<!--[\s\S]*?-->/g, '');
        break;
      case 'css-min':
        result = input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim();
        break;
      case 'js-min':
        result = input.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
        break;
      case 'html-fmt':
        // Simple indentation for demo, real formatter would use a library
        let indent = 0;
        result = input.replace(/>\s*</g, '>\n<').split('\n').map(line => {
          if (line.match(/<\/\w+/)) indent--;
          const s = '  '.repeat(Math.max(0, indent)) + line.trim();
          if (line.match(/<\w+/) && !line.match(/<\/\w+/) && !line.match(/\/>/)) indent++;
          return s;
        }).join('\n');
        break;
      case 'css-fmt':
        result = input.replace(/\s*\{\s*/g, ' {\n  ').replace(/\s*;\s*/g, ';\n  ').replace(/\s*\}\s*/g, '\n}\n').replace(/\n\s*\n/g, '\n').trim();
        break;
      case 'js-fmt':
        result = input.replace(/\s*\{\s*/g, ' {\n  ').replace(/\s*;\s*/g, ';\n  ').replace(/\s*\}\s*/g, '\n}\n').replace(/\n\s*\n/g, '\n').trim();
        break;
    }
    setOutput(result);
  };

  React.useEffect(process, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTitle = () => {
    switch (mode) {
      case 'html-min': return 'HTML Minifier';
      case 'css-min': return 'CSS Minifier';
      case 'js-min': return 'JS Minifier';
      case 'html-fmt': return 'HTML Formatter';
      case 'css-fmt': return 'CSS Formatter';
      case 'js-fmt': return 'JS Formatter';
    }
  };

  const loadExample = () => {
    let example = '';
    switch (mode) {
      case 'html-min':
      case 'html-fmt':
        example = '<div class="container">\n  <h1>Hello World</h1>\n  <p>Welcome to My Tool Hub.</p>\n  <!-- This is a comment -->\n</div>';
        break;
      case 'css-min':
      case 'css-fmt':
        example = '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n  background-color: #f0f0f0;\n}';
        break;
      case 'js-min':
      case 'js-fmt':
        example = 'function greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\n// Call the function\ngreet("User");';
        break;
    }
    setInput(example);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-neutral-200 rounded-lg text-indigo-600">
                <FileCode2 size={20} />
              </div>
              <span className="font-bold text-neutral-900">{getTitle()}</span>
            </div>
            <button 
              onClick={loadExample}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Load Example
            </button>
          </div>
          <button onClick={() => setInput('')} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
        <textarea
          className="w-full h-64 p-8 bg-transparent border-none focus:ring-0 outline-none resize-none font-mono text-sm leading-relaxed"
          placeholder="Paste your code here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <div className="px-6 py-3 bg-neutral-900 text-white rounded-full flex items-center gap-3 shadow-xl">
          <Zap size={20} className="text-indigo-400" />
          <span className="text-sm font-bold uppercase tracking-widest">Processing Instant</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Output</span>
          <button onClick={handleCopy} disabled={!output} className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:bg-neutral-50 transition-colors disabled:opacity-50">
            {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <textarea
          className="w-full h-64 p-8 bg-neutral-50/30 border-none focus:ring-0 outline-none resize-none font-mono text-sm leading-relaxed"
          value={output}
          readOnly
        />
      </div>
    </div>
  );
};
