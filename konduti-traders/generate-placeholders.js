const fs = require('fs');
const path = require('path');

// Simple function to create a basic JPG placeholder using canvas
// For a simpler approach, we'll use a tiny 1x1 base64 placeholder and scale it

const productImages = [
  { name: 'dry-red-chilli', color: '#8B0000' },
  { name: 'turmeric', color: '#FFD700' },
  { name: 'cumin', color: '#8B7355' },
  { name: 'coriander', color: '#D2B48C' },
  { name: 'black-pepper', color: '#2F4F4F' },
  { name: 'cardamom', color: '#6B4423' },
  { name: 'maize', color: '#FFD700' },
  { name: 'rice', color: '#F5DEB3' },
  { name: 'wheat', color: '#D2B48C' },
  { name: 'millets', color: '#CD853F' },
  { name: 'tur-dal', color: '#FF6347' },
  { name: 'chana-dal', color: '#FFD700' },
  { name: 'peanuts', color: '#8B4513' },
  { name: 'cashew-nuts', color: '#DEB887' },
  { name: 'sesame-seeds', color: '#D2B48C' },
  { name: 'sunflower-seeds', color: '#FFD700' },
  { name: 'chia-seeds', color: '#2F4F4F' },
  { name: 'basil-seeds', color: '#2F4F4F' },
  { name: 'seasonal-fruits', color: '#FF69B4' },
  { name: 'imported-fruits', color: '#FF6347' },
  { name: 'fresh-vegetables', color: '#228B22' },
  { name: 'coffee', color: '#6F4E37' },
  { name: 'tea-leaves', color: '#8B4513' },
  { name: 'herbal-infusions', color: '#90EE90' },
  { name: 'dehydrated-onion', color: '#DAA520' },
  { name: 'dehydrated-garlic', color: '#CD853F' },
  { name: 'dehydrated-fruits', color: '#FF8C00' },
];

// Create a simple canvas-based placeholder using Node.js canvas module
// If canvas is not available, we'll create SVG-based images instead

try {
  const { createCanvas } = require('canvas');

  const outputDir = path.join(__dirname, 'public/images/products');

  productImages.forEach(({ name, color }) => {
    const canvas = createCanvas(600, 400);
    const ctx = canvas.getContext('2d');

    // Fill background with color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 600, 400);

    // Add text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name.replace(/-/g, ' ').toUpperCase(), 300, 200);

    // Save as JPG
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(outputDir, `${name}.jpg`), buffer);
    console.log(`Created ${name}.jpg`);
  });

  console.log('✓ All placeholder images created successfully');
} catch (error) {
  console.error('Canvas module not available, creating SVG-based placeholders instead');

  // Fallback: Create SVG files and note that they need conversion
  const outputDir = path.join(__dirname, 'public/images/products');

  productImages.forEach(({ name, color }) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
      <rect width="600" height="400" fill="${color}"/>
      <text x="300" y="200" text-anchor="middle" dy=".3em" font-size="32" font-weight="bold" fill="white" font-family="Arial">
        ${name.replace(/-/g, ' ').toUpperCase()}
      </text>
    </svg>`;

    fs.writeFileSync(path.join(outputDir, `${name}.svg`), svg);
    console.log(`Created ${name}.svg (convert to JPG manually or use online converter)`);
  });
}
