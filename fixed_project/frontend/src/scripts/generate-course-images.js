const generatePlaceholderImage = require('../lib/generatePlaceholderImage');
const path = require('path');
const fs = require('fs');

// Course data
const courses = [
  {
    slug: 'cloud-engineering',
    title: 'AWS Cloud Engineering Professional',
    color: '#3b82f6' // Blue
  },
  {
    slug: 'devops',
    title: 'DevOps Engineering Masterclass',
    color: '#10b981' // Green
  }
];

// Generate images for each course
courses.forEach(course => {
  const outputPath = path.join(__dirname, '../../public/images/courses', `${course.slug}.jpg`);
  
  generatePlaceholderImage(course.title, outputPath, {
    backgroundColor: '#1e293b',
    accentColor: course.color
  });
});

console.log('All course images generated successfully!');
