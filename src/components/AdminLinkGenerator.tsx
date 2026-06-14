import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle } from 'lucide-react';

const PREFIXES = [
  'Mr.',
  'Mrs.',
  'Ms.',
  'Miss',
  'Dr.',
  'Mr. & Mrs.',
  'Dr. & Mrs.',
  'Mr. & Dr.',
  'The',
  'Family'
];

export const AdminLinkGenerator: React.FC = () => {
  const [prefix, setPrefix] = useState('Mr. & Mrs.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    // Construct the URL
    const baseUrl = window.location.origin;
    const searchParams = new URLSearchParams();
    if (prefix) searchParams.set('prefix', prefix);
    searchParams.set('name', guestName.trim());
    
    setGeneratedLink(`${baseUrl}/?${searchParams.toString()}`);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(176,137,104,0.15)] p-8 sm:p-10 border border-brand-beige/30 relative overflow-hidden">
        
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-beige/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-champagne/40 blur-3xl rounded-full" />

        <div className="flex flex-col items-center gap-3 mb-10 relative z-10">
          <div className="w-12 h-12 bg-stone-50 rounded-full border border-brand-beige/40 flex items-center justify-center shadow-inner">
            <LinkIcon className="w-5 h-5 text-brand-beige-deep" />
          </div>
          <h1 className="text-3xl font-display text-stone-800">Link Generator</h1>
          <p className="text-stone-500 text-sm font-serif italic text-center">Create personalized invitation links for your guests.</p>
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2 ml-2">Prefix</label>
            <div className="relative">
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-stone-50 px-6 py-4 rounded-full border border-stone-200 focus:ring-2 focus:ring-brand-beige/30 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 appearance-none font-serif text-lg text-stone-700 shadow-inner cursor-pointer"
              >
                <option value="">No Prefix</option>
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-beige-deep">
                ▼
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-2 ml-2">Guest Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-stone-50 px-6 py-4 rounded-full border border-stone-200 focus:ring-2 focus:ring-brand-beige/30 focus:border-brand-beige-deep/40 outline-none transition-all duration-300 font-serif italic text-lg text-stone-700 placeholder:text-stone-300 shadow-inner"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full bg-stone-800 text-brand-champagne py-4 rounded-full font-sans tracking-[0.2em] font-bold text-[11px] uppercase hover:bg-stone-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 p-6 bg-brand-champagne/30 rounded-3xl border border-brand-beige/20 shadow-inner">
              <p className="text-stone-600 text-xs sm:text-sm mb-4 font-mono break-all leading-relaxed p-4 bg-white/60 rounded-xl border border-white">
                {generatedLink}
              </p>
              <button
                onClick={handleCopy}
                className="w-full bg-white text-stone-800 border border-stone-200 py-3 rounded-full font-sans tracking-[0.1em] font-bold text-xs uppercase hover:bg-stone-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
