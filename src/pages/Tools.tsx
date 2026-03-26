import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Schema } from '../components/Schema';
import { ToolCard } from '../components/ToolCard';
import { TOOLS, CATEGORIES } from '../data/tools';
import { motion } from 'motion/react';
import { Search, Filter, X } from 'lucide-react';

export const Tools: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const searchQuery = searchParams.get('q') || '';

  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = !categoryFilter || tool.category === categoryFilter;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <SEO 
        title="All Online Tools" 
        description="Browse our complete collection of 50+ free online tools. Filter by category or search to find exactly what you need."
      />
      <Schema 
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "All Online Tools - My Tool Hub",
          "url": "https://mytoolhub.info/tools",
          "description": "A collection of free online tools for text, images, developers, and more.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": filteredTools.slice(0, 20).map((tool, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://mytoolhub.info/tools/${tool.slug}`,
              "name": tool.name
            }))
          }
        }}
      />

      <section className="pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">All Tools</h1>
            <p className="text-neutral-600">Explore our comprehensive library of free online utilities.</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4 flex items-center gap-2">
                    <Filter size={16} /> Categories
                  </h3>
                  <div className="flex flex-wrap lg:flex-col gap-2">
                    <button
                      onClick={() => updateParams({ category: null })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!categoryFilter ? 'bg-indigo-600 text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-indigo-200'}`}
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateParams({ category: cat })}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${categoryFilter === cat ? 'bg-indigo-600 text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-indigo-200'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                <input
                  type="text"
                  placeholder="Search tools by name or description..."
                  aria-label="Search tools"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
                  value={searchQuery}
                  onChange={(e) => updateParams({ q: e.target.value || null })}
                />
                {searchQuery && (
                  <button 
                    onClick={() => updateParams({ q: null })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    aria-label="Clear search"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-neutral-200">
                  <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-neutral-500">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">No tools found</h3>
                  <p className="text-neutral-600">Try adjusting your search or category filters.</p>
                  <button
                    onClick={() => updateParams({ q: null, category: null })}
                    className="mt-6 text-indigo-600 font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* SEO Content Section */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-indigo max-w-none">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Explore Our Comprehensive Collection of Free Online Tools</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              Welcome to the full directory of <strong>My Tool Hub</strong>. We have curated over 50+ <strong>free online tools</strong> designed to help you with everything from content creation to technical development. Our platform is built on the principle of accessibility, which is why every single tool listed here is 100% free to use, requires <strong>no login</strong>, and respects your privacy by processing data locally whenever possible.
            </p>
            
            <h3 className="text-xl font-bold text-neutral-900 mb-4">AI-Powered Generators for Modern Creators</h3>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              In our <strong>AI Tools</strong> category, you'll find cutting-edge utilities like the <strong>AI Instagram Caption Generator</strong>, <strong>AI Hashtag Generator</strong>, and <strong>AI YouTube Script Generator</strong>. These tools use advanced language models to help you overcome writer's block and create high-engagement content in seconds. Whether you're looking for viral hashtags or professional LinkedIn posts, our AI generators are here to help.
            </p>

            <h3 className="text-xl font-bold text-neutral-900 mb-4">Essential Developer & Utility Tools</h3>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              For developers and power users, we offer a suite of <strong>developer tools</strong> including a <strong>JSON Formatter</strong>, <strong>Base64 Encoder/Decoder</strong>, and <strong>Regex Tester</strong>. These utilities are optimized for speed and security, making them a perfect alternative to other platforms. We also provide a wide range of <strong>calculator tools</strong> and <strong>text processors</strong> to handle your daily digital tasks with ease.
            </p>

            <p className="text-lg text-neutral-600 leading-relaxed">
              Browse through our categories or use the search bar above to find exactly what you need. At My Tool Hub (mytoolhub.info), we are constantly adding new tools to our library, so be sure to bookmark this page and check back often for the latest updates in digital productivity.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
