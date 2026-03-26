import React, { useState } from 'react';
import { FileJson, Copy, Check, Download, AlertCircle } from 'lucide-react';
import { ToolComponentProps } from '../types';

export const CsvToJsonConverter: React.FC<ToolComponentProps> = () => {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToJson = () => {
    setError('');
    setJsonOutput('');

    if (!csvInput.trim()) return;

    try {
      const lines = csvInput.trim().split('\n');
      if (lines.length < 2) {
        setError('CSV must have at least a header and one row of data.');
        return;
      }

      // Simple CSV parser (handles basic cases)
      const parseCsvLine = (line: string) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };

      const headers = parseCsvLine(lines[0]);
      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        const obj: Record<string, any> = {};
        headers.forEach((header, index) => {
          let val = values[index] || '';
          // Remove surrounding quotes if present
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1);
          }
          // Try to parse as number or boolean
          if (!isNaN(Number(val)) && val !== '') {
            obj[header] = Number(val);
          } else if (val.toLowerCase() === 'true') {
            obj[header] = true;
          } else if (val.toLowerCase() === 'false') {
            obj[header] = false;
          } else {
            obj[header] = val;
          }
        });
        data.push(obj);
      }

      setJsonOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      setError('Error parsing CSV. Please check your format.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const element = document.createElement("a");
    const file = new Blob([jsonOutput], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "data.json";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-bold text-neutral-900 mb-2">CSV Input</label>
          <textarea
            className="w-full h-64 p-4 bg-neutral-50 border border-neutral-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            placeholder='name,age,city&#10;John,30,New York&#10;Jane,25,London'
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <button
          onClick={convertToJson}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <FileJson size={20} /> Convert to JSON
        </button>
      </div>

      {jsonOutput && (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900">JSON Output</h3>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors text-sm font-bold text-neutral-700"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
              <button
                onClick={downloadJson}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors text-sm font-bold text-indigo-600"
              >
                <Download size={16} /> Download .json
              </button>
            </div>
          </div>
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 font-mono text-sm whitespace-pre-wrap h-64 overflow-y-auto">
            {jsonOutput}
          </div>
        </div>
      )}
    </div>
  );
};
