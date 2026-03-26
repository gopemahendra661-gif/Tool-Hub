import React from 'react';
import { FileImage, Download, Trash2, Settings } from 'lucide-react';

export const ImageFormatConverter: React.FC<{ targetFormat: 'png' | 'jpg' }> = ({ targetFormat }) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState('');
  const [isConverting, setIsConverting] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name.split('.')[0]);
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const convertImage = () => {
    if (!image) return;
    setIsConverting(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const mimeType = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, 0.9);
        
        const link = document.createElement('a');
        link.download = `${fileName}.${targetFormat}`;
        link.href = dataUrl;
        link.click();
      }
      setIsConverting(false);
    };
    img.src = image;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!image ? (
        <div className="bg-white border-4 border-dashed border-neutral-200 rounded-[3rem] p-20 text-center space-y-6 hover:border-indigo-300 transition-colors cursor-pointer relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <FileImage size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-neutral-900">Upload Image to Convert</h3>
            <p className="text-neutral-500 font-medium mt-2">Drag and drop or click to select a file</p>
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
            <div className="relative group max-w-full">
              <img src={image} alt="Preview" className="max-h-[400px] rounded-2xl shadow-2xl border-4 border-white" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm">Preview</span>
              </div>
            </div>

            <div className="w-full max-w-md space-y-6">
              <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Target Format</div>
                  <div className="text-xl font-black text-neutral-900 uppercase">{targetFormat}</div>
                </div>
                <Settings size={24} className="text-neutral-300" />
              </div>

              <button
                onClick={convertImage}
                disabled={isConverting}
                className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-indigo-200 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <Download size={24} />
                {isConverting ? 'Converting...' : `Convert to ${targetFormat.toUpperCase()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
