import React from 'react';
import { Minimize2, Download, Trash2, FileImage, Settings } from 'lucide-react';

export const ImageCompressor: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState('');
  const [quality, setQuality] = React.useState(0.8);
  const [originalSize, setOriginalSize] = React.useState(0);
  const [compressedSize, setCompressedSize] = React.useState(0);
  const [compressedImage, setCompressedImage] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const compress = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        setCompressedImage(dataUrl);
        
        // Estimate size from base64
        const stringLength = dataUrl.length - 'data:image/jpeg;base64,'.length;
        const sizeInBytes = Math.ceil(stringLength * 0.75);
        setCompressedSize(sizeInBytes);
      }
    };
    img.src = image;
  };

  React.useEffect(compress, [image, quality]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const download = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.download = `compressed-${fileName.split('.')[0]}.jpg`;
    link.href = compressedImage;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!image ? (
        <div className="bg-white border-4 border-dashed border-neutral-200 rounded-[3rem] p-20 text-center space-y-6 hover:border-indigo-300 transition-colors cursor-pointer relative">
          <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Minimize2 size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-neutral-900">Upload Image to Compress</h3>
            <p className="text-neutral-600 font-medium mt-2">Reduce file size while keeping quality</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-xl border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white border border-neutral-200 rounded-xl">
                <FileImage size={20} className="text-indigo-600" />
              </div>
              <span className="font-bold text-neutral-900">{fileName}</span>
            </div>
            <button onClick={() => setImage(null)} className="p-2 text-neutral-500 hover:text-red-500 transition-colors" aria-label="Remove image">
              <Trash2 size={20} />
            </button>
          </div>

          <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-neutral-100">
                <img src={compressedImage || image} alt="Compressed preview" className="w-full" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-xs font-bold rounded-full backdrop-blur-sm">Preview</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="text-xs font-bold text-neutral-500 uppercase mb-1">Original</div>
                  <div className="text-lg font-black text-neutral-900">{formatSize(originalSize)}</div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <div className="text-xs font-bold text-indigo-600 uppercase mb-1">Compressed</div>
                  <div className="text-lg font-black text-indigo-900">{formatSize(compressedSize)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Compression Quality</label>
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-black rounded-full">{Math.round(quality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full h-3 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  <span>Smaller Size</span>
                  <span>Better Quality</span>
                </div>
              </div>

              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                  <Settings size={24} />
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-900">
                    Saved {Math.round((1 - compressedSize / originalSize) * 100)}% space
                  </div>
                  <p className="text-xs font-medium text-emerald-700">Optimized for web performance</p>
                </div>
              </div>

              <button
                onClick={download}
                className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-200 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Download size={24} />
                Download Compressed Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
