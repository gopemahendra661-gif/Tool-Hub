import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check, RefreshCw } from 'lucide-react';

export const QrCodeGenerator: React.FC = () => {
  const [value, setValue] = React.useState('https://toolhub.com');
  const [size, setSize] = React.useState(256);
  const [level, setLevel] = React.useState<'L' | 'M' | 'Q' | 'H'>('L');
  const [includeMargin, setIncludeMargin] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 space-y-6">
        <div>
          <label className="block text-sm font-bold text-neutral-900 mb-2">QR Code Content</label>
          <textarea
            className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none"
            placeholder="Enter URL or text..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Size ({size}px)</label>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-2">Error Correction</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeMargin}
            onChange={(e) => setIncludeMargin(e.target.checked)}
            className="w-5 h-5 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-bold text-neutral-700">Include Margin</span>
        </label>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-white border border-neutral-100 rounded-2xl shadow-inner mb-8">
          <QRCodeSVG
            id="qr-code-svg"
            value={value || ' '}
            size={size}
            level={level}
            includeMargin={includeMargin}
          />
        </div>
        
        <div className="flex gap-4 w-full">
          <button
            onClick={downloadQRCode}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <Download size={20} /> Download PNG
          </button>
        </div>
        <p className="mt-4 text-xs text-neutral-400">
          The QR code is generated locally in your browser.
        </p>
      </div>
    </div>
  );
};
