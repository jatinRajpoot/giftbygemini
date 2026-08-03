'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MemoryImage } from '../types/proposal';

interface Scene8Props {
  memories: MemoryImage[];
  playRingBoxOpen: () => void;
  playCelebration: () => void;
}

export const Scene8Proposal: React.FC<Scene8Props> = ({
  memories,
  playRingBoxOpen,
  playCelebration,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSaidYes, setHasSaidYes] = useState(false);

  // Playful "No" button dodging coordinates
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleDodgeNo = () => {
    // Move the "No" button to a random position away from cursor/tap
    const randomX = (Math.random() - 0.5) * 360;
    const randomY = (Math.random() - 0.5) * 260;
    setNoPos({ x: randomX, y: randomY });
  };

  const handleBoxClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    playRingBoxOpen();
  };

  const handleYes = () => {
    setHasSaidYes(true);
    playCelebration();

    // Trigger Luxury Stardust Confetti Celebration
    const count = 280;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#e6194b', '#ffd700', '#b76e79', '#ffffff'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  // Pick 12 memory photos for post-Yes photo shower
  const showerPhotos = memories.slice(0, 12);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden z-30 select-none"
    >
      {/* Warm Candle Light Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[650px] h-[650px] bg-gradient-to-t from-gold/15 via-crimson/20 to-transparent rounded-full blur-[140px] animate-pulse-glow" />
      </div>

      {/* Warm Candle Floating Sparks / Light Particles */}
      {hasSaidYes && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => {
            const posX = (i / 24) * 100;
            return (
              <motion.div
                key={i}
                initial={{ y: '105vh', opacity: 0 }}
                animate={{
                  y: '-10vh',
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.6],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'linear',
                }}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-tr from-gold to-amber-200 shadow-[0_0_12px_rgba(255,215,0,0.9)]"
                style={{ left: `${posX}%` }}
              />
            );
          })}
        </div>
      )}

      {/* Post-Yes Photo & Heart Shower */}
      {hasSaidYes && (
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {showerPhotos.map((photo, i) => {
            const startX = (i / showerPhotos.length) * 90 - 45; // -45vw to +45vw
            return (
              <motion.div
                key={`shower-${photo.id}`}
                initial={{
                  y: -150,
                  x: `${startX}vw`,
                  opacity: 0,
                  rotate: (Math.random() - 0.5) * 40,
                }}
                animate={{
                  y: '110vh',
                  opacity: [0, 0.9, 0.9, 0],
                  rotate: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.45,
                  ease: 'easeInOut',
                }}
                className="absolute w-20 h-24 sm:w-28 sm:h-36 rounded-xl p-1.5 bg-gradient-to-b from-[#2a1018] to-[#120408] border border-gold/40 shadow-[0_10px_30px_rgba(230,25,75,0.4)]"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={photo.url}
                    alt="Memory Shower"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4">
        {/* 3D Ring Box Container */}
        <motion.div
          initial={{ scale: 0.8, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative cursor-pointer group"
          onClick={handleBoxClick}
        >
          {/* Ring Box Base */}
          <motion.div
            animate={
              !isOpen
                ? { rotateY: [0, 8, -8, 0], y: [0, -6, 0] }
                : { scale: 1.05 }
            }
            transition={{
              rotateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl bg-gradient-to-b from-[#400814] via-[#21020a] to-[#0d0004] border-2 border-gold/50 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(255,215,0,0.35)] flex flex-col items-center justify-center p-6 gpu-accelerated"
          >
            {/* Box Velvet Lid (Opens backward) */}
            <motion.div
              animate={{ rotateX: isOpen ? -130 : 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-b from-burgundy-light via-crimson-deep to-[#33000b] border-2 border-gold/40 flex flex-col items-center justify-center p-6 shadow-2xl z-20"
            >
              {!isOpen && (
                <>
                  {/* Gold Monogram Lock */}
                  <div className="w-12 h-12 rounded-full border border-gold/80 bg-gold/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.6)]">
                    <span className="font-serif text-gold text-lg">✦</span>
                  </div>
                  <p className="mt-4 text-xs tracking-[0.3em] font-serif text-rosegold-light uppercase">
                    Tap to Open
                  </p>
                </>
              )}
            </motion.div>

            {/* Inside Ring Cushion & Diamond Ring */}
            <div className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl bg-[#120005] border border-gold/20 p-4 z-10">
              {/* Velvet Ring Slot */}
              <div className="relative w-28 h-12 rounded-full bg-[#050002] border border-white/10 shadow-inner flex items-center justify-center">
                {/* Diamond Engagement Ring */}
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: isOpen ? 1 : 0, y: isOpen ? -18 : 10 }}
                  transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
                  className="relative flex flex-col items-center"
                >
                  {/* Glowing Solitaire Diamond */}
                  <div className="w-8 h-8 rotate-45 bg-gradient-to-tr from-white via-blue-100 to-amber-100 border border-white shadow-[0_0_30px_rgba(255,255,255,1),0_0_60px_rgba(255,215,0,0.9)] animate-pulse" />

                  {/* Rose Gold Ring Band */}
                  <div className="w-12 h-14 border-4 border-gold rounded-full -mt-4 shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Proposal Question & Interactive Yes/No Buttons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.2 }}
              className="mt-10 sm:mt-14 flex flex-col items-center text-center max-w-lg"
            >
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white tracking-wider drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] font-light">
                Will you marry me?
              </h1>

              {!hasSaidYes ? (
                <div className="relative mt-8 flex items-center space-x-6 sm:space-x-10 min-h-[60px]">
                  {/* YES Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="px-9 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-crimson via-burgundy-light to-gold text-white font-serif text-lg sm:text-xl tracking-widest shadow-[0_0_35px_rgba(230,25,75,0.8)] border border-gold/50 cursor-pointer z-20"
                  >
                    Yes
                  </motion.button>

                  {/* Playful Dodging NO Button */}
                  <motion.button
                    animate={{ x: noPos.x, y: noPos.y }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onMouseEnter={handleDodgeNo}
                    onTouchStart={handleDodgeNo}
                    onClick={handleDodgeNo}
                    className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full glass-panel border border-white/20 text-rosegold-light font-serif text-lg sm:text-xl tracking-widest cursor-pointer shadow-lg z-10"
                  >
                    No
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="mt-8 p-6 sm:p-8 glass-panel rounded-3xl border border-gold/50 flex flex-col items-center shadow-[0_0_50px_rgba(255,215,0,0.3)] z-30"
                >
                  <p className="font-serif text-2xl sm:text-4xl text-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.9)] font-light leading-relaxed">
                    Thank you for being in my life.
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-rosegold-light tracking-widest font-sans font-light">
                    Forever & Always
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
