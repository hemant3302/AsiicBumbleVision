import React from 'react';
import { AnalysisResult } from '../types';
import { X, ShieldAlert, Cpu } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: AnalysisResult | null;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, isLoading, result }) => {
  if (!isOpen) return null;

  const isCritical = result?.threatLevel.includes('HIGH') || result?.threatLevel.includes('CRITICAL');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-black overflow-hidden font-mono"
        style={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.4), 0 0 40px rgba(34,211,238,0.1), inset 0 0 40px rgba(0,0,0,0.8)' }}>

        {/* Corner decorators */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

        {/* Scanner line */}
        {isLoading && (
          <div className="absolute left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-[scan_2s_ease-in-out_infinite] z-10" />
        )}

        {/* Header */}
        <div className="px-6 py-3 border-b border-cyan-900/50 flex justify-between items-center bg-cyan-950/20">
          <h2 className="text-cyan-400 text-sm font-bold flex items-center gap-2 tracking-widest uppercase">
            <Cpu className="w-4 h-4 animate-pulse" />
            Neural Analysis
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-[8px] font-mono text-cyan-800 tracking-widest">PROC: ONLINE</span>
            <button onClick={onClose} className="text-cyan-800 hover:text-cyan-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 min-h-[300px] flex flex-col justify-center">
          {isLoading ? (
            <div className="space-y-6 text-center">
              <div className="text-cyan-400 text-sm tracking-widest animate-pulse uppercase">Uploading Visual Data...</div>
              <div className="space-y-1 text-[10px] font-mono text-cyan-900 tracking-widest">
                <div>packet_loss ........... 0%</div>
                <div>encryption ........... AES-256</div>
                <div>target_lock .......... ACQUIRED</div>
                <div className="animate-pulse">neural_link .......... SYNCING</div>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-5">

              {/* Threat Level */}
              <div className={`p-3 border flex items-center justify-between ${
                isCritical ? 'border-red-700/60 bg-red-950/20' : 'border-cyan-900/50 bg-cyan-950/10'
              }`}>
                <span className="text-[9px] font-mono text-cyan-800 tracking-widest uppercase">Threat Level Assessment</span>
                <div className={`text-base font-bold flex items-center gap-2 tracking-widest ${
                  isCritical ? 'text-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]' : 'text-green-400'
                }`}>
                  <ShieldAlert className="w-4 h-4" />
                  {result.threatLevel}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-[9px] font-mono text-cyan-800 tracking-[0.2em] uppercase border-b border-cyan-900/30 pb-1">Subject Analysis</h3>
                <p className="text-sm text-cyan-300 leading-relaxed">{result.description}</p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <h3 className="text-[9px] font-mono text-cyan-800 tracking-[0.2em] uppercase border-b border-cyan-900/30 pb-1">Identified Attributes</h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-mono border border-cyan-800/50 px-2 py-1 text-cyan-500 bg-cyan-950/30 tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button onClick={onClose}
                  className="text-[10px] font-mono tracking-widest uppercase px-5 py-2 border border-cyan-700/60 text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40 hover:border-cyan-500 transition-all">
                  Close File
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-500 text-sm tracking-widest">DATA CORRUPTED.</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-2 border-t border-cyan-900/30 flex justify-between text-[8px] font-mono text-cyan-900 tracking-widest">
          <span>TERMINAL_ID: 884-X</span>
          <span className="animate-pulse">◉ CONNECTED</span>
        </div>

      </div>
      <style>{`
        @keyframes scan {
          0%   { top: 0; }
          50%  { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
};