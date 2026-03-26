import React from 'react';
import { Upload, Copy, Check, Trash2, Image as ImageIcon } from 'lucide-react';

export const ImageToBase64: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [base64, setBase64] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setBase64(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setImage(null);
    setBase64('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 flex flex-col items-center justify-center text-center min-h-[400px]">
          {image ? (
            <div className="w-full space-y-6">
              <div className="relative group aspect-video bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
                <img src={image} alt="Preview" className="w-full h-full object-contain" />
                <button 
                  onClick={handleClear}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <p className="text-sm text-neutral-500">Image loaded successfully</p>
            </div>
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer group">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <Upload size={32} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Upload Image</h3>
              <p className="text-neutral-500">Click to browse or drag and drop</p>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          )}
        </div>

        {/* Base64 Output */}
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
            <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Base64 String</span>
            {base64 && (
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-medium hover:bg-neutral-50 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy String'}
              </button>
            )}
          </div>
          <textarea
            className="flex-1 p-6 font-mono text-xs bg-transparent border-none focus:ring-0 outline-none resize-none break-all"
            placeholder="Base64 string will appear here..."
            value={base64}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
