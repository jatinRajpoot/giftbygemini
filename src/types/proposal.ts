export type Scene = 
  | 'DARKNESS'            // Scene 1: Faint beating heart in pure dark
  | 'TRANSFORMATION'      // Scene 2: Heart transforms into floating folder
  | 'FOLDER'              // Scene 3: Floating 3D folder interaction
  | 'MEMORIES_ERUPT'      // Scene 4: 40-60 random photos erupt from folder
  | 'INTERACTIVE_CLOUD'   // Scene 5 & 6: Explore floating memory cloud & romantic text
  | 'HEART_GATHERING'     // Scene 7: Photos gather into glowing heart shape
  | 'MOON_SEQUENCE'       // New Scene: "Aapko pata h chand kesa dikhta h?" romantic moon interaction
  | 'PROPOSAL';           // Scene 8: 3D ring box & "Will you marry me?"

export interface MemoryImage {
  id: string;
  url: string;
  decodedUrl: string;
  aspectRatio: number;
  initialX: number; // percentage (-50 to 50)
  initialY: number; // percentage (-50 to 50)
  initialZ: number; // depth (-500 to 200)
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  heartX?: number; // target position when forming heart
  heartY?: number;
  heartZ?: number;
}

export interface SoundEffects {
  playHeartbeat: () => void;
  playFolderOpen: () => void;
  playPhotoScatter: () => void;
  playPhotoHover: () => void;
  playPhotoClick: () => void;
  playRingBoxOpen: () => void;
  playCelebration: () => void;
  toggleMusic: () => void;
  isMuted: boolean;
}
