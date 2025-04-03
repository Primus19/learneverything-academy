'use server'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Base path for course content
const coursesDirectory = path.join(process.cwd(), '../../courses');

// Get all available courses
export async function getAvailableCourses() {
  try {
    const courseDirectories = fs.readdirSync(coursesDirectory);
    
    return courseDirectories.map(dir => {
      // Convert directory name to slug format
      const slug = dir.replace(/_/g, '-');
      
      // Get course outline for metadata
      const outlinePath = path.join(coursesDirectory, dir, 'course_outline.md');
      let title = dir.replace(/_/g, ' ');
      let description = '';
      let level = 'Intermediate';
      let duration = '30+ hours';
      
      if (fs.existsSync(outlinePath)) {
        const fileContents = fs.readFileSync(outlinePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Extract metadata from frontmatter or content
        if (data.title) title = data.title;
        if (data.description) description = data.description;
        if (data.level) level = data.level;
        if (data.duration) duration = data.duration;
        
        // If no description in frontmatter, use first paragraph of content
        if (!description && content) {
          const firstParagraph = content.split('\n\n')[0].replace(/^#.*\n/, '').trim();
          description = firstParagraph;
        }
      }
      
      // Get all chapter files
      const chapterFiles = fs.readdirSync(path.join(coursesDirectory, dir))
        .filter(file => file.startsWith('chapter') && file.endsWith('.md'))
        .sort((a, b) => {
          const aNum = parseInt(a.match(/chapter(\d+)/)?.[1] || '0');
          const bNum = parseInt(b.match(/chapter(\d+)/)?.[1] || '0');
          return aNum - bNum;
        });
      
      const titleFormatted = title.charAt(0).toUpperCase() + title.slice(1);
      
      return {
        slug,
        title: titleFormatted,
        description,
        level,
        duration,
        chaptersCount: chapterFiles.length,
        image: `/images/courses/${slug}.jpg`, // Default image path
      };
    });
  } catch (error) {
    console.error('Error getting available courses:', error);
    return [];
  }
}

// Get a specific course by slug
export async function getCourseBySlug(slug) {
  try {
    // Convert slug to directory name
    const dirName = slug.replace(/-/g, '_');
    const coursePath = path.join(coursesDirectory, dirName);
    
    if (!fs.existsSync(coursePath)) {
      return null;
    }
    
    // Get course outline for metadata
    const outlinePath = path.join(coursePath, 'course_outline.md');
    let title = dirName.replace(/_/g, ' ');
    let description = '';
    let level = 'Intermediate';
    let duration = '30+ hours';
    let instructor = 'Expert Instructor';
    let instructorTitle = 'Senior Engineer';
    
    if (fs.existsSync(outlinePath)) {
      const fileContents = fs.readFileSync(outlinePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Extract metadata from frontmatter or content
      if (data.title) title = data.title;
      if (data.description) description = data.description;
      if (data.level) level = data.level;
      if (data.duration) duration = data.duration;
      if (data.instructor) instructor = data.instructor;
      if (data.instructorTitle) instructorTitle = data.instructorTitle;
      
      // If no description in frontmatter, use first paragraph of content
      if (!description && content) {
        const firstParagraph = content.split('\n\n')[0].replace(/^#.*\n/, '').trim();
        description = firstParagraph;
      }
    }
    
    // Get all chapter files
    const chapterFiles = fs.readdirSync(coursePath)
      .filter(file => file.startsWith('chapter') && file.endsWith('.md'))
      .sort((a, b) => {
        const aNum = parseInt(a.match(/chapter(\d+)/)?.[1] || '0');
        const bNum = parseInt(b.match(/chapter(\d+)/)?.[1] || '0');
        return aNum - bNum;
      });
    
    // Get chapter data
    const chapters = chapterFiles.map(file => {
      const filePath = path.join(coursePath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Extract chapter title from first heading or filename
      let chapterTitle = file.replace(/chapter\d+_|\.md/g, '').replace(/_/g, ' ');
      const titleMatch = content.match(/^# (.*)/m);
      if (titleMatch) {
        chapterTitle = titleMatch[1];
      } else if (data.title) {
        chapterTitle = data.title;
      }
      
      // Extract lessons from headings
      const lessons = [];
      const headingMatches = content.match(/^## (.*)/gm);
      if (headingMatches) {
        headingMatches.forEach(match => {
          lessons.push(match.replace('## ', ''));
        });
      }
      
      const defaultLessons = ['Introduction', 'Core Concepts', 'Practical Examples'];
      
      return {
        file,
        title: chapterTitle,
        lessons: lessons.length > 0 ? lessons : defaultLessons,
      };
    });
    
    const titleFormatted = title.charAt(0).toUpperCase() + title.slice(1);
    
    return {
      slug,
      title: titleFormatted,
      description,
      level,
      duration,
      instructor,
      instructorTitle,
      totalStudents: '1,500+',
      lastUpdated: 'March 2025',
      price: '$199.99',
      image: `/images/courses/${slug}.jpg`,
      chapters,
    };
  } catch (error) {
    console.error(`Error getting course by slug ${slug}:`, error);
    return null;
  }
}

// Get chapter content
export async function getChapterContent(courseSlug, chapterIndex) {
  try {
    // Convert slug to directory name
    const dirName = courseSlug.replace(/-/g, '_');
    const coursePath = path.join(coursesDirectory, dirName);
    
    if (!fs.existsSync(coursePath)) {
      return null;
    }
    
    // Get all chapter files
    const chapterFiles = fs.readdirSync(coursePath)
      .filter(file => file.startsWith('chapter') && file.endsWith('.md'))
      .sort((a, b) => {
        const aNum = parseInt(a.match(/chapter(\d+)/)?.[1] || '0');
        const bNum = parseInt(b.match(/chapter(\d+)/)?.[1] || '0');
        return aNum - bNum;
      });
    
    if (chapterIndex < 0 || chapterIndex >= chapterFiles.length) {
      return null;
    }
    
    const chapterFile = chapterFiles[chapterIndex];
    const filePath = path.join(coursePath, chapterFile);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Extract chapter title from first heading or filename
    let chapterTitle = chapterFile.replace(/chapter\d+_|\.md/g, '').replace(/_/g, ' ');
    const titleMatch = content.match(/^# (.*)/m);
    if (titleMatch) {
      chapterTitle = titleMatch[1];
    } else if (data.title) {
      chapterTitle = data.title;
    }
    
    return {
      title: chapterTitle,
      content,
      nextChapter: chapterIndex < chapterFiles.length - 1 ? chapterIndex + 1 : null,
      prevChapter: chapterIndex > 0 ? chapterIndex - 1 : null,
    };
  } catch (error) {
    console.error(`Error getting chapter content for ${courseSlug}, chapter ${chapterIndex}:`, error);
    return null;
  }
}
