'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryImage } from '../types/proposal';

interface SceneMoonSequenceProps {
  memories: MemoryImage[];
  onComplete: () => void;
  playClick: () => void;
}

type MoonStep = 'QUESTION' | 'ACTUAL_MOON' | 'BUT_PAUSE' | 'MERA_CHAND';

export const SceneMoonSequence: React.FC<SceneMoonSequenceProps> = ({
  memories,
  onComplete,
  playClick,
}) => {
  const [step, setStep] = useState<MoonStep>('QUESTION');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Pick top 4 photos for the "Mera chand" circular gallery
  const targetPhotos = memories.slice(0, 4);

  // Auto-cycle through photos in Step 4
  useEffect(() => {
    if (step !== 'MERA_CHAND') return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % Math.max(1, targetPhotos.length));
    }, 3200);

    return () => clearInterval(interval);
  }, [step, targetPhotos.length]);

  // Handle Step 3 pause transition to Step 4 automatically
  useEffect(() => {
    if (step === 'BUT_PAUSE') {
      const timer = setTimeout(() => {
        setStep('MERA_CHAND');
        playClick();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [step, playClick]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black px-4 select-none overflow-hidden"
    >
      {/* Soft Silver Moonlight Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[550px] h-[550px] bg-slate-200/10 rounded-full blur-[130px] animate-pulse-glow" />
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: QUESTION */}
        {step === 'QUESTION' && (
          <motion.div
            key="step-question"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex flex-col items-center text-center max-w-xl z-10"
          >
            <h2 className="font-serif text-2xl sm:text-4xl text-white tracking-wider leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] font-light">
              Aapko pata hai chand kesa dikhta hai?
            </h2>

            <div className="mt-10 flex items-center space-x-6 sm:space-x-8">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playClick();
                  setStep('ACTUAL_MOON');
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-burgundy-light to-crimson text-white font-serif text-base sm:text-lg tracking-widest border border-gold/40 shadow-[0_0_25px_rgba(230,25,75,0.6)] cursor-pointer"
              >
                Haan
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playClick();
                  setStep('ACTUAL_MOON');
                }}
                className="px-8 py-3.5 rounded-full glass-panel border border-white/20 text-rosegold-light font-serif text-base sm:text-lg tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                Nahi
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: ACTUAL MOON */}
        {step === 'ACTUAL_MOON' && (
          <motion.div
            key="step-moon"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="flex flex-col items-center text-center z-10"
          >
            {/* Glowing Full Moon Display */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-slate-300 via-amber-100 to-white shadow-[0_0_80px_rgba(255,255,255,0.8),0_0_150px_rgba(255,215,0,0.4)] border-4 border-amber-100/50 flex items-center justify-center overflow-hidden my-6">
              <div className="absolute top-8 left-10 w-12 h-12 rounded-full bg-slate-400/20 blur-[2px]" />
              <div className="absolute bottom-12 right-14 w-16 h-16 rounded-full bg-amber-300/20 blur-[3px]" />
              <div className="absolute top-20 right-8 w-10 h-10 rounded-full bg-slate-500/15 blur-[2px]" />
            </div>

            <p className="font-serif text-2xl sm:text-3xl text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] tracking-wider font-light mt-2">
              Aisa dikhta hai
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClick();
                setStep('BUT_PAUSE');
              }}
              className="mt-8 px-9 py-3.5 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-serif text-base sm:text-lg font-medium tracking-widest shadow-[0_0_30px_rgba(255,215,0,0.6)] cursor-pointer"
            >
              Okay, Next
            </motion.button>
          </motion.div>
        )}

        {/* STEP 3: BUTTTTT PAUSE */}
        {step === 'BUT_PAUSE' && (
          <motion.div
            key="step-but"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center text-center z-10"
          >
            <h1 className="font-serif text-4xl sm:text-6xl text-rosegold-light tracking-widest drop-shadow-[0_0_25px_rgba(230,25,75,0.7)] font-light italic">
              Buttttt...
            </h1>
          </motion.div>
        )}

        {/* STEP 4: MERA CHAND AISA DIKHTA HAI */}
        {step === 'MERA_CHAND' && (
          <motion.div
            key="step-mera-chand"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="flex flex-col items-center text-center z-10 max-w-xl"
          >
            <h2 className="font-serif text-2xl sm:text-4xl text-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.9)] tracking-wider font-light mb-6">
              Mera chand aisa dikhta hai...
            </h2>

            {/* Her Photo inside Glowing Moon Ring */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-2.5 bg-gradient-to-tr from-crimson via-gold to-rosegold shadow-[0_0_70px_rgba(230,25,75,0.8)] border-2 border-gold/60 my-4">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-black">
                <AnimatePresence mode="wait">
                  {targetPhotos[activePhotoIdx] && (
                    <motion.div
                      key={targetPhotos[activePhotoIdx].id}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1.0 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={targetPhotos[activePhotoIdx].url}
                        alt="Mera Chand"
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClick();
                onComplete();
              }}
              className="mt-8 px-10 py-3.5 rounded-full bg-gradient-to-r from-crimson via-burgundy-light to-gold text-white font-serif text-base sm:text-lg tracking-widest border border-gold/50 shadow-[0_0_35px_rgba(230,25,75,0.8)] cursor-pointer"
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
