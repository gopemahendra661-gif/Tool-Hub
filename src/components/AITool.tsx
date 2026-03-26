import React, { useState } from 'react';
import { Copy, Check, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Tool } from '../types';

interface AIToolProps {
  tool: Tool;
  placeholder?: string;
  systemPrompt?: string;
  onSuccess?: (output: string) => void;
  renderAfterOutput?: (output: string) => React.ReactNode;
}

export const AITool: React.FC<AIToolProps> = ({ 
  tool, 
  placeholder, 
  systemPrompt,
  onSuccess,
  renderAfterOutput
}) => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [modelUsed, setModelUsed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setOutput('');
    setModelUsed('');

    const languageInstruction = "\n\nIMPORTANT: Always respond in the same language as the user's input. If the user writes in Hindi or Hinglish, your response must be in Hindi or Hinglish respectively.";

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          tool: tool.name,
          systemPrompt: `${systemPrompt || ''}${languageInstruction}`
        })
      });

      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `Server returned ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        const errorMsg = data?.error || `Failed to generate content (${response.status})`;
        const details = data?.details ? `\n\nDetails: ${data.details}` : '';
        throw new Error(errorMsg + details);
      }

      setOutput(data.content);
      setModelUsed(data.modelUsed);
      if (onSuccess) onSuccess(data.content);
    } catch (err: any) {
      console.error('AI Generation Error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
        <label className="block text-sm font-bold text-neutral-900 mb-4">
          Enter your prompt or topic:
        </label>
        <textarea
          className="w-full h-40 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-lg"
          placeholder={placeholder || "Describe what you want to generate..."}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="mt-6 flex justify-end gap-4">
          {error && (
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="px-6 py-4 bg-neutral-100 text-neutral-700 font-bold rounded-2xl hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              <Sparkles size={20} /> Retry
            </button>
          )}
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} /> {error ? 'Try Again' : 'Generate Content'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Loader2 className="rotate-45" size={20} />
            </div>
            <p className="font-bold">Generation Failed</p>
          </div>
          <p className="text-sm opacity-80 ml-13">{error}</p>
        </div>
      )}

      {output && (
        <>
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">Generated Output</h3>
                {modelUsed && (
                  <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                    <Sparkles size={12} className="text-indigo-400" />
                    Generated by {modelUsed}
                  </p>
                )}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors text-sm font-bold text-neutral-700"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="text-indigo-600" /> Copy Output
                  </>
                )}
              </button>
            </div>
            <div className="prose prose-neutral max-w-none bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          </div>
          {renderAfterOutput && renderAfterOutput(output)}
        </>
      )}
    </div>
  );
};
