const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

/**
 * Generates a placeholder image for a course
 * @param {string} text - The text to display on the image
 * @param {string} outputPath - The path to save the image to
 * @param {Object} options - Options for the image
 */
function generatePlaceholderImage(text, outputPath, options = {}) {
  const {
    width = 800,
    height = 450,
    backgroundColor = '#1e293b', // Dark blue background
    textColor = '#ffffff',
    accentColor = '#3b82f6', // Blue accent
    fontSize = 40,
    fontFamily = 'Arial'
  } = options;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Add accent elements
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, width, 8); // Top border
  
  // Add pattern
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < width; i += 40) {
    for (let j = 0; j < height; j += 40) {
      ctx.beginPath();
      ctx.arc(i, j, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // Add text
  ctx.fillStyle = textColor;
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Handle multi-line text
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > width - 100) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  // Draw each line
  const lineHeight = fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = (height - totalHeight) / 2;

  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });

  // Add "Learn Everything Academy" text
  ctx.font = `bold 20px ${fontFamily}`;
  ctx.fillText('Learn Everything Academy', width / 2, height - 40);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Generated image at: ${outputPath}`);
}

module.exports = generatePlaceholderImage;
