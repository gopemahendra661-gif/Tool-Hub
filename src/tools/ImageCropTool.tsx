import React from 'react';
import { Crop, Download, Trash2, FileImage } from 'lucide-react';

export const ImageCropTool: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState('');
  const [crop, setCrop] = React.useState({ x: 50, y: 50, width: 200, height: 200 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - crop.x, y: e.clientY - crop.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;

    // Bounds check
    newX = Math.max(0, Math.min(newX, rect.width - crop.width));
    newY = Math.max(0, Math.min(newY, rect.height - crop.height));

    setCrop(prev => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleCrop = () => {
    if (!image || !containerRef.current) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const container = containerRef.current!;
      const scaleX = img.width / container.clientWidth;
      const scaleY = img.height / container.clientHeight;

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          img,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const link = document.createElement('a');
        link.download = `cropped-${fileName}`;
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
            <Crop size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-neutral-900">Upload Image to Crop</h3>
            <p className="text-neutral-500 font-medium mt-2">Drag to select the area you want to keep</p>
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

          <div className="p-12 flex flex-col items-center gap-12">
            <div 
              ref={containerRef}
              className="relative max-w-full select-none cursor-move"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img src={image} alt="To crop" className="max-h-[500px] rounded-xl pointer-events-none" />
              <div 
                className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move"
                style={{
                  left: crop.x,
                  top: crop.y,
                  width: crop.width,
                  height: crop.height
                }}
                onMouseDown={handleMouseDown}
              >
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  <div className="border-r border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-r border-b border-white/30" />
                  <div className="border-b border-white/30" />
                  <div className="border-r border-white/30" />
                  <div className="border-r border-white/30" />
                  <div />
                </div>
              </div>
            </div>

            <div className="w-full max-w-md space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Width</div>
                  <div className="text-lg font-black text-neutral-900">{crop.width}px</div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Height</div>
                  <div className="text-lg font-black text-neutral-900">{crop.height}px</div>
                </div>
              </div>

              <button
                onClick={handleCrop}
                className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-200 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Download size={24} />
                Crop & Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
