'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { SoundEffects } from '../types/proposal';

export function useAudioController(): SoundEffects {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicOscRef = useRef<OscillatorNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const isPlayingMusicRef = useRef(false);

  // Initialize Web Audio Context lazily on user gesture
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Ambient Romantic Musical Chords synthesis using Web Audio API
  const startAmbientMusic = useCallback(() => {
    if (isPlayingMusicRef.current || isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      isPlayingMusicRef.current = true;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      musicGainRef.current = masterGain;

      // Romantic Ambient Chord Progression (C major 7, Am9, Fmaj7, G6)
      const chordFrequencies = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 261.63, 329.63, 440.00], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G6
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!isPlayingMusicRef.current || isMuted || !audioCtxRef.current) return;
        const currentChord = chordFrequencies[chordIndex % chordFrequencies.length];
        chordIndex++;

        currentChord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Soft attack and slow decay
          noteGain.gain.setValueAtTime(0, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2.0);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 6.5);

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 7.0);
        });
      };

      playChord();
      const interval = setInterval(playChord, 6000);

      return () => {
        clearInterval(interval);
      };
    } catch (e) {
      console.warn('Audio synthesis error:', e);
    }
  }, [getAudioContext, isMuted]);

  // Sound Effects Synthesis
  const playHeartbeat = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignore audio context errors before user interaction
    }
  }, [getAudioContext, isMuted]);

  const playFolderOpen = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);

      startAmbientMusic();
    } catch {
      // Ignore
    }
  }, [getAudioContext, isMuted, startAmbientMusic]);

  const playPhotoScatter = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Rapid series of 12 soft card fluttering / photo scattering pops & swooshes
      const burstCount = 14;
      for (let i = 0; i < burstCount; i++) {
        const delay = i * 0.08 + Math.random() * 0.04;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Alternating soft sine/triangle swoosh pitches
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        const startFreq = 220 + Math.random() * 600;
        const endFreq = startFreq + (Math.random() - 0.5) * 300;

        osc.frequency.setValueAtTime(startFreq, ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(Math.max(60, endFreq), ctx.currentTime + delay + 0.12);

        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.12);
      }
    } catch {
      // Ignore
    }
  }, [getAudioContext, isMuted]);

  const playPhotoHover = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Ignore
    }
  }, [getAudioContext, isMuted]);

  const playPhotoClick = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5 note

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Ignore
    }
  }, [getAudioContext, isMuted]);

  const playRingBoxOpen = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Magical chime arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 1.2);
      });
    } catch {
      // Ignore
    }
  }, [getAudioContext, isMuted]);

  const playCelebration = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Orchestral celebratory fan-fare pitch sequence
      const fanfare = [
        { freq: 523.25, time: 0 },
        { freq: 659.25, time: 0.15 },
        { freq: 783.99, time: 0.3 },
        { freq: 1046.50, time: 0.45 },
        { freq: 1318.51, time: 0.7 },
      ];

      fanfare.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.freq, ctx.currentTime + item.time);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + item.time);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + item.time + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + item.time);
        osc.stop(ctx.currentTime + item.time + 1.5);
      });
    } catch {
      // Ignore
    }
  }, [getAudioContext, isMuted]);

  const toggleMusic = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next && musicGainRef.current && audioCtxRef.current) {
        musicGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      } else if (!next && musicGainRef.current && audioCtxRef.current) {
        musicGainRef.current.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
      }
      return next;
    });
  }, []);

  return {
    playHeartbeat,
    playFolderOpen,
    playPhotoScatter,
    playPhotoHover,
    playPhotoClick,
    playRingBoxOpen,
    playCelebration,
    toggleMusic,
    isMuted,
  };
}
