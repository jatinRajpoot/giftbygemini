'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryImage } from '../types/proposal';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface MemoryModalProps {
  selectedMemory: MemoryImage | null;
  memories: MemoryImage[];
  onClose: () => void;
  onSelectMemory: (memory: MemoryImage) => void;
  playClick: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({
  selectedMemory,
  memories,
  onClose,
  onSelectMemory,
  playClick,
}) => {
  const currentIndex = memories.findIndex((m) => m.id === selectedMemory?.id);

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % memories.length;
    onSelectMemory(memories[nextIdx]);
    playClick();
  }, [currentIndex, memories, onSelectMemory, playClick]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + memories.length) % memories.length;
    onSelectMemory(memories[prevIdx]);
    playClick();
  }, [currentIndex, memories, onSelectMemory, playClick]);

  // Keyboard Navigation
  useEffect(() => {
    if (!selectedMemory) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMemory, onClose, handleNext, handlePrev]);

  if (!selectedMemory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative max-w-4xl w-full max-h-[90vh] glass-panel rounded-3xl p-4 sm:p-8 flex flex-col items-center justify-center shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-rosegold/30 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 z-20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Image Display */}
          <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src={selectedMemory.url}
              alt="Memory Focus"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Counter & Caption */}
          <div className="mt-4 sm:mt-6 flex items-center justify-between w-full px-4">
            <div className="flex items-center space-x-2 text-rosegold-light">
              <Heart className="w-4 h-4 text-crimson fill-crimson animate-pulse" />
              <span className="text-xs sm:text-sm font-serif">Cherished Moment</span>
            </div>
            <span className="text-xs sm:text-sm font-sans tracking-widest text-rosegold/60">
              {currentIndex + 1} / {memories.length}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
