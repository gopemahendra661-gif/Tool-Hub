import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { BLOG_POSTS } from '../data/blogPosts';
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from 'lucide-react';
import { SEO } from '../components/SEO';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) return null;

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      });
    }
  };

  return (
    <Layout>
      <SEO 
        title={post.seoTitle}
        description={post.metaDescription}
        keywords={post.keywords}
      />
      
      <article className="pt-32 pb-24 max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-indigo-600 font-bold uppercase text-xs tracking-widest mb-12 hover:gap-4 transition-all"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <div className="space-y-8 mb-16">
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-neutral-400 uppercase tracking-widest">
              <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User size={14} />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                10 min read
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-neutral-900 leading-[1.1] tracking-tight">
              {post.title}
            </h1>
          </div>

          <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-16">
            <div className="prose prose-neutral prose-lg max-w-none 
              prose-headings:font-black prose-headings:tracking-tight prose-headings:text-neutral-900
              prose-p:text-neutral-600 prose-p:leading-relaxed
              prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-900 prose-strong:font-bold
              prose-img:rounded-3xl prose-img:shadow-xl
              prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-600 prose-blockquote:bg-neutral-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
            ">
              <Markdown>{post.content}</Markdown>
            </div>

            <aside className="space-y-12">
              <div className="sticky top-32 space-y-12">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">Share Article</h4>
                  <button 
                    onClick={sharePost}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-neutral-200 rounded-2xl font-bold text-neutral-900 hover:bg-neutral-50 transition-all shadow-sm"
                  >
                    <Share2 size={18} />
                    Share Now
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.keywords.map(keyword => (
                      <span key={keyword} className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 text-neutral-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                        <Tag size={10} />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-indigo-600 rounded-[2rem] text-white space-y-6 shadow-xl shadow-indigo-200">
                  <h4 className="text-xl font-black leading-tight">Need a quick tool?</h4>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Explore our collection of 50+ free online tools.
                  </p>
                  <Link 
                    to="/tools" 
                    className="block w-full py-3 bg-white text-indigo-600 text-center rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all"
                  >
                    View All Tools
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </article>
    </Layout>
  );
};
