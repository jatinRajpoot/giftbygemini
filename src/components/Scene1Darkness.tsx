'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Scene1Props {
  onComplete: () => void;
  playHeartbeat: () => void;
}

export const Scene1Darkness: React.FC<Scene1Props> = ({ onComplete, playHeartbeat }) => {
  const [showHeart, setShowHeart] = useState(false);
  const [isBeating, setIsBeating] = useState(false);

  useEffect(() => {
    // Faint glowing red heart fades into view after short delay
    const timer = setTimeout(() => {
      setShowHeart(true);
      setIsBeating(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Heartbeat sound interval
  useEffect(() => {
    if (!isBeating) return;

    // Trigger initial heartbeat
    playHeartbeat();

    const interval = setInterval(() => {
      playHeartbeat();
    }, 1600); // Sync with CSS heartbeat duration

    return () => clearInterval(interval);
  }, [isBeating, playHeartbeat]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black cursor-pointer select-none overflow-hidden z-10"
      onClick={onComplete}
    >
      {showHeart && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          className="flex flex-col items-center justify-center group"
        >
          {/* Faint Glowing Red Heart SVG */}
          <div className="relative animate-heartbeat p-8">
            <svg
              className="w-24 h-24 sm:w-32 sm:h-32 text-crimson drop-shadow-[0_0_35px_rgba(230,25,75,0.8)] filter transition-all duration-500 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            {/* Pulsating outer halo */}
            <div className="absolute inset-0 rounded-full bg-crimson/20 blur-2xl animate-pulse-glow" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5, duration: 1.2 }}
            className="mt-6 text-xs sm:text-sm tracking-[0.3em] uppercase text-rosegold-light/80 font-light"
          >
            Touch to Begin
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};
