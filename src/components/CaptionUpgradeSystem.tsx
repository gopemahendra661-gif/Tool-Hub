import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

interface CaptionUpgradeSystemProps {
  onGenerateTrigger: boolean;
}

export const CaptionUpgradeSystem: React.FC<CaptionUpgradeSystemProps> = ({ onGenerateTrigger }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);

  useEffect(() => {
    // Check if shown in this session
    const shown = sessionStorage.getItem('caption_moji_popup_shown');
    if (shown) {
      setHasShownThisSession(true);
    }
  }, []);

  // Trigger popup when generation is successful
  useEffect(() => {
    if (onGenerateTrigger && !hasShownThisSession) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setHasShownThisSession(true);
        sessionStorage.setItem('caption_moji_popup_shown', 'true');
      }, 1000); // Slight delay for better UX
      return () => clearTimeout(timer);
    }
  }, [onGenerateTrigger, hasShownThisSession]);

  const handleUpgradeClick = () => {
    window.open('https://www.captionmojiai.online', '_blank');
    setShowPopup(false);
  };

  return (
    <>
      {/* Inline Upgrade Button (Feature 2) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mt-6 p-6 bg-indigo-50 border border-indigo-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="font-bold text-neutral-900 text-lg">✨ Want to make this caption viral?</p>
            <p className="text-neutral-600">Add smart emojis (Hindi + English) instantly with AI.</p>
          </div>
        </div>
        <button
          onClick={handleUpgradeClick}
          className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
        >
          Generate with AI Emojis 🔥
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Result-Based Suggestion (Feature 3) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left"
      >
        <span className="text-neutral-500 font-medium">🔥 This caption is good… but you can make it viral with emojis!</span>
        <button
          onClick={handleUpgradeClick}
          className="text-indigo-600 font-bold hover:underline flex items-center gap-1 group"
        >
          Upgrade Caption 🚀
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </motion.div>

      {/* Smart Popup (Feature 1) */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white max-w-md w-full rounded-[2.5rem] shadow-2xl border border-neutral-100 overflow-hidden relative z-10"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>

              <div className="p-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200">
                  <TrendingUp size={32} />
                </div>

                <h3 className="text-2xl font-black text-neutral-900 mb-4 leading-tight">
                  🔥 Make your caption 10x better with AI emojis
                </h3>
                
                <p className="text-neutral-600 text-lg leading-relaxed mb-10">
                  Turn your caption into a viral post with smart emojis (Hindi + English) using our advanced AI.
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleUpgradeClick}
                    className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-3 group"
                  >
                    🚀 Upgrade with CaptionMoji AI
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-full py-4 text-neutral-500 font-bold hover:text-neutral-800 transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
