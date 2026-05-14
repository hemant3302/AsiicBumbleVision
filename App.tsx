import React, { useState, useCallback } from 'react';
import { AsciiCanvas } from './components/AsciiCanvas';
import { ControlPanel } from './components/ControlPanel';
import { AnalysisModal } from './components/AnalysisModal';
import { AsciiOptions, AnalysisResult } from './types';
import { analyzeImage } from './services/geminiService';
import { Terminal } from 'lucide-react';
import { playAnalysisStartSound, playAnalysisCompleteSound } from './utils/soundEffects';

const App: React.FC = () => {
  const [options, setOptions] = useState<AsciiOptions>({
    fontSize: 12,
    brightness: 1.0,
    contrast: 1.0,
    colorMode: 'matrix',
    density: 'complex',
    resolution: 0.2, // Factor of window size
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCapture = useCallback(async (imageData: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setIsModalOpen(true);
    playAnalysisStartSound();

    try {
      const result = await analyzeImage(imageData);
      setAnalysisResult(result);
      playAnalysisCompleteSound();
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisResult({
        description: "SYSTEM ERROR: Neural link connection failed.",
        tags: ["ERROR", "OFFLINE"],
        threatLevel: "UNKNOWN"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">

      {/* Header HUD */}
      <header className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <div className="flex justify-between items-start p-4 bg-gradient-to-b from-black/90 to-transparent">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="relative">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-ping" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold tracking-[0.25em] uppercase text-white leading-none">
                Bumble<span className="text-cyan-400">Vision</span>
                <span className="text-[9px] ml-2 text-cyan-700 font-normal">v1.0</span>
              </h1>
              <span className="text-[8px] text-cyan-900 tracking-[0.3em] uppercase font-mono">Vision System</span>
            </div>
          </div>

          {/* Center: Status bar */}
          <div className="hidden md:flex items-center gap-6 text-[9px] font-mono tracking-widest">
            <div className="flex items-center gap-1.5 text-green-500">
              <span className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e] animate-pulse" />
              <span>SYS.ONLINE</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-600">
              <span className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_4px_#22d3ee]" />
              <span>CAM.ACTIVE</span>
            </div>
            <div className="flex items-center gap-1.5 text-violet-600">
              <span className="w-1 h-1 rounded-full bg-violet-500 shadow-[0_0_4px_#a78bfa]" />
              <span>AI.READY</span>
            </div>
          </div>

          {/* Right: REC indicator */}
          <div className="flex items-center gap-2 text-[9px] font-mono text-red-500">
            <span className="animate-pulse">◉ REC</span>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-900/60 to-transparent" />
      </header>

      {/* Main Canvas Area */}
      <main className="flex-grow relative z-10">
        <AsciiCanvas options={options} onCapture={handleCapture} />
      </main>

      {/* Controls */}
      <ControlPanel options={options} setOptions={setOptions} />

      {/* Analysis Modal */}
      {isModalOpen && (
        <AnalysisModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isLoading={isAnalyzing}
          result={analysisResult}
        />
      )}

      {/* Scanline overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default App;