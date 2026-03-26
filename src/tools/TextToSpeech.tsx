import React from 'react';
import { Volume2, Play, Pause, Square, Trash2 } from 'lucide-react';

export const TextToSpeech: React.FC = () => {
  const [text, setText] = React.useState('');
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = React.useState<string>('');
  const [pitch, setPitch] = React.useState(1);
  const [rate, setRate] = React.useState(1);

  React.useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
          <span className="text-sm font-bold uppercase tracking-wider text-neutral-400">Enter Text to Read Aloud</span>
          <button onClick={() => setText('')} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
        <textarea
          className="w-full h-64 p-8 bg-transparent border-none focus:ring-0 outline-none resize-none text-xl leading-relaxed"
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-neutral-200 space-y-6">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase mb-3">Select Voice</label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-3">Pitch: {pitch}</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-3">Rate: {rate}</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center gap-6">
          <button
            onClick={isSpeaking ? stop : speak}
            className="w-24 h-24 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
          >
            {isSpeaking ? <Square size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
          </button>
          <div className="text-white text-center">
            <div className="text-sm font-bold uppercase tracking-widest opacity-60">Status</div>
            <div className="text-xl font-black">{isSpeaking ? 'Speaking...' : 'Ready to Read'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
