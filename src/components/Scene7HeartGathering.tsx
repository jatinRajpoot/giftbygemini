'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Scene7Props {
  onGatherComplete: () => void;
}

export const Scene7HeartGathering: React.FC<Scene7Props> = ({ onGatherComplete }) => {
  useEffect(() => {
    // Give 4.5 seconds for memories to finish morphing into the heart before transitioning to Proposal
    const timer = setTimeout(() => {
      onGatherComplete();
    }, 4800);

    return () => clearTimeout(timer);
  }, [onGatherComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col items-center justify-center">
      {/* Central Heart Ambient Flash */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.8, 0.4], scale: [0.5, 1.3, 1] }}
        transition={{ duration: 3.5, ease: 'easeInOut' }}
        className="w-96 h-96 bg-crimson/25 rounded-full blur-[100px]"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="absolute bottom-16 text-center font-serif text-lg sm:text-2xl text-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.8)] tracking-widest uppercase font-light"
      >
        Every piece of my heart leads to you...
      </motion.p>
    </div>
  );
};
