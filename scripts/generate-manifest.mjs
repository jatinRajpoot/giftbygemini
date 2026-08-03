import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const twinkleDir = path.join(publicDir, 'twinkle');
const outputFile = path.join(publicDir, 'images.json');

const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

try {
  if (!fs.existsSync(twinkleDir)) {
    console.warn(`[manifest] Directory ${twinkleDir} does not exist. Creating empty images.json.`);
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
    process.exit(0);
  }

  const files = fs.readdirSync(twinkleDir);
  const validImages = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return supportedExtensions.has(ext);
    })
    .map(file => `/twinkle/${encodeURIComponent(file)}`);

  fs.writeFileSync(outputFile, JSON.stringify(validImages, null, 2));
  console.log(`[manifest] Successfully indexed ${validImages.length} images into /public/images.json`);
} catch (error) {
  console.error('[manifest] Error generating image manifest:', error);
  process.exit(1);
}
