'use client';

import React, { useState } from 'react';
import { Scene, MemoryImage } from '../types/proposal';
import { useRandomMemories } from '../hooks/useRandomMemories';
import { useAudioController } from '../hooks/useAudioController';
import { ParticleCanvas } from './ParticleCanvas';
import { Scene1Darkness } from './Scene1Darkness';
import { Scene2HeartTransform } from './Scene2HeartTransform';
import { Scene3Folder3D } from './Scene3Folder3D';
import { MemoryCard } from './MemoryCard';
import { MemoryModal } from './MemoryModal';
import { Scene6EmotionalText } from './Scene6EmotionalText';
import { Scene7HeartGathering } from './Scene7HeartGathering';
import { SceneMoonSequence } from './SceneMoonSequence';
import { Scene8Proposal } from './Scene8Proposal';
import { AudioControls } from './AudioControls';
import { motion, AnimatePresence } from 'framer-motion';

export const CinematicStage: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<Scene>('DARKNESS');
  const [selectedMemory, setSelectedMemory] = useState<MemoryImage | null>(null);

  const { memories, loading } = useRandomMemories();
  const audio = useAudioController();

  const handleNextScene = (nextScene: Scene) => {
    if (nextScene === 'MEMORIES_ERUPT') {
      audio.playPhotoScatter();
    }
    setCurrentScene(nextScene);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white select-none">
      {/* Universal Floating Audio Toggle */}
      <AudioControls isMuted={audio.isMuted} onToggle={audio.toggleMusic} />

      {/* GPU Accelerated Ambient Stardust Canvas */}
      <ParticleCanvas
        density={currentScene === 'PROPOSAL' || currentScene === 'HEART_GATHERING' ? 100 : 60}
        speedMultiplier={currentScene === 'HEART_GATHERING' ? 1.8 : 1}
      />

      {/* Vignette Overlay for Depth */}
      <div className="fixed inset-0 vignette-overlay z-15 pointer-events-none" />

      {/* Loading state indicator if manifest loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-12 h-12 rounded-full border-2 border-crimson border-t-transparent animate-spin" />
        </div>
      )}

      {/* Scene Render Engine */}
      <AnimatePresence mode="wait">
        {/* SCENE 1 — DARKNESS & BEATING HEART */}
        {currentScene === 'DARKNESS' && (
          <Scene1Darkness
            key="scene1"
            onComplete={() => handleNextScene('TRANSFORMATION')}
            playHeartbeat={audio.playHeartbeat}
          />
        )}

        {/* SCENE 2 — HEART MORPHING INTO FOLDER */}
        {currentScene === 'TRANSFORMATION' && (
          <Scene2HeartTransform
            key="scene2"
            onComplete={() => handleNextScene('FOLDER')}
            playHeartbeat={audio.playHeartbeat}
          />
        )}

        {/* SCENE 3 — FLOATING 3D FOLDER */}
        {currentScene === 'FOLDER' && (
          <Scene3Folder3D
            key="scene3"
            onOpen={() => handleNextScene('MEMORIES_ERUPT')}
            playFolderOpen={audio.playFolderOpen}
            playPhotoHover={audio.playPhotoHover}
          />
        )}

        {/* SCENE 4 & 5 — FLOATING MEMORIES CLOUD */}
        {(currentScene === 'MEMORIES_ERUPT' ||
          currentScene === 'INTERACTIVE_CLOUD' ||
          currentScene === 'HEART_GATHERING') && (
          <motion.div
            key="memory-cloud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="fixed inset-0 flex items-center justify-center z-20 pointer-events-auto"
            style={{ perspective: 1000 }}
          >
            {/* Emotional Text Quote Overlay */}
            {currentScene !== 'HEART_GATHERING' && <Scene6EmotionalText />}

            {/* 40-60 Random Memory Cards Floating */}
            {memories.map((mem, idx) => (
              <MemoryCard
                key={mem.id}
                memory={mem}
                index={idx}
                isGathering={currentScene === 'HEART_GATHERING'}
                onSelect={(m) => {
                  setSelectedMemory(m);
                  audio.playPhotoClick();
                }}
                playHover={audio.playPhotoHover}
              />
            ))}

            {/* Journey Trigger Button to initiate Scene 7 Heart Gathering */}
            {currentScene !== 'HEART_GATHERING' && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNextScene('HEART_GATHERING')}
                className="fixed bottom-8 sm:bottom-12 z-30 px-6 sm:px-8 py-3 rounded-full glass-panel border border-gold/40 text-gold font-serif text-sm sm:text-base tracking-widest shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:bg-gold/20 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <span>Continue</span>
              </motion.button>
            )}

            {/* Scene 7 Overlay Controller */}
            {currentScene === 'HEART_GATHERING' && (
              <Scene7HeartGathering
                onGatherComplete={() => handleNextScene('MOON_SEQUENCE')}
              />
            )}
          </motion.div>
        )}

        {/* ROMANTIC MOON SEQUENCE ("Aapko pata h chand kesa dikhta h?") */}
        {currentScene === 'MOON_SEQUENCE' && (
          <SceneMoonSequence
            key="moon-sequence"
            memories={memories}
            onComplete={() => handleNextScene('PROPOSAL')}
            playClick={audio.playPhotoClick}
          />
        )}

        {/* SCENE 8 — PROPOSAL & RING REVELATION */}
        {currentScene === 'PROPOSAL' && (
          <Scene8Proposal
            key="scene8"
            memories={memories}
            playRingBoxOpen={audio.playRingBoxOpen}
            playCelebration={audio.playCelebration}
          />
        )}
      </AnimatePresence>

      {/* Focus Memory Lightbox Modal */}
      <MemoryModal
        selectedMemory={selectedMemory}
        memories={memories}
        onClose={() => setSelectedMemory(null)}
        onSelectMemory={(m) => setSelectedMemory(m)}
        playClick={audio.playPhotoClick}
      />
    </main>
  );
};
