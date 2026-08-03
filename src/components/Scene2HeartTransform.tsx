'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Scene2Props {
  onComplete: () => void;
  playHeartbeat: () => void;
}

export const Scene2HeartTransform: React.FC<Scene2Props> = ({ onComplete, playHeartbeat }) => {
  useEffect(() => {
    playHeartbeat();
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete, playHeartbeat]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.0 } }}
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden z-10"
    >
      {/* Morphing Particles Eruption */}
      <div className="relative flex items-center justify-center">
        {/* Heart morphing animation frame */}
        <motion.div
          initial={{ scale: 1, rotate: 0, opacity: 1, borderRadius: '50%' }}
          animate={{
            scale: [1, 1.25, 0.9, 1.1, 1],
            rotate: [0, 15, -15, 0],
            borderRadius: ['50%', '30%', '16px'],
          }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-crimson via-burgundy-light to-burgundy-dark rounded-2xl shadow-[0_0_60px_rgba(230,25,75,0.7)] flex items-center justify-center relative border border-rosegold/30"
        >
          {/* Fading Heart outline */}
          <motion.svg
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.8 }}
            className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>

          {/* Emerging Folder Details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="w-12 h-1.5 bg-rosegold/80 rounded-full mb-2 shadow-[0_0_10px_rgba(255,215,0,0.6)]" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-rosegold-light font-serif">Memories</p>
          </motion.div>
        </motion.div>

        {/* Floating Heart Particles Orbiting */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 110;
          return (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                opacity: [0, 0.9, 0],
                scale: [0.3, 1, 0.5],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'easeInOut',
              }}
              className="absolute text-crimson drop-shadow-[0_0_12px_rgba(230,25,75,0.9)] pointer-events-none"
            >
              ❤️
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
