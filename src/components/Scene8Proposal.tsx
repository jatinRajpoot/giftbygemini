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
    const count = 300;
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

  // Generate 28 memory photo shower items evenly distributed across LEFT and RIGHT sides of the screen (3% to 93% width)
  const showerItems = Array.from({ length: 28 }).map((_, i) => {
    const photo = memories[i % memories.length] || memories[0];
    // Distribute from 3% (far left) to 93% (far right)
    const leftPercent = 3 + (i / 27) * 90;
    return {
      id: `shower-${i}-${photo?.id || i}`,
      photo,
      leftPercent,
      delay: (i * 0.35) % 5,
      duration: 7 + (i % 5) * 1.4,
      rotation: (i % 2 === 0 ? 1 : -1) * (12 + (i * 7) % 30),
      scale: 0.85 + (i % 3) * 0.15,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden z-30 select-none"
    >
      {/* Warm Candle & Heart Glow Ambient Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-gradient-to-t from-amber-600/20 via-crimson/20 to-transparent rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      {/* Floating Candle Light Sparks / Warm Particles */}
      {hasSaidYes && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            const posX = (i / 30) * 100;
            return (
              <motion.div
                key={`spark-${i}`}
                initial={{ y: '105vh', opacity: 0 }}
                animate={{
                  y: '-10vh',
                  opacity: [0, 0.9, 0],
                  scale: [0.4, 1.3, 0.5],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: 'linear',
                }}
                className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-gold via-amber-300 to-white shadow-[0_0_15px_rgba(255,215,0,0.9)]"
                style={{ left: `${posX}%` }}
              />
            );
          })}
        </div>
      )}

      {/* Floating Heart Lamps (Heart-Shaped Glowing Lanterns with Candle Flame) */}
      {hasSaidYes && (
        <div className="absolute inset-0 pointer-events-none z-12 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => {
            const leftPos = 4 + (i / 13) * 92; // Distribute evenly 4% to 96%
            const duration = 10 + (i % 4) * 2.5;
            const delay = (i * 0.6) % 4;
            const size = 38 + (i % 3) * 10;
            return (
              <motion.div
                key={`heart-lamp-${i}`}
                initial={{ y: '105vh', opacity: 0, scale: 0.7 }}
                animate={{
                  y: '-15vh',
                  x: [(i % 2 === 0 ? -15 : 15), (i % 2 === 0 ? 20 : -20)],
                  opacity: [0, 0.85, 0.85, 0],
                  scale: [0.7, 1.05, 0.8],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
                className="absolute flex flex-col items-center justify-center pointer-events-none"
                style={{ left: `${leftPos}%` }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Warm Glowing Heart Lamp Halo */}
                  <div
                    className="absolute rounded-full bg-amber-500/25 blur-md animate-pulse"
                    style={{ width: size * 1.5, height: size * 1.5 }}
                  />
                  {/* Glowing Heart Lamp Vessel */}
                  <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="rgba(255, 170, 40, 0.28)"
                    stroke="rgba(255, 215, 0, 0.85)"
                    strokeWidth="1.2"
                    className="drop-shadow-[0_0_14px_rgba(255,215,0,0.85)]"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {/* Candle Flame at Center of Lamp */}
                  <div className="absolute w-2 h-3.5 bg-gradient-to-t from-orange-500 via-amber-300 to-white rounded-full blur-[0.4px] shadow-[0_0_10px_rgba(255,200,60,1)] animate-pulse" />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Romantic Votive Candles at Bottom */}
      {hasSaidYes && (
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-18 flex items-end justify-between sm:justify-around px-2 sm:px-6 pb-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={`candle-${i}`} className="flex flex-col items-center relative">
              {/* Candle Flame Glow Halo */}
              <div className="w-8 h-8 -mb-5 bg-amber-400/30 rounded-full blur-md animate-pulse" />
              {/* Candle Flame */}
              <div className="w-2 h-3.5 bg-gradient-to-t from-amber-600 via-amber-200 to-white rounded-full shadow-[0_0_12px_rgba(255,200,80,1)] animate-pulse" />
              {/* Candle Body / Pillar */}
              <div className="w-3.5 sm:w-5 h-8 sm:h-12 rounded-t-sm bg-gradient-to-b from-[#f3e6d8] via-[#cca88b] to-[#7a583e] border-t border-amber-100/50 shadow-md" />
            </div>
          ))}
        </div>
      )}

      {/* Photo Rain Shower across BOTH Left & Right sides */}
      {hasSaidYes && (
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {showerItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                y: -160,
                opacity: 0,
                rotate: item.rotation,
              }}
              animate={{
                y: '115vh',
                opacity: [0, 0.95, 0.95, 0],
                rotate: [item.rotation, item.rotation * -1.5],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
                ease: 'linear',
              }}
              className="absolute w-20 h-24 sm:w-28 sm:h-36 rounded-xl p-1.5 bg-gradient-to-b from-[#3a0d18] via-[#21050c] to-[#0e0205] border border-gold/50 shadow-[0_10px_30px_rgba(230,25,75,0.45),0_0_20px_rgba(255,215,0,0.25)]"
              style={{ left: `${item.leftPercent}%` }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-gold/30">
                <Image
                  src={item.photo.url}
                  alt={item.photo.caption || 'Memory Photo'}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4">
        {/* 3D Ring Box Container (Hidden after she says Yes so stage belongs to her message & heart candles) */}
        {!hasSaidYes && (
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
        )}

        {/* Proposal Question & Interactive Yes/No Buttons OR Post-Acceptance Celebration */}
        <AnimatePresence mode="wait">
          {isOpen && !hasSaidYes && (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.6 } }}
              transition={{ delay: 0.4, duration: 1.0 }}
              className="mt-10 sm:mt-14 flex flex-col items-center text-center max-w-lg"
            >
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white tracking-wider drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] font-light">
                Will you marry me?
              </h1>

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
            </motion.div>
          )}

          {hasSaidYes && (
            <motion.div
              key="thanks-box"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="flex flex-col items-center text-center p-8 sm:p-12 glass-panel rounded-3xl border border-gold/60 shadow-[0_0_70px_rgba(255,215,0,0.35),0_0_30px_rgba(230,25,75,0.3)] z-30 max-w-xl"
            >
              {/* Glowing Heart Icon Header */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-crimson to-gold/80 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,215,0,0.8)] border border-gold/80"
              >
                <span className="text-2xl text-white">❤️</span>
              </motion.div>

              <h2 className="font-serif text-3xl sm:text-5xl text-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.95)] font-light leading-relaxed tracking-wide">
                Thanks for being in my life
              </h2>
              
              <p className="mt-4 text-sm sm:text-lg text-rosegold-light tracking-[0.25em] font-serif font-light uppercase">
                Forever & Always
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

