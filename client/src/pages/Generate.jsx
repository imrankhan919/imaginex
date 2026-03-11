import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw } from 'lucide-react';

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  
  const STYLES = ['Realistic', 'Anime', 'Cyberpunk', 'Watercolor', 'Oil Painting', 'Neon', 'Fantasy'];
  const [activeStyle, setActiveStyle] = useState('Realistic');
  
  const RATIOS = [
    { label: 'Square', value: '1:1' },
    { label: 'Portrait', value: '9:16' },
    { label: 'Landscape', value: '16:9' }
  ];
  const [activeRatio, setActiveRatio] = useState('1:1');

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt) return;
    
    setIsGenerating(true);
    setResult(null);
    
    // Mock network delay
    setTimeout(() => {
      setIsGenerating(false);
      setResult(`https://picsum.photos/seed/${Math.random()}/500/${activeRatio === '16:9' ? 280 : activeRatio === '9:16' ? 888 : 500}`);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto mt-4">
      <h1 className="text-3xl md:text-4xl font-syne font-bold mb-8 flex items-center gap-3">
        <Sparkles className="text-fuchsia-500 w-8 h-8" /> 
        Create with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">AI</span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="glass-card rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative shadow-lg shadow-black/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl rounded-tl-none translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Prompt</label>
            <textarea
              rows="4"
              placeholder="Describe what you want to see... e.g., 'A cyberpunk city in the rain, neon lights, highly detailed'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none transition-all"
            />
          </div>

          <div className="relative z-10">
            <label className="block text-sm font-medium text-gray-300 mb-3">Art Style</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => setActiveStyle(style)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeStyle === style 
                      ? 'bg-violet-600 text-white border border-violet-500' 
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <label className="block text-sm font-medium text-gray-300 mb-3">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-3">
              {RATIOS.map(ratio => (
                <button
                  key={ratio.label}
                  onClick={() => setActiveRatio(ratio.value)}
                  className={`py-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                    activeRatio === ratio.value 
                      ? 'bg-fuchsia-600/20 text-white border border-fuchsia-500/50 ring-1 ring-fuchsia-500/50' 
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                  }`}
                >
                  <div className={`border-2 border-current rounded-sm ${
                    ratio.value === '1:1' ? 'w-6 h-6' : ratio.value === '16:9' ? 'w-8 h-5' : 'w-5 h-8'
                  }`} />
                  <span className="text-xs">{ratio.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className={`mt-auto w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${
              !prompt 
                ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-500/50 hover:-translate-y-1 active:scale-[0.98]'
            }`}
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
            {isGenerating ? 'Generating Magic...' : 'Generate Image'}
          </button>
        </div>

        {/* Results */}
        <div className="h-full flex items-center justify-center">
          {result ? (
            <div className="w-full relative group rounded-3xl overflow-hidden glass-card p-2 animate-in fade-in zoom-in duration-500">
              <img src={result} alt="Generated" className="w-full h-auto rounded-2xl object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2 rounded-full font-medium transition-colors">
                  Save to Profile
                </button>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="w-full aspect-square md:aspect-auto md:h-full glass-card rounded-3xl flex flex-col items-center justify-center gap-4 text-violet-400">
              <RefreshCw className="w-8 h-8 animate-spin" />
              <p className="animate-pulse font-medium">Mixing colors...</p>
            </div>
          ) : (
            <div className="w-full aspect-square md:aspect-auto md:h-full border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-gray-500 gap-4">
              <Wand2 className="w-12 h-12 opacity-50" />
              <p>Your creation will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
