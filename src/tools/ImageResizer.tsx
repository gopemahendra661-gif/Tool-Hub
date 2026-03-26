import React from 'react';
import { Maximize, Download, Trash2, FileImage, Settings } from 'lucide-react';

export const ImageResizer: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState('');
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [originalWidth, setOriginalWidth] = React.useState<number>(0);
  const [originalHeight, setOriginalHeight] = React.useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = React.useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImage(dataUrl);
        const img = new Image();
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (lockAspectRatio && originalWidth > 0) {
      setHeight(Math.round((newWidth / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (lockAspectRatio && originalHeight > 0) {
      setWidth(Math.round((newHeight / originalHeight) * originalWidth));
    }
  };

  const downloadResized = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const link = document.createElement('a');
        link.download = `resized-${fileName}`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    img.src = image;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!image ? (
        <div className="bg-white border-4 border-dashed border-neutral-200 rounded-[3rem] p-20 text-center space-y-6 hover:border-indigo-300 transition-colors cursor-pointer relative">
          <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Maximize size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-neutral-900">Upload Image to Resize</h3>
            <p className="text-neutral-500 font-medium mt-2">Change dimensions instantly</p>
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
            <button onClick={() => setImage(null)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>

          <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col items-center justify-center bg-neutral-50 rounded-3xl p-8 border border-neutral-100">
              <img src={image} alt="Preview" className="max-h-[300px] rounded-xl shadow-lg" />
              <div className="mt-4 text-xs font-bold text-neutral-400 uppercase">Original: {originalWidth} x {originalHeight}</div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase mb-3">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase mb-3">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-black text-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${lockAspectRatio ? 'bg-indigo-600 border-indigo-600' : 'border-neutral-300 group-hover:border-indigo-400'}`}>
                  {lockAspectRatio && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <input type="checkbox" checked={lockAspectRatio} onChange={(e) => setLockAspectRatio(e.target.checked)} className="hidden" />
                <span className="text-sm font-bold text-neutral-600">Lock Aspect Ratio</span>
              </label>

              <button
                onClick={downloadResized}
                className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-200 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Download size={24} />
                Download Resized Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
