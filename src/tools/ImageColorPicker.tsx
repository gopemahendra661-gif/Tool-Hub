import React from 'react';
import { Pipette, Copy, Check, Trash2, FileImage } from 'lucide-react';

export const ImageColorPicker: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState('#6366f1');
  const [copied, setCopied] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImage(dataUrl);
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (canvas) {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.drawImage(img, 0, 0);
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
      setSelectedColor(hex);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {!image ? (
        <div className="bg-white border-4 border-dashed border-neutral-200 rounded-[3rem] p-20 text-center space-y-6 hover:border-indigo-300 transition-colors cursor-pointer relative">
          <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Pipette size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-neutral-900">Upload Image to Pick Color</h3>
            <p className="text-neutral-500 font-medium mt-2">Click anywhere on the image to get HEX code</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-xl border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
              <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Click Image to Pick Color</span>
              <button onClick={() => setImage(null)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
            <div className="p-8 flex justify-center bg-neutral-50 overflow-auto max-h-[600px]">
              <canvas
                ref={canvasRef}
                onClick={handleImageClick}
                className="max-w-full cursor-crosshair rounded-xl shadow-2xl"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-neutral-200 text-center space-y-6">
              <div className="w-32 h-32 rounded-3xl mx-auto shadow-2xl border-4 border-white" style={{ backgroundColor: selectedColor }} />
              <div>
                <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-1">Selected Color</div>
                <div className="text-4xl font-black text-neutral-900 uppercase tracking-tight">{selectedColor}</div>
              </div>
              <button
                onClick={handleCopy}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                {copied ? 'Copied HEX!' : 'Copy HEX Code'}
              </button>
            </div>

            <div className="bg-neutral-900 p-8 rounded-[2.5rem] text-white space-y-4">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Color Formats</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-sm font-bold text-neutral-400">HEX</span>
                  <span className="font-mono font-bold uppercase">{selectedColor}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-sm font-bold text-neutral-400">RGB</span>
                  <span className="font-mono font-bold">
                    {(() => {
                      const r = parseInt(selectedColor.slice(1, 3), 16);
                      const g = parseInt(selectedColor.slice(3, 5), 16);
                      const b = parseInt(selectedColor.slice(5, 7), 16);
                      return `${r}, ${g}, ${b}`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
