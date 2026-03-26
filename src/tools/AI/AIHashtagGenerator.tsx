import React, { useState } from 'react';
import { Hash, Copy, Check, Loader2, Sparkles, Send, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AIHashtagGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateHashtags = async () => {
    if (!input.trim() || isGenerating) return;

    setIsGenerating(true);
    setError('');
    setHashtags([]);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          tool: 'AI Hashtag Generator',
          systemPrompt: 'You are an expert social media strategist. Generate 30 highly relevant, trending, and effective hashtags for the given topic or content description. IMPORTANT: Always respond in the same language as the user\'s input. If the user writes in Hindi or Hinglish, your response must be in Hindi or Hinglish respectively. Provide only the hashtags separated by spaces, starting with #. Categorize them into: Popular (10), Niche (10), and Engagement-focused (10). Return them as a single list of hashtags.'
        }),
      });

      const data = await res.json();
      if (data.content) {
        const foundHashtags = data.content.match(/#[\w\u0590-\u05ff]+/g) || [];
        setHashtags(foundHashtags);
      } else {
        throw new Error('Failed to generate hashtags');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setHashtags([]);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Hash size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">AI Hashtag Generator</h2>
              <p className="text-neutral-500">Generate trending hashtags for Instagram, TikTok, and more.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                What is your content about?
              </label>
              <div className="relative">
                <textarea
                  className="w-full h-32 px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none text-lg"
                  placeholder="e.g. A beautiful sunset at the beach in Bali..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={clearAll}
                    className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                    title="Clear"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={generateHashtags}
              disabled={!input.trim() || isGenerating}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {isGenerating ? 'Analyzing Content...' : 'Generate Viral Hashtags'}
            </button>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            <AnimatePresence>
              {hashtags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-6 border-t border-neutral-100"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                      <Hash size={20} className="text-indigo-600" />
                      Generated Hashtags ({hashtags.length})
                    </h3>
                    <button
                      onClick={copyAll}
                      className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={16} className="text-emerald-500" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copy All
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-neutral max-w-none">
        <h2>Boost Your Reach with AI-Powered Hashtags</h2>
        <p>
          In the world of social media, hashtags are the bridges that connect your content to your target audience. Our <strong>AI Hashtag Generator</strong> uses advanced algorithms to analyze your content and suggest the most effective hashtags to maximize your visibility on platforms like Instagram, TikTok, LinkedIn, and Twitter.
        </p>

        <h3>Why Use Our AI Hashtag Generator?</h3>
        <ul>
          <li><strong>Smart Analysis:</strong> Unlike simple keyword tools, our AI understands the context of your content.</li>
          <li><strong>Multi-Platform Ready:</strong> Get hashtags that work across all major social networks.</li>
          <li><strong>Categorized Results:</strong> We provide a mix of popular, niche, and engagement-focused tags for a balanced strategy.</li>
          <li><strong>Free & Instant:</strong> No login required, get your tags in seconds.</li>
        </ul>

        <h3>How to Use</h3>
        <ol>
          <li>Describe your photo, video, or post in the input box.</li>
          <li>Click "Generate Viral Hashtags".</li>
          <li>Review the suggestions and copy the ones that fit your brand.</li>
          <li>Paste them into your social media post and watch your engagement grow!</li>
        </ol>
      </div>
    </div>
  );
};
