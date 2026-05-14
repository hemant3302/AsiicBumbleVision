import React from 'react';
import { AsciiOptions, DENSITY_MAPS } from '../types';
import { Sliders, Monitor, Type, Palette, Cpu, Radio } from 'lucide-react';
import { playButtonSound } from '../utils/soundEffects';

interface ControlPanelProps {
  options: AsciiOptions;
  setOptions: React.Dispatch<React.SetStateAction<AsciiOptions>>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ options, setOptions }) => {
  const handleChange = (key: keyof AsciiOptions, value: AsciiOptions[keyof AsciiOptions]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleModeChange = (key: keyof AsciiOptions, value: AsciiOptions[keyof AsciiOptions]) => {
    playButtonSound();
    handleChange(key, value);
  };

  return (
    <div className="absolute bottom-0 w-full z-30">
      {/* Top glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

      <div className="bg-black/95 backdrop-blur-md border-t border-cyan-900/40 px-6 py-3">

        {/* Panel header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-500 text-[9px] font-mono uppercase tracking-[0.2em]">
            <Cpu className="w-3 h-3 animate-pulse" />
            <span>SYS.CONTROL_PANEL // v2.1.0</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-mono text-cyan-800 tracking-widest">RENDER: LIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]" />
          </div>
        </div>

        {/* Controls row */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 items-start">

          {/* Font Size */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-600 uppercase tracking-widest">
                <Type className="w-2.5 h-2.5" />
                <span>Font Sz</span>
              </div>
              <span className="text-[9px] font-mono text-green-400 bg-green-950/50 border border-green-900/50 px-1.5 py-0.5">
                {options.fontSize}px
              </span>
            </div>
            <input
              type="range" min="6" max="24" value={options.fontSize}
              onChange={(e) => handleChange('fontSize', Number(e.target.value))}
              className="w-full h-0.5 appearance-none cursor-pointer accent-cyan-400 bg-cyan-950 rounded-full"
            />
            <div className="flex justify-between text-[7px] font-mono text-cyan-900">
              <span>6</span><span>24</span>
            </div>
          </div>

          {/* Brightness */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-600 uppercase tracking-widest">
                <Sliders className="w-2.5 h-2.5" />
                <span>Gain</span>
              </div>
              <span className="text-[9px] font-mono text-green-400 bg-green-950/50 border border-green-900/50 px-1.5 py-0.5">
                {options.brightness.toFixed(1)}
              </span>
            </div>
            <input
              type="range" min="0.5" max="2.0" step="0.1" value={options.brightness}
              onChange={(e) => handleChange('brightness', Number(e.target.value))}
              className="w-full h-0.5 appearance-none cursor-pointer accent-cyan-400 bg-cyan-950 rounded-full"
            />
            <div className="flex justify-between text-[7px] font-mono text-cyan-900">
              <span>0.5</span><span>2.0</span>
            </div>
          </div>

          {/* Contrast */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-600 uppercase tracking-widest">
                <Monitor className="w-2.5 h-2.5" />
                <span>Contrast</span>
              </div>
              <span className="text-[9px] font-mono text-green-400 bg-green-950/50 border border-green-900/50 px-1.5 py-0.5">
                {options.contrast.toFixed(1)}
              </span>
            </div>
            <input
              type="range" min="0.5" max="3.0" step="0.1" value={options.contrast}
              onChange={(e) => handleChange('contrast', Number(e.target.value))}
              className="w-full h-0.5 appearance-none cursor-pointer accent-cyan-400 bg-cyan-950 rounded-full"
            />
            <div className="flex justify-between text-[7px] font-mono text-cyan-900">
              <span>0.5</span><span>3.0</span>
            </div>
          </div>

          {/* Color Mode */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-600 uppercase tracking-widest">
              <Palette className="w-2.5 h-2.5" />
              <span>Color Mode</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {(['matrix', 'bw', 'retro', 'color'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => handleModeChange('colorMode', mode)}
                  className={`py-1 text-[8px] font-mono uppercase tracking-wider transition-all border ${
                    options.colorMode === mode
                      ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/70 shadow-[0_0_8px_rgba(34,211,238,0.25)]'
                      : 'bg-transparent border-cyan-900/30 text-cyan-900 hover:border-cyan-700/50 hover:text-cyan-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Charset */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-600 uppercase tracking-widest">
              <Radio className="w-2.5 h-2.5" />
              <span>Charset</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {(Object.keys(DENSITY_MAPS) as Array<keyof typeof DENSITY_MAPS>).map(mode => (
                <button
                  key={mode}
                  onClick={() => handleModeChange('density', mode)}
                  className={`py-1 text-[8px] font-mono uppercase tracking-wider transition-all border ${
                    options.density === mode
                      ? 'bg-violet-500/15 text-violet-300 border-violet-500/70 shadow-[0_0_8px_rgba(167,139,250,0.25)]'
                      : 'bg-transparent border-violet-900/30 text-violet-900 hover:border-violet-700/50 hover:text-violet-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Status footer */}
        <div className="mt-3 pt-2 border-t border-cyan-900/20 flex justify-between items-center text-[7px] font-mono">
          <span className="text-cyan-900 tracking-widest">ENGINE: CANVAS_2D // SMOOTH: ON // INERTIA: 0.75</span>
          <span className="text-green-900 tracking-widest">PROC ██░░░░ 34%</span>
          <span className="text-cyan-800 animate-pulse tracking-widest">◉ STREAM ACTIVE</span>
        </div>

      </div>
    </div>
  );
};