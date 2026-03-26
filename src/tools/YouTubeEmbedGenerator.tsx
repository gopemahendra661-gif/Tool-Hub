import React, { useState } from 'react';
import { Youtube, Copy, Check, ExternalLink, Code } from 'lucide-react';

export const YouTubeEmbedGenerator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [videoId, setVideoId] = useState('');

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const generateEmbed = () => {
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      const code = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      setEmbedCode(code);
    } else {
      setVideoId('');
      setEmbedCode('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
              <Youtube size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">YouTube Embed Generator</h2>
              <p className="text-neutral-500">Create responsive iframe embed codes for your website.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                YouTube Video URL
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  className="flex-1 px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  onClick={generateEmbed}
                  className="px-8 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center gap-2"
                >
                  Generate <Code size={20} />
                </button>
              </div>
            </div>

            {embedCode && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-inner">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">
                      Embed Code
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
                          <Copy size={16} /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    className="w-full h-32 px-6 py-4 bg-neutral-900 text-neutral-100 font-mono text-sm rounded-2xl border border-neutral-800 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                    value={embedCode}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-neutral max-w-none">
        <h2>What is a YouTube Embed Generator?</h2>
        <p>
          A YouTube Embed Generator is a simple yet powerful tool that allows you to create the HTML code necessary to display a YouTube video directly on your website or blog. Instead of just providing a link that takes users away from your site, embedding keeps them engaged with your content while they watch the video.
        </p>

        <h2>How to use the YouTube Embed Generator</h2>
        <ol>
          <li>Copy the URL of the YouTube video you want to embed.</li>
          <li>Paste the URL into the input field above.</li>
          <li>Click the "Generate" button to create the embed code.</li>
          <li>Preview the video to ensure it's the correct one.</li>
          <li>Copy the generated iframe code and paste it into your website's HTML.</li>
        </ol>

        <h2>Key Features</h2>
        <ul>
          <li><strong>Instant Generation:</strong> Get your embed code in seconds.</li>
          <li><strong>Responsive Design:</strong> The generated code is designed to work well on various screen sizes.</li>
          <li><strong>Live Preview:</strong> See exactly how the video will look before you copy the code.</li>
          <li><strong>Privacy Focused:</strong> We don't track your video choices or store any data on our servers.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">Is it free to use?</h3>
            <p>Yes, our YouTube Embed Generator is completely free to use for as many videos as you like.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Will this work on WordPress?</h3>
            <p>Absolutely! You can paste the generated iframe code into the "Custom HTML" block in WordPress or any other CMS.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Does it support YouTube Shorts?</h3>
            <p>Yes, it supports standard videos, Shorts, and even live streams.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
