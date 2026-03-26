import React, { useState } from 'react';
import { FileSpreadsheet, Copy, Check, Download, AlertCircle } from 'lucide-react';
import { ToolComponentProps } from '../types';

export const JsonToCsvConverter: React.FC<ToolComponentProps> = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToCsv = () => {
    setError('');
    setCsvOutput('');

    if (!jsonInput.trim()) return;

    try {
      const parsedData = JSON.parse(jsonInput);
      const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];

      if (dataArray.length === 0) {
        setError('JSON array is empty.');
        return;
      }

      // Extract headers from the first object
      const headers = Object.keys(dataArray[0]);
      
      const csvRows = [];
      // Add header row
      csvRows.push(headers.join(','));

      // Add data rows
      for (const row of dataArray) {
        const values = headers.map(header => {
          const val = row[header];
          const escaped = ('' + (val ?? '')).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }

      setCsvOutput(csvRows.join('\n'));
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    const element = document.createElement("a");
    const file = new Blob([csvOutput], {type: 'text/csv'});
    element.href = URL.createObjectURL(file);
    element.download = "data.csv";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-bold text-neutral-900 mb-2">JSON Input</label>
          <textarea
            className="w-full h-64 p-4 bg-neutral-50 border border-neutral-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <button
          onClick={convertToCsv}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <FileSpreadsheet size={20} /> Convert to CSV
        </button>
      </div>

      {csvOutput && (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900">CSV Output</h3>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors text-sm font-bold text-neutral-700"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
              <button
                onClick={downloadCsv}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors text-sm font-bold text-indigo-600"
              >
                <Download size={16} /> Download .csv
              </button>
            </div>
          </div>
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 font-mono text-sm whitespace-pre-wrap h-64 overflow-y-auto">
            {csvOutput}
          </div>
        </div>
      )}
    </div>
  );
};
