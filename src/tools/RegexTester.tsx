import React from 'react';
import { Search, Trash2, Copy, Check, AlertCircle } from 'lucide-react';

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = React.useState('');
  const [flags, setFlags] = React.useState('g');
  const [text, setText] = React.useState('');
  const [matches, setMatches] = React.useState<RegExpMatchArray[]>([]);
  const [error, setError] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const testRegex = () => {
    if (!pattern) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpMatchArray[] = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(text)) !== null) {
          allMatches.push(match);
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        match = text.match(regex);
        if (match) allMatches.push(match);
      }

      setMatches(allMatches);
      setError('');
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  };

  React.useEffect(testRegex, [pattern, flags, text]);

  const loadExample = () => {
    setPattern('(\\d{3})-(\\d{3})-(\\d{4})');
    setFlags('g');
    setText('Call me at 123-456-7890 or 987-654-3210.');
  };

  const highlightMatches = () => {
    if (!text || matches.length === 0) return text;

    let lastIndex = 0;
    const parts: React.ReactNode[] = [];

    matches.forEach((match, i) => {
      const index = match.index!;
      const content = match[0];

      // Add text before match
      if (index > lastIndex) {
        parts.push(text.substring(lastIndex, index));
      }

      // Add highlighted match
      parts.push(
        <mark key={i} className="bg-indigo-200 text-indigo-900 rounded px-0.5">
          {content}
        </mark>
      );

      lastIndex = index + content.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="font-bold text-neutral-900">Regex Configuration</span>
            <button 
              onClick={loadExample}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Load Example
            </button>
          </div>
          <button onClick={() => { setPattern(''); setText(''); }} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-mono">/</span>
              <input
                type="text"
                className="w-full pl-8 pr-4 py-3 bg-neutral-100 border-none rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter regex pattern..."
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-mono">/</span>
            </div>
            <input
              type="text"
              className="w-24 px-4 py-3 bg-neutral-100 border-none rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="flags"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Test String</span>
          </div>
          <textarea
            className="w-full h-64 p-6 bg-transparent border-none focus:ring-0 outline-none resize-none font-mono text-sm leading-relaxed"
            placeholder="Enter text to test against..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Matches ({matches.length})</span>
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-auto max-h-64 whitespace-pre-wrap break-all bg-neutral-50/30">
            {highlightMatches() || <span className="text-neutral-300">Matches will be highlighted here...</span>}
          </div>
        </div>
      </div>

      {matches.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Detailed Match Information</span>
          </div>
          <div className="p-6 space-y-4 max-h-64 overflow-auto">
            {matches.map((match, i) => (
              <div key={i} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-indigo-600">Match {i + 1}</span>
                  <span className="text-xs text-neutral-400">Index: {match.index}</span>
                </div>
                <div className="font-mono text-sm text-neutral-900 mb-2">{match[0]}</div>
                {match.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Array.from(match).slice(1).map((group, gi) => (
                      <div key={gi} className="text-xs bg-white p-2 rounded-lg border border-neutral-100">
                        <span className="text-neutral-400 mr-2">Group {gi + 1}:</span>
                        <span className="text-neutral-900">{group || 'null'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
