import React from 'react';
import { Upload, RotateCw, FlipHorizontal, FlipVertical, Download, Trash2 } from 'lucide-react';

export const ImageEditor: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState(0);
  const [flipH, setFlipH] = React.useState(false);
  const [flipV, setFlipV] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      const is90 = rotation % 180 !== 0;
      canvas.width = is90 ? img.height : img.width;
      canvas.height = is90 ? img.width : img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    };
    img.src = image;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="h-80 border-4 border-dashed border-neutral-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer group"
        >
          <div className="w-20 h-20 bg-neutral-100 text-neutral-400 rounded-3xl flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
            <Upload size={40} />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-neutral-900">Click to upload image</p>
            <p className="text-neutral-500">Supports JPG, PNG, WebP</p>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-neutral-200 overflow-hidden">
          <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              <button onClick={() => setRotation(r => (r + 90) % 360)} className="p-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all shadow-sm flex items-center gap-2 font-bold text-sm">
                <RotateCw size={18} /> Rotate
              </button>
              <button onClick={() => setFlipH(!flipH)} className={`p-3 border rounded-xl transition-all shadow-sm flex items-center gap-2 font-bold text-sm ${flipH ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50'}`}>
                <FlipHorizontal size={18} /> Flip H
              </button>
              <button onClick={() => setFlipV(!flipV)} className={`p-3 border rounded-xl transition-all shadow-sm flex items-center gap-2 font-bold text-sm ${flipV ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-50'}`}>
                <FlipVertical size={18} /> Flip V
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {setImage(null); setRotation(0); setFlipH(false); setFlipV(false);}} className="p-3 text-neutral-400 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
              <button onClick={handleDownload} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                <Download size={18} /> Download
              </button>
            </div>
          </div>
          <div className="p-12 flex items-center justify-center bg-neutral-100/50 min-h-[400px]">
            <div 
              className="transition-all duration-300 shadow-2xl"
              style={{ 
                transform: `rotate(${rotation}deg) scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})`,
              }}
            >
              <img src={image} alt="Preview" className="max-w-full max-h-[600px] rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
