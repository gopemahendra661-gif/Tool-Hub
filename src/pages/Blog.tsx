import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEO } from '../components/SEO';

export const Blog: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="My Tool Hub Blog - Insights, Tutorials & News About Online Tools"
        description="Discover helpful articles, tutorials, and productivity hacks using free online tools on the My Tool Hub blog. Learn how to optimize your digital workflow."
        keywords={["online tools blog", "productivity tips", "developer tutorials", "image optimization guide", "text tools tips"]}
      />
      <div className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-black text-neutral-900 mb-6 tracking-tight">My Tool Hub Blog</h1>
            <p className="text-xl text-neutral-600">
              Insights, tutorials, and news about the world of online tools and digital productivity.
            </p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              aria-label="Search articles"
              className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[...BLOG_POSTS].reverse().map(post => (
            <article key={post.id} className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <Link to={`/blog/${post.slug}`}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-10 space-y-6">
                <div className="flex items-center gap-6 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    {post.author}
                  </div>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-2xl font-black text-neutral-900 group-hover:text-indigo-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-neutral-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.slug}`} className="flex items-center gap-2 text-indigo-600 font-black uppercase text-sm tracking-widest group/btn">
                  Read Article
                  <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 text-center">
          <button className="px-12 py-5 bg-neutral-900 text-white font-black text-lg rounded-2xl hover:bg-black transition-all shadow-xl">
            Load More Articles
          </button>
        </div>
      </div>
    </Layout>
  );
};
