'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Scene3Folder3DProps {
  onOpen: () => void;
  playFolderOpen: () => void;
  playPhotoHover: () => void;
}

export const Scene3Folder3D: React.FC<Scene3Folder3DProps> = ({
  onOpen,
  playFolderOpen,
  playPhotoHover,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), {
    stiffness: 150,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    playFolderOpen();
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, transition: { duration: 1.2 } }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden z-10 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-crimson/15 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      {/* Floating 3D Folder Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={
          isHovered
            ? { y: -16, scale: 1.05 }
            : { y: [0, -10, 0], scale: 1 }
        }
        transition={
          isHovered
            ? { duration: 0.4 }
            : { y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }
        }
        onMouseEnter={() => {
          setIsHovered(true);
          playPhotoHover();
        }}
        className="relative w-72 h-48 sm:w-96 sm:h-64 rounded-2xl bg-gradient-to-br from-burgundy-dark via-crimson-deep to-[#1c0208] border border-rosegold/40 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(230,25,75,0.4)] flex flex-col justify-between p-6 sm:p-8 gpu-accelerated group"
      >
        {/* Top Tab Accent */}
        <div className="absolute -top-4 left-6 w-24 h-6 bg-burgundy-dark border-t border-l border-r border-rosegold/40 rounded-t-xl" />

        {/* Folder Gold Latch & Title */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
            <span className="text-xs uppercase tracking-[0.3em] font-serif text-rosegold-light">
              For You
            </span>
          </div>
          <span className="text-xs font-sans text-rosegold/60">2026</span>
        </div>

        {/* Folder Center Crest / Heart Emblem & Romantic Message */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-2">
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-serif text-xs sm:text-sm text-gold-light italic drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] mb-3 leading-relaxed"
          >
            &ldquo;Hi my love, how are you? I have something for you.&rdquo;
          </motion.p>

          <motion.div
            animate={{ scale: isHovered ? 1.15 : 1 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-crimson/20 border border-gold/40 flex items-center justify-center shadow-[0_0_25px_rgba(230,25,75,0.5)]"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
          <p className="mt-2.5 text-[11px] tracking-[0.2em] font-light text-rosegold-light/90 uppercase">
            {isOpen ? 'Unlocking Memories...' : 'Click to Open'}
          </p>
        </div>

        {/* Folder Opening Light Rays Effect */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 2.5 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-gradient-to-t from-gold/60 via-crimson/40 to-transparent rounded-2xl blur-xl pointer-events-none z-20"
          />
        )}

        {/* Orbiting Floating Hearts */}
        {Array.from({ length: 6 }).map((_, idx) => {
          const angle = (idx / 6) * Math.PI * 2;
          return (
            <motion.div
              key={idx}
              animate={{
                x: [Math.cos(angle) * 140, Math.cos(angle + Math.PI * 2) * 140],
                y: [Math.sin(angle) * 90, Math.sin(angle + Math.PI * 2) * 90],
                rotate: [0, 360],
              }}
              transition={{
                duration: 9 + idx,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-5 h-5 text-crimson/80 pointer-events-none drop-shadow-[0_0_8px_rgba(230,25,75,0.7)]"
              style={{ left: '50%', top: '50%' }}
            >
              ❤️
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
