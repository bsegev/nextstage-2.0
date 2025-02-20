const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateFavicons() {
  const inputPath = path.join(process.cwd(), 'public', 'favicon.jpg');
  const outputDir = path.join(process.cwd(), 'public');

  // Create a circular mask buffer for each size
  async function createCircularMask(size) {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    
    // Create a new buffer filled with black (fully transparent when used as mask)
    const mask = Buffer.alloc(size * size);
    
    // Fill the buffer with a white circle (opaque when used as mask)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If the pixel is within the circle radius, make it white (opaque)
        mask[y * size + x] = distance <= radius ? 255 : 0;
      }
    }
    
    return mask;
  }

  // Quality settings
  const sharpOptions = {
    fit: 'cover',
    position: 'center',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    kernel: sharp.kernel.lanczos3
  };

  // Generate favicon-16x16.png with circular mask
  const mask16 = await createCircularMask(16);
  await sharp(inputPath)
    .resize(16, 16, sharpOptions)
    .composite([{
      input: mask16,
      raw: { width: 16, height: 16, channels: 1 },
      tile: false,
      operation: 'dest-in'
    }])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'favicon-16x16.png'));

  // Generate favicon-32x32.png with circular mask
  const mask32 = await createCircularMask(32);
  await sharp(inputPath)
    .resize(32, 32, sharpOptions)
    .composite([{
      input: mask32,
      raw: { width: 32, height: 32, channels: 1 },
      operation: 'dest-in'
    }])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'favicon-32x32.png'));

  // Generate apple-touch-icon.png with circular mask
  const mask180 = await createCircularMask(180);
  await sharp(inputPath)
    .resize(180, 180, sharpOptions)
    .composite([{
      input: mask180,
      raw: { width: 180, height: 180, channels: 1 },
      operation: 'dest-in'
    }])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));

  // For favicon.ico, use the 32x32 circular version
  fs.copyFileSync(
    path.join(outputDir, 'favicon-32x32.png'),
    path.join(outputDir, 'favicon.ico')
  );

  // Verify files were created
  const files = ['favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png', 'favicon.ico'];
  files.forEach(file => {
    const filePath = path.join(outputDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`✓ ${file} generated (${stats.size} bytes)`);
    } else {
      console.error(`✗ Failed to generate ${file}`);
    }
  });
}

generateFavicons().catch(console.error); 