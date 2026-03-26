import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, Copy, Check, Loader2, Wand2, Trash2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GoogleGenAI } from "@google/genai";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STYLES = [
  { id: 'cinematic', name: 'Cinematic', suffix: 'cinematic style, dramatic lighting, epic composition' },
  { id: 'anime', name: 'Anime', suffix: 'anime style, vibrant colors, cel shaded, high quality illustration' },
  { id: 'realistic', name: 'Realistic', suffix: 'photorealistic, hyper-detailed, 8k resolution, professional photography' },
  { id: 'fantasy', name: 'Fantasy', suffix: 'fantasy art style, ethereal, magical atmosphere, intricate details' },
];

export const AIImageToPromptGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [results, setResults] = useState<{
    caption: string;
    basePrompt: string;
    enhancedPrompt: string;
    styledPrompt: string;
    model?: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError(
        <div className="flex flex-col gap-2">
          <p className="font-bold">Image size must be less than 2MB. (इमेज का साइज 2MB से कम होना चाहिए)</p>
          <p className="text-xs opacity-80">Please compress your image and try again. (कृपया अपनी इमेज को कंप्रेस करें और फिर से प्रयास करें)</p>
          <a 
            href="/tools/image-compressor" 
            target="_blank" 
            className="mt-2 inline-flex items-center justify-center gap-2 py-2 px-4 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-bold text-xs"
          >
            Go to Image Compressor <ChevronRight size={14} />
          </a>
        </div>
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setError(null);
      setResults(null);
    };
    reader.readAsDataURL(file);
  };

  const generatePrompt = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      let caption = null;
      let usedModel = null;

      // 1. Try OpenRouter Vision (Backend)
      try {
        console.log("Attempting OpenRouter Vision...");
        const orResponse = await fetch('/api/image-to-prompt-openrouter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image }),
        });

        if (orResponse.ok) {
          const orData = await orResponse.json();
          caption = orData.caption;
          usedModel = orData.model;
        } else {
          console.warn("OpenRouter Vision failed or not configured.");
        }
      } catch (orErr) {
        console.warn("Error calling OpenRouter Vision API:", orErr);
      }

      // 2. Ultimate Fallback: Google Gemini 3.1 Flash Lite (Frontend)
      if (!caption) {
        try {
          console.log("Attempting Google Gemini 3.1 Flash Lite...");
          const ai = new GoogleGenAI({ apiKey: (process.env.GEMINI_API_KEY as string) });
          
          const base64Data = image.split(',')[1];
          const mimeType = image.split(';')[0].split(':')[1];

          const geminiResponse = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-preview",
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      data: base64Data,
                      mimeType: mimeType
                    }
                  },
                  {
                    text: "Describe this image in detail for an AI art prompt. Focus on the subject, composition, lighting, colors, and mood. Provide only the descriptive text, no introductory or concluding remarks."
                  }
                ]
              }
            ]
          });

          caption = geminiResponse.text;
          usedModel = "Google Gemini 3.1 Flash Lite (Vision)";
        } catch (geminiErr: any) {
          console.error("Gemini Error:", geminiErr);
          throw new Error("Both OpenRouter and Gemini failed. Please check your API keys.");
        }
      }

      if (!caption) throw new Error("Could not generate a description for this image.");

      const basePrompt = caption;
      const enhancedPrompt = `${caption}, ultra realistic, 4k, high detail, cinematic lighting`;
      const styledPrompt = `${enhancedPrompt}, ${selectedStyle.suffix}`;

      setResults({
        caption,
        basePrompt,
        enhancedPrompt,
        styledPrompt,
        model: usedModel
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const reset = () => {
    setImage(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Upload & Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Upload Image</label>
              {!image ? (
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-12 text-center group-hover:border-indigo-500 group-hover:bg-indigo-50 transition-all duration-300">
                    <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <Upload size={32} className="text-neutral-400 group-hover:text-indigo-600" />
                    </div>
                    <p className="text-neutral-900 font-bold mb-1">Click or drag image to upload</p>
                    <p className="text-neutral-500 text-sm">Supports JPG, PNG, WebP (Max 2MB)</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 aspect-video bg-neutral-50">
                  <img src={image} alt="Preview" className="w-full h-full object-contain" />
                  <button
                    onClick={reset}
                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-red-50 text-neutral-600 hover:text-red-600 rounded-xl shadow-sm transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Select Style</label>
              <div className="grid grid-cols-2 gap-3">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all",
                      selectedStyle.id === style.id
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-neutral-100 hover:border-neutral-200 text-neutral-600"
                    )}
                  >
                    <span className="font-bold block">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generatePrompt}
              disabled={!image || loading}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating Prompt...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  Generate AI Prompt
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
          </div>

          {/* Right Side: Results */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <ImageIcon size={18} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Generated Prompts</h3>
            </div>

            <AnimatePresence mode="wait">
              {!results ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-neutral-300 mb-4 border border-neutral-200 border-dashed">
                    <Wand2 size={32} />
                  </div>
                  <p className="text-neutral-500 font-medium">Upload an image and click generate to see AI prompts here.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Image Caption */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Image Caption</label>
                      <button
                        onClick={() => copyToClipboard(results.caption, 'caption')}
                        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-xs font-bold"
                      >
                        {copiedField === 'caption' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedField === 'caption' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-neutral-200 text-neutral-700 text-sm italic">
                      "{results.caption}"
                    </div>
                  </div>

                  {/* Base Prompt */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Base Prompt</label>
                      <button
                        onClick={() => copyToClipboard(results.basePrompt, 'base')}
                        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-xs font-bold"
                      >
                        {copiedField === 'base' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedField === 'base' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-neutral-200 text-neutral-700 text-sm">
                      {results.basePrompt}
                    </div>
                  </div>

                  {/* Enhanced Prompt */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Enhanced Prompt</label>
                      <button
                        onClick={() => copyToClipboard(results.enhancedPrompt, 'enhanced')}
                        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-xs font-bold"
                      >
                        {copiedField === 'enhanced' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedField === 'enhanced' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-neutral-200 text-neutral-700 text-sm">
                      {results.enhancedPrompt}
                    </div>
                  </div>

                  {/* Styled Prompt */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{selectedStyle.name} Style Prompt</label>
                      <button
                        onClick={() => copyToClipboard(results.styledPrompt, 'styled')}
                        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-xs font-bold"
                      >
                        {copiedField === 'styled' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedField === 'styled' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900 text-sm font-medium">
                      {results.styledPrompt}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <div className="bg-neutral-50 px-8 py-4 border-t border-neutral-100 flex items-center justify-between">
        <p className="text-xs text-neutral-500">
          {results?.model ? `Powered by ${results.model}` : 'Powered by OpenRouter & Gemini Vision'}
        </p>
        <div className="flex gap-4">
          <span className="text-xs font-bold text-indigo-600">Midjourney</span>
          <span className="text-xs font-bold text-purple-600">DALL-E 3</span>
          <span className="text-xs font-bold text-blue-600">Stable Diffusion</span>
        </div>
      </div>
    </div>
  );
};
