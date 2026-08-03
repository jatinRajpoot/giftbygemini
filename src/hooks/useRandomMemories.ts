import { useEffect, useState } from 'react';
import { MemoryImage } from '../types/proposal';

/**
 * Calculates (x, y) coordinates for a heart shape parametric curve.
 * Parametric equations for a heart:
 * x = 16 * sin^3(t)
 * y = 13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t)
 */
function getHeartPosition(index: number, total: number) {
  const t = (index / total) * Math.PI * 2;
  const rawX = 16 * Math.pow(Math.sin(t), 3);
  const rawY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  
  // Normalize scale to fit nicely on screen
  const scaleFactor = 18; // percentage spacing
  return {
    x: rawX * scaleFactor,
    y: rawY * scaleFactor,
    z: (Math.random() - 0.5) * 40,
  };
}

export function useRandomMemories() {
  const [memories, setMemories] = useState<MemoryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadManifest() {
      try {
        const res = await fetch('/images.json');
        if (!res.ok) throw new Error('Failed to load image manifest');
        const allImages: string[] = await res.json();

        if (allImages.length === 0) {
          setMemories([]);
          setLoading(false);
          return;
        }

        // Shuffle all images using Fisher-Yates
        const shuffled = [...allImages];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Pick 40 to 60 images (or max available)
        const targetCount = Math.min(
          shuffled.length,
          Math.floor(Math.random() * 21) + 40 // 40..60
        );
        const selectedUrls = shuffled.slice(0, targetCount);

        // Generate 3D initial scatter + heart target positions
        const memoryItems: MemoryImage[] = selectedUrls.map((url, idx) => {
          const heartPos = getHeartPosition(idx, selectedUrls.length);
          const decodedUrl = decodeURIComponent(url);

          return {
            id: `mem-${idx}-${Math.random().toString(36).substr(2, 9)}`,
            url,
            decodedUrl,
            aspectRatio: 1 + (Math.random() * 0.4 - 0.2), // ~1.0 - 1.2
            // 3D Organic Scatter Coordinates
            initialX: (Math.random() - 0.5) * 85, // -42.5% to +42.5% viewport
            initialY: (Math.random() - 0.5) * 85,
            initialZ: (Math.random() - 0.5) * 450 - 50, // -500 to 200 depth
            rotationX: (Math.random() - 0.5) * 24,
            rotationY: (Math.random() - 0.5) * 24,
            rotationZ: (Math.random() - 0.5) * 16,
            scale: 0.85 + Math.random() * 0.35,
            heartX: heartPos.x,
            heartY: heartPos.y,
            heartZ: heartPos.z,
          };
        });

        setMemories(memoryItems);
      } catch (err) {
        console.error('Error in useRandomMemories:', err);
      } finally {
        setLoading(false);
      }
    }

    loadManifest();
  }, []);

  return { memories, loading };
}
