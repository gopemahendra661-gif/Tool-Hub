import React, { useState } from 'react';
import { Youtube, Copy, Check, Clock, Link as LinkIcon } from 'lucide-react';

export const YouTubeTimestampGenerator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');
  const [timestampUrl, setTimestampUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const generateTimestamp = () => {
    const id = extractVideoId(url);
    if (id) {
      const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
      const newUrl = `https://youtu.be/${id}?t=${totalSeconds}`;
      setTimestampUrl(newUrl);
    } else {
      setTimestampUrl('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(timestampUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
              <Clock size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">YouTube Timestamp Generator</h2>
              <p className="text-neutral-500">Create links to specific moments in YouTube videos.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                YouTube Video URL
              </label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2 uppercase tracking-wider">
                  Seconds
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  className="w-full px-6 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={generateTimestamp}
              className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
            >
              Generate Link <LinkIcon size={20} />
            </button>

            {timestampUrl && (
              <div className="mt-8 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Generated Link</span>
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
                        <Copy size={16} /> Copy Link
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-neutral-200 overflow-hidden">
                  <span className="text-neutral-600 font-mono text-sm truncate flex-1">{timestampUrl}</span>
                  <a
                    href={timestampUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 prose prose-neutral max-w-none">
        <h2>What is a YouTube Timestamp Generator?</h2>
        <p>
          A YouTube Timestamp Generator is a tool that helps you create a specific URL for a YouTube video that starts playing at a precise moment. Instead of telling someone to "skip to 2:45," you can simply send them a link that does it automatically.
        </p>

        <h2>How to use the YouTube Timestamp Generator</h2>
        <ol>
          <li>Copy the URL of the YouTube video you want to share.</li>
          <li>Paste the URL into the "YouTube Video URL" field.</li>
          <li>Enter the minutes and seconds where you want the video to start.</li>
          <li>Click "Generate Link" to create your custom timestamped URL.</li>
          <li>Copy the link and share it with your friends or audience.</li>
        </ol>

        <h2>Why use Timestamped Links?</h2>
        <ul>
          <li><strong>Save Time:</strong> Help your viewers get straight to the most relevant part of a video.</li>
          <li><strong>Better Sharing:</strong> Perfect for highlighting a specific quote, tutorial step, or funny moment.</li>
          <li><strong>Professionalism:</strong> Great for educational content or business presentations where specific references are needed.</li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">Does this work on mobile?</h3>
            <p>Yes, timestamped links work perfectly on both desktop browsers and mobile YouTube apps.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Can I use this for YouTube Shorts?</h3>
            <p>YouTube Shorts are designed to be watched from the beginning, but standard timestamp parameters sometimes work depending on the device.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Is there a limit to the time I can set?</h3>
            <p>No, as long as the time you set is within the total duration of the video.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

import { ExternalLink } from 'lucide-react';
