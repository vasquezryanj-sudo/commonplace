// Generates favicon PNGs for public/ directory
// Run once: node generate-icons.js

import sharp from 'sharp';
import { mkdirSync } from 'fs';

const BG = '#2F5D50';
const FG = '#F3DD8A';

// SVG for a given size. roundedCorners=false for apple-touch-icon (iOS masks it).
function makeSVG(size, roundedCorners = true) {
  const rx = roundedCorners ? Math.round(size * 0.18) : 0;
  const fontSize = Math.round(size * 0.58);
  // Position: center horizontally, slightly above vertical center for visual balance
  const cy = Math.round(size * 0.70);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${rx}" ry="${rx}" fill="${BG}"/>
  <text
    x="${size / 2}"
    y="${cy}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}"
    fill="${FG}"
    text-anchor="middle"
    dominant-baseline="auto">\u201C</text>
</svg>`;
}

mkdirSync('./public', { recursive: true });

const icons = [
  // apple-touch-icon: 180×180, no rounded corners (iOS applies its own mask)
  { file: 'apple-touch-icon.png', size: 180, rounded: false },
  // PWA / Android home screen
  { file: 'icon-192.png', size: 192, rounded: true },
  { file: 'icon-512.png', size: 512, rounded: true },
  // Fallback PNG favicon (used by some browsers that prefer PNG over SVG)
  { file: 'favicon-32.png', size: 32, rounded: true },
];

for (const { file, size, rounded } of icons) {
  const svg = makeSVG(size, rounded);
  await sharp(Buffer.from(svg)).png().toFile(`./public/${file}`);
  console.log(`  ✓ public/${file} (${size}×${size})`);
}

console.log('\nDone. All icons written to public/');
