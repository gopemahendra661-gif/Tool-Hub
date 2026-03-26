import React, { useState } from 'react';
import { Youtube, Download, Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const YouTubeThumbnailDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    const id = extractVideoId(inputUrl);
    setVideoId(id);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const thumbnailQualities = [
    { id: 'maxresdefault', label: 'HD Quality (1280x720)', resolution: '1280x720' },
    { id: 'hqdefault', label: 'High Quality (480x360)', resolution: '480x360' },
    { id: 'mqdefault', label: 'Medium Quality (320x180)', resolution: '320x180' },
    { id: 'default', label: 'Standard Quality (120x90)', resolution: '120x90' },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <label className="block text-sm font-bold text-neutral-700 mb-2">
            Enter YouTube Video URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
              <Youtube size={20} />
            </div>
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-2 border-neutral-100 rounded-2xl focus:border-indigo-500 focus:ring-0 transition-all outline-none"
            />
          </div>
          <p className="mt-2 text-xs text-neutral-600">
            Paste any YouTube video link to extract its thumbnails.
          </p>
        </div>

        {videoId ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {thumbnailQualities.map((quality) => (
                <div key={quality.id} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 group">
                  <div className="aspect-video mb-4 overflow-hidden rounded-xl bg-neutral-200 relative">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/${quality.id}.jpg`}
                      alt={quality.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1280x720?text=Thumbnail+Not+Available';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a
                        href={`https://img.youtube.com/vi/${videoId}/${quality.id}.jpg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full text-neutral-900 hover:scale-110 transition-transform"
                        aria-label="Open original image in new tab"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm">{quality.label}</h4>
                      <span className="text-xs text-neutral-500">{quality.resolution}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`https://img.youtube.com/vi/${videoId}/${quality.id}.jpg`}
                      download={`youtube-thumbnail-${quality.id}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={16} /> Download
                    </a>
                    <button
                      onClick={() => handleCopy(`https://img.youtube.com/vi/${videoId}/${quality.id}.jpg`)}
                      className="p-2 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-xl transition-colors text-neutral-600"
                      aria-label="Copy Image URL"
                      title="Copy Image URL"
                    >
                      {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : url && (
          <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100 text-red-600">
            <p className="font-medium">Invalid YouTube URL. Please check the link and try again.</p>
          </div>
        )}

        {!url && (
          <div className="p-12 text-center bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
            <Youtube size={48} className="mx-auto mb-4 text-neutral-400" />
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Ready to extract?</h3>
            <p className="text-neutral-600">Paste a YouTube video link above to see the thumbnails.</p>
          </div>
        )}
      </div>
    </div>
  );
};
