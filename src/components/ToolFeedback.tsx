import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Send, CheckCircle2, AlertCircle, MessageSquare, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Comment {
  id: string;
  comment: string;
  timestamp: string;
  replies?: Comment[];
}

interface ToolFeedbackProps {
  toolId: string;
  toolName: string;
}

export const ToolFeedback: React.FC<ToolFeedbackProps> = ({ toolId, toolName }) => {
  const [rating, setRating] = useState<'like' | 'dislike' | null>(null);
  const [comment, setComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyComment, setReplyComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Stats and Comments state
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const fetchFeedbackData = async () => {
    try {
      const response = await fetch(`/api/feedback/${toolId}`);
      const data = await response.json();
      if (data.success) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, [toolId]);

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    const content = parentId ? replyComment : comment;
    if (!rating && !content && !parentId) return;
    if (parentId && !content) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/feedback/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId,
          toolName,
          rating: parentId ? null : rating,
          comment: content,
          timestamp: new Date().toISOString(),
          pageUrl: window.location.href,
          parentId: parentId || null
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        fetchFeedbackData();
        
        setTimeout(() => {
          setStatus('idle');
          if (parentId) {
            setReplyTo(null);
            setReplyComment('');
          } else {
            setRating(null);
            setComment('');
          }
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to save feedback');
      }
    } catch (error: any) {
      console.error('Feedback error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const avatarColors = [
    'bg-indigo-500',
    'bg-emerald-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-sky-500',
    'bg-violet-500',
    'bg-teal-500',
    'bg-fuchsia-500'
  ];

  const getAvatarColor = (id: string) => {
    const charCodeSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatarColors[charCodeSum % avatarColors.length];
  };

  return (
    <div className="space-y-12">
      {/* Main Feedback Form */}
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-1">Rate this tool</h3>
            <p className="text-neutral-500 text-sm">Help us improve by sharing your feedback!</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
              <ThumbsUp size={18} />
              <span className="font-bold">{likes}</span>
            </div>
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-xl border border-rose-100">
              <ThumbsDown size={18} />
              <span className="font-bold">{dislikes}</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' && !replyTo ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-bold text-neutral-900 mb-1">Thank You!</h4>
              <p className="text-neutral-500 text-sm">Your feedback has been saved.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={(e) => handleSubmit(e)}
              className="space-y-6"
            >
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRating('like')}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-bold ${
                    rating === 'like'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                      : 'bg-white border-neutral-100 text-neutral-400 hover:border-emerald-200 hover:text-emerald-500'
                  }`}
                >
                  <ThumbsUp size={20} /> Like
                </button>
                <button
                  type="button"
                  onClick={() => setRating('dislike')}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-bold ${
                    rating === 'dislike'
                      ? 'bg-rose-50 border-rose-500 text-rose-600'
                      : 'bg-white border-neutral-100 text-neutral-400 hover:border-rose-200 hover:text-rose-500'
                  }`}
                >
                  <ThumbsDown size={20} /> Dislike
                </button>
              </div>

              <div className="space-y-2">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Any suggestions or comments? (Optional)"
                  className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl h-24 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm"
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-rose-600 text-xs font-medium bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <AlertCircle size={14} />
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || (!rating && !comment)}
                className="w-full py-4 bg-neutral-900 text-white rounded-xl transition-all flex items-center justify-center gap-2 font-bold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' && !replyTo ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={18} /> Submit Feedback
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Comments List Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
            <MessageSquare size={18} />
          </div>
          <h3 className="font-bold text-xl text-neutral-900">User Comments</h3>
        </div>

        {isLoadingData ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : comments.length > 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto p-2 custom-scrollbar">
              <div className="grid gap-2">
                {comments.map((c, idx) => (
                  <div key={c.id} className="border-b border-neutral-50 last:border-0">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-6 rounded-2xl hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full ${getAvatarColor(c.id)} flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm`}>
                          {c.comment.trim().charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-neutral-900">User</span>
                            <span className="text-[10px] text-neutral-400 font-medium">•</span>
                            <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-medium">
                              <Clock size={10} />
                              {formatDate(c.timestamp)}
                            </div>
                          </div>
                          <p className="text-neutral-700 leading-relaxed mb-3 break-words text-sm">
                            {c.comment}
                          </p>
                          <div className="flex items-center gap-4 text-xs font-medium">
                            <button 
                              onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                              className="text-indigo-600 hover:text-indigo-700 font-bold uppercase tracking-wider text-[10px]"
                            >
                              Reply
                            </button>
                          </div>

                          {/* Reply Form */}
                          <AnimatePresence>
                            {replyTo === c.id && (
                              <motion.form
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                onSubmit={(e) => handleSubmit(e, c.id)}
                                className="mt-4 space-y-3 overflow-hidden"
                              >
                                <textarea
                                  value={replyComment}
                                  onChange={(e) => setReplyComment(e.target.value)}
                                  placeholder="Write a reply..."
                                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl h-20 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm"
                                  autoFocus
                                ></textarea>
                                <div className="flex gap-2">
                                  <button
                                    type="submit"
                                    disabled={status === 'loading' || !replyComment}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-50"
                                  >
                                    {status === 'loading' && replyTo === c.id ? 'Sending...' : 'Send Reply'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setReplyTo(null)}
                                    className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-bold hover:bg-neutral-200"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </motion.form>
                            )}
                          </AnimatePresence>

                          {/* Nested Replies */}
                          {c.replies && c.replies.length > 0 && (
                            <div className="mt-4 ml-2 pl-4 border-l-2 border-neutral-100 space-y-4">
                              {c.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-3">
                                  <div className={`w-7 h-7 rounded-full ${getAvatarColor(reply.id)} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 shadow-sm`}>
                                    {reply.comment.trim().charAt(0).toUpperCase() || 'U'}
                                  </div>
                                  <div className="flex-1 bg-neutral-50/50 p-3 rounded-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-bold text-[10px] text-neutral-900">User</span>
                                      <span className="text-[8px] text-neutral-400">•</span>
                                      <div className="flex items-center gap-1 text-[8px] text-neutral-400 font-medium">
                                        <Clock size={8} />
                                        {formatDate(reply.timestamp)}
                                      </div>
                                    </div>
                                    <p className="text-xs text-neutral-600 leading-relaxed">{reply.comment}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            {comments.length > 5 && (
              <div className="p-4 bg-neutral-50 text-center border-t border-neutral-100">
                <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                  Scroll for more comments
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-neutral-50 p-12 rounded-3xl border-2 border-dashed border-neutral-200 text-center">
            <p className="text-neutral-500">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

