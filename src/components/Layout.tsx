import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Wrench as ToolIcon, Github, Twitter, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg group-hover:scale-110 transition-transform">
                <ToolIcon size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">My Tool Hub</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="/" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-indigo-600", isActive ? "text-indigo-600" : "text-neutral-600")}>Home</NavLink>
              <NavLink to="/tools?category=AI" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-indigo-600 flex items-center gap-1", isActive ? "text-indigo-600" : "text-neutral-600")}>
                <span className="text-amber-500">🔥</span> AI Tools
              </NavLink>
              <NavLink to="/tools" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-indigo-600", isActive ? "text-indigo-600" : "text-neutral-600")}>All Tools</NavLink>
              <NavLink to="/blog" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-indigo-600", isActive ? "text-indigo-600" : "text-neutral-600")}>Blog</NavLink>
              <NavLink to="/about" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-indigo-600", isActive ? "text-indigo-600" : "text-neutral-600")}>About</NavLink>
              <a href="https://www.captionmojiai.online" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1">
                CaptionMoji AI <span className="text-xs bg-indigo-100 px-1.5 py-0.5 rounded text-indigo-600 uppercase tracking-wider">New</span>
              </a>
            </nav>

            {/* Search & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
                <Search className="absolute left-3 text-neutral-400" size={18} />
                <input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-10 pr-4 py-2 bg-neutral-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 w-48 lg:w-64 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <button
                className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-neutral-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-neutral-50">Home</NavLink>
                <NavLink to="/tools?category=AI" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-neutral-50">🔥 AI Tools</NavLink>
                <NavLink to="/tools" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-neutral-50">All Tools</NavLink>
                <NavLink to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-neutral-50">Blog</NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-indigo-600 hover:bg-neutral-50">About</NavLink>
                <a href="https://www.captionmojiai.online" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-bold text-indigo-600 hover:bg-indigo-50">CaptionMoji AI 🔥</a>
                <div className="pt-4 px-3">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search tools..."
                      className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Internal Linking Block (Users Also Tried) */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">🔥 Users also tried:</h2>
              <p className="text-neutral-500">Explore our most popular AI-powered generators.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/tools/ai-instagram-caption-generator" className="px-6 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                AI Caption Generator
              </Link>
              <Link to="/tools/ai-hashtag-generator" className="px-6 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                AI Hashtag Generator
              </Link>
              <Link to="/tools/ai-comment-reply-generator" className="px-6 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                AI Comment Reply Generator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <ToolIcon size={18} />
                </div>
                <span className="text-lg font-bold tracking-tight">My Tool Hub</span>
              </Link>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                The ultimate collection of free online tools. Designed for developers, writers, and everyone in between. Fast, secure, and easy to use.
              </p>
              <div className="flex gap-4">
                <a href="https://x.com/MyTooHub" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-indigo-600 transition-colors" aria-label="Follow us on X (Twitter)"><Twitter size={20} /></a>
                <a href="#" className="text-neutral-500 hover:text-indigo-600 transition-colors" aria-label="View our GitHub"><Github size={20} /></a>
                <a href="mailto:chillforai@gmail.com" className="text-neutral-500 hover:text-indigo-600 transition-colors" aria-label="Email us"><Mail size={20} /></a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-6">Categories</h3>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><Link to="/tools?category=AI" className="hover:text-indigo-600 transition-colors font-medium text-indigo-600">🔥 AI Tools</Link></li>
                <li><Link to="/tools?category=Text" className="hover:text-indigo-600 transition-colors">Text Tools</Link></li>
                <li><Link to="/tools?category=Image" className="hover:text-indigo-600 transition-colors">Image Tools</Link></li>
                <li><Link to="/tools?category=Developer" className="hover:text-indigo-600 transition-colors">Developer Tools</Link></li>
                <li><Link to="/tools?category=Calculator" className="hover:text-indigo-600 transition-colors">Calculator Tools</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-neutral-900 mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><a href="https://www.captionmojiai.online" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors font-bold text-indigo-600 flex items-center gap-2">CaptionMoji AI <span className="text-[10px] bg-indigo-100 px-1 rounded">PRO</span></a></li>
                <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
                <li><Link to="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
              </ul>
            </div>
 
            <div>
              <h3 className="font-semibold text-neutral-900 mb-6">Legal</h3>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <div className="max-w-2xl">
              <p className="mb-2">© 2026 My Tool Hub (mytoolhub.info). All rights reserved.</p>
              <p className="text-xs leading-relaxed">
                My Tool Hub is your one-stop destination for free online tools. We provide a wide range of utilities including AI content generators, image editors, text processors, and developer tools. Our mission is to offer a faster and more secure alternative to platforms like <strong>My Tools Hub</strong>. All our tools are free to use and respect your privacy.
              </p>
            </div>
            <p className="whitespace-nowrap">Built with ❤️ for the web community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
