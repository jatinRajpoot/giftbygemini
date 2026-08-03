'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const romanticPhrases = [
  "Every memory with you is a treasure...",
  "In a world of millions, my heart chose you.",
  "You turned simple days into magic.",
  "With every beat of my heart, I love you more.",
  "Forever wouldn't be long enough with you.",
];

export const Scene6EmotionalText: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % romanticPhrases.length);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-8 sm:top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="font-serif text-sm sm:text-lg md:text-xl text-rosegold-light tracking-wider drop-shadow-[0_0_15px_rgba(230,25,75,0.6)] font-light italic"
        >
          &ldquo;{romanticPhrases[index]}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
