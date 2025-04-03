// Modified course-loader.ts to ensure courses are properly loaded in production environment
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { courses as staticCourses } from '../courses/data';

export interface Chapter {
  title: string;
  content: string;
  slug: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  instructor: {
    name: string;
    bio: string;
    avatar: string;
  };
  curriculum: {
    weeks: {
      title: string;
      topics: string[];
      description: string;
    }[];
  };
  requirements: string[];
  objectives: string[];
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  chapters: Chapter[];
}

export async function getChapterContent(courseId: string, chapterSlug: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), 'courses', courseId, `${chapterSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(content);
      
    return processedContent.toString();
  } catch (error) {
    console.error(`Error reading chapter content: ${error}`);
    return '';
  }
}

// This function is used to get all available course directories
function getCourseDirectories(): string[] {
  try {
    const coursesDirectory = path.join(process.cwd(), 'courses');
    return fs.readdirSync(coursesDirectory)
      .filter(folder => {
        try {
          // Check if the folder contains any markdown files instead of requiring config.json
          const folderPath = path.join(coursesDirectory, folder);
          const files = fs.readdirSync(folderPath);
          return files.some(file => file.endsWith('.md'));
        } catch (error) {
          console.error(`Error checking folder ${folder}: ${error}`);
          return false;
        }
      });
  } catch (error) {
    console.error(`Error reading course directories: ${error}`);
    return [];
  }
}

// This function loads a single course by its directory name
function loadCourse(courseFolder: string): Course | null {
  try {
    const coursesDirectory = path.join(process.cwd(), 'courses');
    const chaptersPath = path.join(coursesDirectory, courseFolder);
    const chapterFiles = fs.readdirSync(chaptersPath)
      .filter(file => file.endsWith('.md'));

    if (chapterFiles.length === 0) {
      console.error(`No markdown files found in ${courseFolder}`);
      return null;
    }

    // Extract course title from folder name
    const courseTitle = courseFolder
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .replace(/_/g, ' ');

    // Process all chapter files
    const chapters = chapterFiles.map(file => {
      try {
        const fullPath = path.join(chaptersPath, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          title: data.title || file.replace('.md', '').replace(/_/g, ' '),
          slug: file.replace('.md', ''),
          order: data.order || 0,
          content: content || '',
        };
      } catch (error) {
        console.error(`Error processing chapter file ${file}: ${error}`);
        return null;
      }
    })
    .filter((chapter): chapter is Chapter => chapter !== null)
    .sort((a, b) => a.order - b.order);

    // Generate course description from first chapter content
    let description = '';
    if (chapters.length > 0 && chapters[0].content) {
      // Extract first paragraph after heading
      const contentLines = chapters[0].content.split('\n');
      for (let i = 0; i < contentLines.length; i++) {
        if (contentLines[i].trim() && !contentLines[i].startsWith('#')) {
          description = contentLines[i].trim();
          break;
        }
      }
      
      // Limit description length
      if (description.length > 150) {
        description = description.substring(0, 147) + '...';
      }
    }

    // Generate topics from chapter titles
    const topics = chapters.map(chapter => chapter.title);

    // Generate curriculum weeks from chapters
    const weeks = chapters.map(chapter => ({
      title: chapter.title,
      topics: [chapter.title],
      description: `Learn about ${chapter.title.toLowerCase()}.`
    }));

    // Create course data with generated metadata
    const courseData: Course = {
      id: courseFolder,
      title: courseTitle,
      description: description || `Learn about ${courseTitle}`,
      image: `https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60`,
      price: 99.99,
      duration: `${chapters.length * 2} weeks`,
      level: "Intermediate",
      topics: topics,
      instructor: {
        name: "John Doe",
        bio: "Expert instructor with years of experience in the field",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
      },
      curriculum: {
        weeks: weeks
      },
      requirements: [
        "Basic understanding of computers",
        "Willingness to learn",
        "Dedication to practice"
      ],
      objectives: [
        "Master the fundamentals",
        "Build real-world projects",
        "Develop professional skills"
      ],
      features: [
        {
          icon: "video",
          title: "HD Video Content",
          description: "Access high-quality video lectures"
        },
        {
          icon: "code",
          title: "Practical Projects",
          description: "Build real-world projects"
        },
        {
          icon: "message-circle",
          title: "Community Support",
          description: "Get help from peers and instructors"
        }
      ],
      chapters,
    };

    return courseData;
  } catch (error) {
    console.error(`Error loading course ${courseFolder}: ${error}`);
    return null;
  }
}

export function getAllCourses(): Course[] {
  try {
    // Get all course directories
    const coursesFolders = getCourseDirectories();
    
    // Load each course
    const dynamicCourses = coursesFolders
      .map(folder => loadCourse(folder))
      .filter((course): course is Course => course !== null);
    
    // Return only dynamic courses, ignoring static courses
    if (dynamicCourses.length > 0) {
      return dynamicCourses;
    } else {
      // If no dynamic courses were loaded, log the error and return static courses as fallback
      console.error('No dynamic courses were loaded. Falling back to static courses only.');
      return staticCourses;
    }
  } catch (error) {
    console.error(`Error loading courses: ${error}`);
    return staticCourses;
  }
}

export function getCourseById(courseId: string): Course | undefined {
  try {
    // Try to load it dynamically first
    const course = loadCourse(courseId);
    if (course) {
      return course;
    }
    
    // If not found dynamically, check static courses as fallback
    const staticCourse = staticCourses.find(course => course.id === courseId);
    return staticCourse;
  } catch (error) {
    console.error(`Error getting course by ID ${courseId}: ${error}`);
    return undefined;
  }
}
