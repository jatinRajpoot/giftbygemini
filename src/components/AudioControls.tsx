'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full glass-panel hover:bg-white/15 text-rosegold-light hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)] border border-rosegold/30 flex items-center justify-center cursor-pointer group"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-rosegold/60 group-hover:text-white transition-colors" />
      ) : (
        <Volume2 className="w-5 h-5 text-gold animate-pulse group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};
