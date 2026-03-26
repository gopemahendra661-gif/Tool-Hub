import React, { useState } from 'react';
import { ToolComponentProps } from '../../types';
import { Copy, Check, Loader2, Sparkles, Share2, Youtube, Instagram, Twitter, MessageCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLATFORMS = [
  { id: 'YouTube', icon: Youtube },
  { id: 'Instagram', icon: Instagram },
  { id: 'Twitter', icon: Twitter },
  { id: 'Reddit', icon: MessageCircle },
];

const TONES = ['Friendly', 'Funny', 'Professional', 'Roast', 'Smart'];

export const AICommentReplyGenerator: React.FC<ToolComponentProps> = ({ tool }) => {
  const [comment, setComment] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [tone, setTone] = useState('Friendly');
  const [replies, setReplies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!comment.trim()) return;

    setIsLoading(true);
    setError('');
    setReplies([]);

    const systemPrompt = `Act as an expert social media reply generator. Your task is to generate 3 unique, short, engaging, and human-like replies for the following comment.

IMPORTANT: Always respond in the same language as the user's input. If the user writes in Hindi or Hinglish, your response must be in Hindi or Hinglish respectively.

Platform: ${platform}
Tone: ${tone}
Comment: ${comment}

Requirements:
- Give 3 distinct options (Option 1, Option 2, Option 3)
- Keep it natural and conversational
- Use emojis if suitable for the platform
- Match the selected tone perfectly
- No hashtags or extra fluff.
- Format the output as a numbered list: 1. [Reply 1] 2. [Reply 2] 3. [Reply 3]`;

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate 3 replies for this comment: "${comment}" on ${platform} with a ${tone} tone.`,
          tool: tool.name,
          systemPrompt
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate replies');
      }

      // Parse the 3 replies from the AI output
      // Expecting format like "1. Reply one\n2. Reply two\n3. Reply three"
      const content = data.content;
      const parsedReplies = content
        .split(/\d\.\s+/)
        .filter((r: string) => r.trim().length > 0)
        .map((r: string) => r.trim())
        .slice(0, 3);

      if (parsedReplies.length === 0) {
        // Fallback if parsing fails
        setReplies([content]);
      } else {
        setReplies(parsedReplies);
      }
    } catch (err: any) {
      console.error('AI Generation Error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Comment Reply Generator',
        text: 'Check out this awesome AI tool to generate social media replies!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Select Platform</label>
            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all font-medium ${
                    platform === p.id 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                      : 'border-neutral-100 bg-neutral-50 text-neutral-500 hover:border-neutral-200'
                  }`}
                >
                  <p.icon size={18} />
                  {p.id}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Select Tone</label>
            <div className="grid grid-cols-3 gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`p-2 text-sm rounded-xl border-2 transition-all font-medium ${
                    tone === t 
                      ? 'border-purple-600 bg-purple-50 text-purple-600' 
                      : 'border-neutral-100 bg-neutral-50 text-neutral-500 hover:border-neutral-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-neutral-900 mb-2">Paste your comment here...</label>
          <textarea
            className="w-full h-32 p-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            placeholder="e.g., This video was so helpful! Can you make one about AI tools next?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !comment.trim()}
            className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Generate Reply
              </>
            )}
          </button>
          <button
            onClick={handleShare}
            className="px-6 py-4 bg-neutral-100 text-neutral-700 font-bold rounded-2xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={20} /> Share
          </button>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output Section */}
      <AnimatePresence>
        {replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Sparkles className="text-amber-500" size={20} />
                Suggested Replies
              </h3>
              <button 
                onClick={handleGenerate}
                className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline"
              >
                <RefreshCw size={14} /> Generate Again
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {replies.map((reply, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:border-indigo-200 transition-all group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-neutral-700 leading-relaxed flex-1">{reply}</p>
                    <button
                      onClick={() => handleCopy(reply, index)}
                      className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                        copiedIndex === index 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-neutral-50 text-neutral-400 hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                    >
                      {copiedIndex === index ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
