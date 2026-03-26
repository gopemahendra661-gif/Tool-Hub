import React from 'react';
import { Download, Trash2, Image as ImageIcon } from 'lucide-react';

export const Base64ToImage: React.FC = () => {
  const [base64, setBase64] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);

  const handleConvert = () => {
    if (base64.trim()) {
      // Basic validation: check if it starts with data:image
      if (base64.startsWith('data:image')) {
        setImage(base64);
      } else {
        // Try to prepend data:image/png;base64, if it's just the raw string
        setImage(`data:image/png;base64,${base64.trim()}`);
      }
    }
  };

  const handleDownload = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'converted-image.png';
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Paste Base64 String</span>
            <button 
              onClick={() => { setBase64(''); setImage(null); }}
              className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <textarea
            className="flex-1 min-h-[300px] p-6 font-mono text-xs bg-transparent border-none focus:ring-0 outline-none resize-none"
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEU..."
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
          />
          <div className="p-4 bg-neutral-50 border-t border-neutral-100">
            <button
              onClick={handleConvert}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Convert to Image
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 flex flex-col items-center justify-center text-center min-h-[400px]">
          {image ? (
            <div className="w-full space-y-6">
              <div className="aspect-video bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 flex items-center justify-center">
                <img src={image} alt="Converted" className="max-w-full max-h-full object-contain" />
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                <Download size={20} /> Download Image
              </button>
            </div>
          ) : (
            <div className="text-neutral-300">
              <ImageIcon size={80} className="mx-auto mb-4" />
              <p className="text-neutral-500">Image preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
