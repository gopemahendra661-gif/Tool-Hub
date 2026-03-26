import React, { useState, useRef } from 'react';
import { Upload, Download, Maximize, Trash2, Check, Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResizedImage {
  id: string;
  original: File;
  preview: string;
  resized?: string;
  width: number;
  height: number;
  status: 'pending' | 'processing' | 'done' | 'error';
}

export const BulkImageResizer: React.FC = () => {
  const [images, setImages] = useState<ResizedImage[]>([]);
  const [targetWidth, setTargetWidth] = useState(800);
  const [targetHeight, setTargetHeight] = useState(600);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: ResizedImage[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      original: file,
      preview: URL.createObjectURL(file),
      width: 0,
      height: 0,
      status: 'pending',
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const resizeImage = (img: ResizedImage): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = img.preview;
      image.onload = () => {
        let finalWidth = targetWidth;
        let finalHeight = targetHeight;

        if (lockAspectRatio) {
          const ratio = image.width / image.height;
          if (targetWidth / targetHeight > ratio) {
            finalWidth = targetHeight * ratio;
          } else {
            finalHeight = targetWidth / ratio;
          }
        }

        canvas.width = finalWidth;
        canvas.height = finalHeight;
        ctx?.drawImage(image, 0, 0, finalWidth, finalHeight);
        resolve(canvas.toDataURL(img.original.type));
      };
      image.onerror = reject;
    });
  };

  const handleBulkResize = async () => {
    setProcessing(true);
    const updatedImages = [...images];
    for (let i = 0; i < updatedImages.length; i++) {
      updatedImages[i].status = 'processing';
      setImages([...updatedImages]);
      try {
        const resized = await resizeImage(updatedImages[i]);
        updatedImages[i].resized = resized;
        updatedImages[i].status = 'done';
      } catch (error) {
        updatedImages[i].status = 'error';
      }
      setImages([...updatedImages]);
    }
    setProcessing(false);
  };

  const downloadAll = () => {
    images.forEach((img) => {
      if (img.resized) {
        const link = document.createElement('a');
        link.href = img.resized;
        link.download = `resized-${img.original.name}`;
        link.click();
      }
    });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Maximize size={18} className="text-indigo-600" /> Resize Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => setTargetWidth(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => setTargetHeight(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl focus:border-indigo-500 outline-none"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={lockAspectRatio}
                    onChange={(e) => setLockAspectRatio(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded border-neutral-300 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Lock Aspect Ratio</span>
                </label>
              </div>
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleBulkResize}
                  disabled={images.length === 0 || processing}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-300 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  {processing ? <Loader2 size={18} className="animate-spin" /> : 'Resize All'}
                </button>
                {images.some(img => img.status === 'done') && (
                  <button
                    onClick={downloadAll}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Download All
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Image List */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all cursor-pointer flex flex-col items-center justify-center group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <Plus size={32} className="text-neutral-400 group-hover:text-indigo-600 transition-colors mb-2" />
                <span className="text-sm font-bold text-neutral-500 group-hover:text-indigo-600 transition-colors">Add Images</span>
              </div>

              <AnimatePresence>
                {images.map((img) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="aspect-square bg-white rounded-2xl border border-neutral-200 overflow-hidden relative group"
                  >
                    <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => removeImage(img.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:scale-110 transition-transform"
                      >
                        <Trash2 size={16} />
                      </button>
                      {img.status === 'done' && (
                        <a
                          href={img.resized}
                          download={`resized-${img.original.name}`}
                          className="p-2 bg-green-600 text-white rounded-lg hover:scale-110 transition-transform"
                        >
                          <Download size={16} />
                        </a>
                      )}
                    </div>

                    {img.status === 'processing' && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <Loader2 size={24} className="text-indigo-600 animate-spin" />
                      </div>
                    )}

                    {img.status === 'done' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg">
                        <Check size={14} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
