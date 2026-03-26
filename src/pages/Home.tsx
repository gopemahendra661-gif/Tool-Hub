import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Schema } from '../components/Schema';
import { ToolCard } from '../components/ToolCard';
import { DynamicIcon } from '../components/DynamicIcon';
import { AIChatFloating } from '../components/AIChatFloating';
import { TOOLS, CATEGORIES } from '../data/tools';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Zap, Shield, Globe, HelpCircle, Bot, Send, Loader2, Copy, Check, Sparkles, MessageSquare, Video, Image as ImageIcon, PenTool } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const popularToolsList = TOOLS.filter(t => t.popular);
  const featuredTools = [
    ...popularToolsList,
    ...TOOLS.filter(t => !t.popular)
  ].slice(0, 6);
  const popularTools = popularToolsList.slice(0, 4);
  const trendingTools = TOOLS.filter(t => t.trending);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof TOOLS>([]);
  
  // AI Assistant State
  const [greeting, setGreeting] = useState('');
  const fullGreeting = "👋 Hi! What do you want to create today?";
  const [showOptions, setShowOptions] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setGreeting(fullGreeting.slice(0, i));
      i++;
      if (i > fullGreeting.length) {
        clearInterval(timer);
        setTimeout(() => setShowOptions(true), 500);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = TOOLS.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results.slice(0, 8));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleInstantGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isGenerating) return;

    setIsGenerating(true);
    setAiResponse('');
    
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiInput,
          tool: 'Homepage Assistant',
          systemPrompt: 'You are a helpful AI assistant on the MyToolHub homepage. Generate a high-quality, professional, and friendly response to the user\'s input. IMPORTANT: Always respond in the same language as the user\'s input. If the user writes in Hindi or Hinglish, your response must be in Hindi or Hinglish respectively. If they want a reply, provide a few options. If they want a caption, provide 3 variations with emojis. Keep it concise and useful.'
        }),
      });

      const data = await res.json();
      if (data.content) {
        setAiResponse(data.content);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aiOptions = [
    { label: 'Reply to a message', icon: MessageSquare, slug: 'ai-comment-reply-generator', color: 'bg-blue-100 text-blue-600' },
    { label: 'Generate captions', icon: PenTool, slug: 'ai-instagram-caption-generator', color: 'bg-pink-100 text-pink-600' },
    { label: 'Create YouTube script', icon: Video, slug: 'ai-youtube-script-generator', color: 'bg-red-100 text-red-600' },
    { label: 'Convert image to prompt', icon: ImageIcon, slug: 'image-to-prompt-generator', color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <Layout>
      <SEO 
        title="Free AI Tools – 50+ Online Tools No Login | My Tool Hub" 
        description="Use 50+ free AI tools online without signup. Generate captions, replies, scripts and more instantly. Fast, secure, and user-friendly."
        keywords={['online tools', 'free tools', 'web tools', 'developer tools', 'free AI tools', 'no login tools']}
      />

      <Schema 
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "My Tool Hub",
          "url": "https://mytoolhub.info/",
          "description": "Free online tools for text, images, developers, and more.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://mytoolhub.info/tools?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />

      <Schema 
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is My Tool Hub?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "My Tool Hub is a comprehensive online platform offering over 50+ free tools for developers, content creators, and everyday users. Our mission is to provide fast, secure, and easy-to-use utilities without any cost or registration."
              }
            },
            {
              "@type": "Question",
              "name": "Are all tools on My Tool Hub free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, every single tool on My Tool Hub is 100% free to use. We do not require any subscription, sign-up, or hidden fees."
              }
            },
            {
              "@type": "Question",
              "name": "Is my data safe on My Tool Hub?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Most of our tools process data directly in your browser (client-side), meaning your sensitive information never even reaches our servers."
              }
            }
          ]
        }}
      />

      {/* AI Assistant Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* AI Greeting */}
            <div className="mb-12 min-h-[100px] flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-200"
              >
                <Bot size={32} />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-4 leading-tight">
                Free AI Tools & Online Generators for Creators
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                {greeting}<span className="animate-pulse text-indigo-600">|</span>
              </p>
            </div>

            {/* Quick Action Options */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                  {aiOptions.map((option, idx) => (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/tools/${option.slug}`)}
                      className="flex flex-col items-center gap-3 p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group"
                    >
                      <div className={`w-12 h-12 ${option.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <option.icon size={24} />
                      </div>
                      <span className="text-sm font-bold text-neutral-900 leading-tight">{option.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instant AI Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-2 border border-neutral-100">
                <form onSubmit={handleInstantGenerate} className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex-1 w-full flex items-center px-4">
                    <Sparkles className="text-indigo-600 mr-3 shrink-0" size={24} />
                    <input
                      type="text"
                      placeholder="Paste message or ask anything..."
                      className="w-full py-4 bg-transparent border-none focus:ring-0 text-lg text-neutral-900 placeholder:text-neutral-400"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!aiInput.trim() || isGenerating}
                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-[2rem] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} />}
                    {isGenerating ? 'Generating...' : 'Generate Reply'}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Instant Result Display */}
            <AnimatePresence>
              {aiResponse && (
                <motion.div
                  ref={resultRef}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="mt-8 max-w-2xl mx-auto"
                >
                  <div className="bg-white rounded-[2.5rem] shadow-xl border border-indigo-100 overflow-hidden text-left relative group">
                    <div className="bg-indigo-50 px-8 py-4 border-b border-indigo-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-indigo-700 font-bold">
                        <Bot size={20} />
                        <span>AI Suggestion</span>
                      </div>
                      <button
                        onClick={copyResult}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy Result'}
                      </button>
                    </div>
                    <div className="p-8 prose prose-indigo max-w-none text-neutral-800 whitespace-pre-wrap leading-relaxed">
                      {aiResponse}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm font-medium text-neutral-500 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Zap size={16} className="text-amber-500" /> 100% Free</span>
              <span className="flex items-center gap-2"><Shield size={16} className="text-emerald-500" /> No Signup</span>
              <span className="flex items-center gap-2"><Globe size={16} className="text-blue-500" /> Fast Results</span>
            </div>

            {/* Dedicated Tool Search Bar */}
            <div className="mt-16 max-w-2xl mx-auto">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                className="relative group"
              >
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-neutral-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-16 pr-32 py-5 bg-white border-2 border-neutral-100 rounded-[2rem] text-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50/50 transition-all shadow-lg shadow-neutral-100"
                  placeholder="Search 50+ tools (e.g. Word Counter, Base64...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-[1.5rem] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  Search
                </button>
              </form>
              
              {/* Search Results Dropdown */}
                <AnimatePresence>
                  {searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-50 left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden"
                    >
                      <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Found {searchResults.length} Tools</span>
                        <button onClick={() => setSearchQuery('')} className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Clear</button>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto p-2">
                        {searchResults.map((tool) => (
                          <Link
                            key={tool.id}
                            to={`/tools/${tool.slug}`}
                            className="flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl transition-colors group"
                          >
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              <DynamicIcon name={tool.icon} size={24} />
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">{tool.name}</h4>
                              <p className="text-xs text-neutral-500 line-clamp-1">{tool.description}</p>
                            </div>
                            <ArrowRight size={16} className="ml-auto text-neutral-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
      </section>

      {/* Floating AI Chat */}
      <AIChatFloating />

      {/* Most Used Tool Today Highlight */}
      <section className="py-12 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/20">
                <Sparkles size={40} className="text-amber-400" />
              </div>
              <div>
                <span className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-2 block">Most Used Tool Today</span>
                <h2 className="text-3xl font-black">AI Instagram Caption Generator</h2>
              </div>
            </div>
            <Link 
              to="/tools/ai-instagram-caption-generator" 
              className="px-10 py-5 bg-white text-indigo-600 font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-indigo-900/20 flex items-center gap-3"
            >
              Try It Now <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Tools Section (Moved to Top) */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6 tracking-tight">
              🔥 Most Used <span className="text-indigo-600">AI Tools</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Supercharge your productivity with our most popular AI-powered utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Featured External AI Tool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative h-full bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-xl flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-amber-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Zap size={32} />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-2xl font-bold text-neutral-900">CaptionMoji AI</h3>
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Featured</span>
                </div>
                <p className="text-neutral-600 mb-8 line-clamp-2 text-lg leading-relaxed">The ultimate AI tool to generate viral Instagram captions with smart emojis in Hindi & English.</p>
                <a
                  href="https://www.captionmojiai.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  🔥 Try Now (Free) <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {TOOLS.filter(t => ['ai-comment-reply-generator', 'image-to-prompt-generator', 'ai-content-writer'].includes(t.id)).map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + 1) * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative h-full bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-xl flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <DynamicIcon name={tool.icon} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{tool.name}</h3>
                  <p className="text-neutral-600 mb-8 line-clamp-2 text-lg leading-relaxed">{tool.description}</p>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="mt-auto w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    🔥 Try Now (Free) <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Tools Section */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">⚡ Trending Tools Right Now</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">Check out our most popular and newly added high-demand tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.filter(t => [
              'ai-hashtag-generator',
              'youtube-thumbnail-downloader',
              'image-to-text',
              'ai-youtube-script-generator',
              'ai-instagram-caption-generator',
              'ai-linkedin-post-generator'
            ].includes(t.id)).slice(0, 6).map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative h-full bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-xl shadow-neutral-200/50 flex flex-col items-center text-center group-hover:border-indigo-200 transition-all duration-500">
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">Trending</span>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                    <DynamicIcon name={tool.icon} size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">{tool.name}</h3>
                  <p className="text-neutral-600 mb-8 line-clamp-2 text-lg">{tool.description}</p>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="mt-auto w-full py-4 bg-neutral-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all duration-500 flex items-center justify-center gap-2 group/btn shadow-lg shadow-neutral-900/10 hover:shadow-indigo-600/20"
                  >
                    Open Tool <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Loop Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">🔥 Users Also Tried</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TOOLS.filter(t => ['ai-hashtag-generator', 'ai-bio-generator', 'ai-hook-generator'].includes(t.id)).map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.slug}`}
                className="flex items-center gap-4 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:bg-white hover:border-indigo-200 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <DynamicIcon name={tool.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-neutral-500">Try Now &rarr;</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Browse by Category</h2>
              <p className="text-neutral-500">Find the right tool for your specific task.</p>
            </div>
            <Link to="/tools" className="hidden sm:flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
              View All Tools <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((category, idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={`/tools?category=${category}`}
                  className="flex flex-col items-center justify-center p-8 bg-neutral-50 rounded-3xl border border-neutral-100 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all group"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-neutral-600 mb-4 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {category === 'AI' && <Zap size={32} className="text-amber-500 group-hover:text-white" />}
                    {category === 'Text' && <Zap size={32} />}
                    {category === 'Image' && <Globe size={32} />}
                    {category === 'Developer' && <Shield size={32} />}
                    {category === 'Calculator' && <Zap size={32} />}
                    {category === 'Utility' && <Globe size={32} />}
                  </div>
                  <span className="font-bold text-neutral-900">{category}</span>
                  <span className="text-xs text-neutral-500 mt-1">
                    {TOOLS.filter(t => t.category === category).length} Tools
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Featured Tools</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">Our most popular and useful tools, handpicked for you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-neutral-200 text-neutral-900 font-semibold rounded-2xl hover:bg-neutral-50 transition-all shadow-sm"
            >
              Explore All 50+ Tools <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-neutral-900 mb-6 tracking-tight">Why My Tool Hub (mytoolhub.info) is the Best Choice?</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              While there are many platforms like <strong>My Tools Hub</strong>, we prioritize your privacy and speed. Our tools are 100% client-side, meaning your data never leaves your computer. We offer a cleaner, faster, and more reliable experience for all your daily digital tasks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Blazing Fast</h3>
              <p className="text-neutral-600 leading-relaxed">All tools run directly in your browser, ensuring instant results without server lag.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Privacy First</h3>
              <p className="text-neutral-600 leading-relaxed">Your data never leaves your device. We don't store or see any of your input data.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Always Free</h3>
              <p className="text-neutral-600 leading-relaxed">No subscriptions, no hidden fees. All our tools are free to use, forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-indigo max-w-none">
            <h2 className="text-4xl font-extrabold text-neutral-900 mb-8 text-center">The Ultimate Hub for Free AI Tools & Online Generators</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              Welcome to <strong>My Tool Hub</strong> (mytoolhub.info), your premier destination for a vast array of high-quality, <strong>free AI tools</strong> and essential <strong>online tools</strong>. In today's fast-paced digital world, having the right utilities at your fingertips can make all the difference. Whether you're a content creator, developer, student, or business professional, our platform is meticulously designed to simplify your digital workflow and boost your productivity.
            </p>
            
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Why Choose Our Free AI Generator Tools?</h3>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              We believe that powerful technology should be accessible to everyone without barriers. That's why we offer a comprehensive collection of <strong>AI generator tools</strong> that leverage cutting-edge artificial intelligence to help you create viral content, optimize your SEO strategy, and handle complex technical tasks in seconds. Our tools are not just free; they are built to deliver premium results that rival expensive paid alternatives.
            </p>

            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Privacy-Focused & No Login Required</h3>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              One of the core pillars of My Tool Hub is user privacy. We are proud to be one of the few <strong>no login tools</strong> platforms on the web. You can access over 50+ premium utilities without ever having to create an account, share your email address, or worry about your data being stored on our servers. Most of our tools process data directly in your browser (client-side), ensuring that your sensitive information stays exactly where it belongs—with you.
            </p>

            <h3 className="text-2xl font-bold text-neutral-900 mb-4">A Faster Alternative to My Tools Hub</h3>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              While there are many platforms like <strong>My Tools Hub</strong>, we have focused on creating a cleaner, faster, and more user-centric experience. Our interface is optimized for speed, ensuring that you get your results instantly without annoying pop-ups or complex navigation. From our AI Instagram Caption Generator to our YouTube Thumbnail Downloader and JSON Formatter, every tool is optimized for peak performance.
            </p>

            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Growing Library of Online Tools</h3>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              Our mission is to continuously expand our library to meet the evolving needs of the web community. We currently offer specialized tools across several categories:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 list-none p-0">
              <li className="bg-neutral-50 p-4 rounded-xl border border-neutral-100"><strong>✨ AI Content Tools:</strong> Generate captions, replies, scripts, and blog posts instantly.</li>
              <li className="bg-neutral-50 p-4 rounded-xl border border-neutral-100"><strong>🖼️ Image Utilities:</strong> Resize, compress, crop, and convert images without losing quality.</li>
              <li className="bg-neutral-50 p-4 rounded-xl border border-neutral-100"><strong>💻 Developer Utilities:</strong> Format JSON, minify CSS/JS, and test regex patterns easily.</li>
              <li className="bg-neutral-50 p-4 rounded-xl border border-neutral-100"><strong>📝 Text Processors:</strong> Count words, remove duplicate lines, and clean up messy text.</li>
            </ul>

            <p className="text-lg text-neutral-600 leading-relaxed">
              At My Tool Hub (mytoolhub.info), we are dedicated to empowering creators and developers with the best free tools available. Explore our library today and experience the future of digital productivity. No signup, no fees, just pure utility.
            </p>
          </div>
        </div>
      </section>

      {/* Brand FAQ Section */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Frequently Asked Questions about My Tool Hub</h2>
            <p className="text-xl text-neutral-600">Everything you need to know about our platform.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">What is My Tool Hub?</h3>
              <p className="text-neutral-600 text-lg">My Tool Hub is a comprehensive online platform offering over 50+ free tools for developers, content creators, and everyday users. Our mission is to provide fast, secure, and easy-to-use utilities without any cost or registration.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Are all tools on My Tool Hub free?</h3>
              <p className="text-neutral-600 text-lg">Yes, every single tool on My Tool Hub is 100% free to use. We do not require any subscription, sign-up, or hidden fees.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Is my data safe on My Tool Hub?</h3>
              <p className="text-neutral-600 text-lg">Absolutely. Most of our tools process data directly in your browser (client-side), meaning your sensitive information never even reaches our servers. For AI tools, we use secure APIs and do not store your personal inputs.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">क्या My Tool Hub पूरी तरह से फ्री है?</h3>
              <p className="text-neutral-600 text-lg">हाँ, My Tool Hub पर सभी 50+ टूल्स पूरी तरह से फ्री हैं। आपको किसी भी टूल को इस्तेमाल करने के लिए पैसे देने या अकाउंट बनाने की ज़रूरत नहीं है।</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">How can I find a specific tool?</h3>
              <p className="text-neutral-600 text-lg">You can use the search bar at the top of the home page or browse through our categories like AI, Text, Image, Developer, and Calculator to find exactly what you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exit Hook Section */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">🔥 Before You Go, Try These Tools</h2>
            <p className="text-xl text-neutral-600">Don't miss out on our most viral AI generators.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS.filter(t => ['ai-instagram-caption-generator', 'ai-comment-reply-generator', 'ai-hashtag-generator'].includes(t.id)).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools List */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">Ready to boost your <br />productivity?</h2>
              <p className="text-neutral-500 text-lg mb-12 leading-relaxed">
                Join thousands of users who use My Tool Hub daily to simplify their workflow. From text processing to developer utilities, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/tools" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                  Get Started Now
                </Link>
                <Link to="/about" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {popularTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.slug}`}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={tool.icon} size={24} />
                  </div>
                  <h3 className="font-bold mb-2">{tool.name}</h3>
                  <p className="text-sm text-neutral-400 line-clamp-2">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
