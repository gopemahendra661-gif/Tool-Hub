import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, FileText, Loader2, RefreshCw } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { motion } from 'motion/react';

export const ImageToText: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        performOCR(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const performOCR = async (imageSrc: string) => {
    setLoading(true);
    setProgress(0);
    setText('');
    
    try {
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      const { data: { text } } = await worker.recognize(imageSrc);
      setText(text);
      await worker.terminate();
    } catch (error) {
      console.error('OCR Error:', error);
      setText('Error extracting text. Please try again with a clearer image.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setImage(null);
    setText('');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200">
      <div className="max-w-4xl mx-auto">
        {!image ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-16 text-center bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all cursor-pointer group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-indigo-600 shadow-sm border border-neutral-100 mx-auto mb-6 transition-colors">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Upload an image to extract text</h3>
            <p className="text-neutral-500">Supports JPG, PNG, and WebP formats.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-neutral-900">Original Image</h3>
                <button
                  onClick={handleReset}
                  className="text-sm text-red-600 hover:underline flex items-center gap-1"
                >
                  <RefreshCw size={14} /> Reset
                </button>
              </div>
              <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200">
                <img src={image} alt="Original" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-neutral-900">Extracted Text</h3>
                {text && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                )}
              </div>
              <div className="aspect-square bg-neutral-50 rounded-2xl border border-neutral-200 p-6 relative overflow-auto">
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                    <Loader2 size={48} className="text-indigo-600 animate-spin mb-4" />
                    <p className="font-bold text-neutral-900">Extracting text...</p>
                    <div className="w-48 h-2 bg-neutral-100 rounded-full mt-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-indigo-600"
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">{progress}% complete</p>
                  </div>
                ) : text ? (
                  <pre className="whitespace-pre-wrap font-sans text-neutral-700 leading-relaxed">
                    {text}
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                    <FileText size={48} className="mb-4 opacity-20" />
                    <p>Text will appear here after processing.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
