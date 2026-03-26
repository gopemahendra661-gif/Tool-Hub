import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Loader2, Copy, Check } from 'lucide-react';

export const AIChatFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: message,
          tool: 'AI Chat Assistant',
          systemPrompt: 'You are a helpful AI assistant for MyToolHub. A user will paste a message or ask a question. IMPORTANT: Always respond in the same language as the user\'s input. If the user writes in Hindi or Hinglish, your response must be in Hindi or Hinglish respectively. If they paste a message, generate a polite and professional reply. If they ask a question, answer it concisely. Always be helpful and friendly.'
        }),
      });

      const data = await res.json();
      if (data.content) {
        setResponse(data.content);
      } else {
        setResponse('Sorry, I couldn\'t generate a reply. Please try again.');
      }
    } catch (error) {
      setResponse('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-xs text-indigo-100">Always active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-6 max-h-[400px] overflow-y-auto bg-neutral-50">
              {!response && !isLoading ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={32} />
                  </div>
                  <p className="text-neutral-600 font-medium">
                    "Paste your message, I’ll generate reply"
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {message && (
                    <div className="flex justify-end">
                      <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
                        <p className="text-sm">{message}</p>
                      </div>
                    </div>
                  )}
                  {isLoading ? (
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-indigo-600" />
                        <p className="text-sm text-neutral-500">Thinking...</p>
                      </div>
                    </div>
                  ) : response && (
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-neutral-100 w-full group relative">
                        <div className="prose prose-sm max-w-none text-neutral-800">
                          {response}
                        </div>
                        <button
                          onClick={copyToClipboard}
                          className="absolute top-2 right-2 p-2 bg-neutral-50 text-neutral-400 hover:text-indigo-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          title="Copy to clipboard"
                        >
                          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleGenerate} className="p-4 bg-white border-t border-neutral-100">
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Paste text here..."
                  className="w-full pl-4 pr-12 py-3 bg-neutral-100 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl text-sm resize-none min-h-[80px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate(e as any);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-neutral-900 text-white rotate-90' : 'bg-indigo-600 text-white'
        }`}
      >
        {isOpen ? <X size={32} /> : <Bot size={32} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};
