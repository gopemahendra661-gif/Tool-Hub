import React, { useState } from 'react';
import { FileText, Copy, Check, Hash, List, Type } from 'lucide-react';

export const YouTubeDescriptionFormatter: React.FC = () => {
  const [text, setText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [copied, setCopied] = useState(false);

  const formatDescription = () => {
    let formatted = text.trim();
    
    // Simple formatting logic: ensure double newlines between paragraphs
    formatted = formatted.replace(/\n\s*\n/g, '\n\n');
    
    // Add some default sections if they don't exist
    if (!formatted.toLowerCase().includes('subscribe')) {
      formatted += '\n\n🔔 Subscribe for more content!';
    }
    
    setFormattedText(formatted);

    // Extract potential hashtags from text or generate some based on keywords
    const words = text.split(/\s+/);
    const potentialHashtags = words
      .filter(word => word.length > 4)
      .slice(0, 3)
      .map(word => `#${word.toLowerCase().replace(/[^a-z0-9]/g, '')}`)
      .join(' ');
    
    setHashtags(potentialHashtags);
  };

  const handleCopy = () => {
    const finalDescription = `${formattedText}\n\n${hashtags}`;
    navigator.clipboard.writeText(finalDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
              <FileText size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">YouTube Description Formatter</h2>
              <p className="text-neutral-500">Optimize your video descriptions for better SEO and engagement.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                Raw Description Text
              </label>
              <textarea
                className="w-full h-64 px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none resize-none"
                placeholder="Enter your video description here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <button
              onClick={formatDescription}
              className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
            >
              Format Description <Type size={20} />
            </button>

            {formattedText && (
              <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">
                      Formatted Output
                    </label>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={16} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copy All
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-6 bg-neutral-900 text-neutral-100 rounded-2xl border border-neutral-800 font-sans whitespace-pre-wrap text-sm leading-relaxed">
                    {formattedText}
                    {hashtags && `\n\n${hashtags}`}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                      <Hash size={18} /> Suggested Hashtags
                    </div>
                    <div className="text-indigo-900 font-mono text-sm">{hashtags || 'No hashtags generated'}</div>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
                      <List size={18} /> SEO Check
                    </div>
                    <div className="text-emerald-900 text-sm">
                      {text.length > 200 ? '✅ Good length' : '⚠️ Too short for SEO'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-neutral max-w-none">
        <h2>What is a YouTube Description Formatter?</h2>
        <p>
          A YouTube Description Formatter is a tool designed to help content creators organize and optimize their video descriptions. A well-structured description is crucial for both viewer experience and YouTube's search algorithm (SEO).
        </p>

        <h2>How to use the YouTube Description Formatter</h2>
        <ol>
          <li>Write your basic video description in the input box.</li>
          <li>Include details about the video, links to your social media, and any credits.</li>
          <li>Click "Format Description" to clean up the spacing and generate hashtags.</li>
          <li>Review the formatted output and suggested hashtags.</li>
          <li>Copy the final result and paste it into your YouTube Studio description box.</li>
        </ol>

        <h2>Why is Description Formatting Important?</h2>
        <ul>
          <li><strong>SEO Ranking:</strong> YouTube uses the first few lines of your description to understand what your video is about.</li>
          <li><strong>Click-Through Rate:</strong> Clear descriptions with calls to action (like "Subscribe") encourage viewer interaction.</li>
          <li><strong>Navigation:</strong> Using timestamps (which you can generate with our other tool) helps viewers find specific parts of your video.</li>
          <li><strong>Professionalism:</strong> A clean, organized description looks better and builds trust with your audience.</li>
        </ul>

        <h2>Best Practices for YouTube Descriptions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">The First 200 Characters</h3>
            <p>Make sure the most important keywords and information are in the first two lines, as this is what appears in search results.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Use Hashtags Wisely</h3>
            <p>Include 3-5 relevant hashtags at the bottom of your description. YouTube will display the first three above your video title.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Add Links</h3>
            <p>Always include links to your website, other relevant videos, and your social media profiles to keep viewers in your ecosystem.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
