'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MemoryImage } from '../types/proposal';

interface MemoryCardProps {
  memory: MemoryImage;
  index: number;
  isGathering: boolean;
  onSelect: (memory: MemoryImage) => void;
  playHover: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  index,
  isGathering,
  onSelect,
  playHover,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Staggered emergence delay
  const entryDelay = index * 0.06;

  // Calculate target position depending on whether we are in normal scatter or heart gathering state
  const targetX = isGathering ? `${memory.heartX}vw` : `${memory.initialX}vw`;
  const targetY = isGathering ? `${memory.heartY}vh` : `${memory.initialY}vh`;
  const targetZ = isGathering ? memory.heartZ || 0 : memory.initialZ;

  return (
    <motion.div
      initial={{
        x: 0,
        y: 0,
        z: -600,
        scale: 0.1,
        opacity: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      }}
      animate={
        isGathering
          ? {
              x: targetX,
              y: targetY,
              z: targetZ,
              scale: 0.7,
              opacity: 0.95,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
            }
          : {
              x: targetX,
              y: targetY,
              z: targetZ,
              scale: isHovered ? memory.scale * 1.25 : memory.scale,
              opacity: 1,
              rotateX: isHovered ? 0 : memory.rotationX,
              rotateY: isHovered ? 0 : memory.rotationY,
              rotateZ: isHovered ? 0 : memory.rotationZ,
            }
      }
      transition={
        isGathering
          ? { duration: 3.5, ease: [0.25, 1, 0.5, 1], delay: index * 0.02 }
          : {
              duration: 2.2,
              delay: entryDelay,
              ease: [0.16, 1, 0.3, 1],
              scale: { duration: 0.3 },
            }
      }
      className="absolute cursor-pointer select-none gpu-accelerated"
      style={{
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(memory)}
    >
      {/* Photo Frame Container */}
      <div
        className={`relative p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#2a1018] to-[#120408] border border-rosegold/30 shadow-[0_15px_35px_rgba(0,0,0,0.85)] transition-all duration-300 ${
          isHovered
            ? 'shadow-[0_25px_50px_rgba(230,25,75,0.45)] border-gold/60 ring-2 ring-gold/40'
            : ''
        }`}
      >
        <div className="relative w-28 h-36 sm:w-36 sm:h-44 md:w-44 md:h-56 rounded-lg overflow-hidden bg-black/50">
          <Image
            src={memory.url}
            alt="Memory"
            fill
            sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 220px"
            className="object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};
