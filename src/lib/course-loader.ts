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
  const fullPath = path.join(process.cwd(), 'courses', courseId, `${chapterSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
    
  return processedContent.toString();
}

export function getAllCourses(): Course[] {
  const coursesDirectory = path.join(process.cwd(), 'courses');
  const coursesFolders = fs.readdirSync(coursesDirectory)
    .filter(folder => {
      // Only include folders that have a config.json file
      const configPath = path.join(coursesDirectory, folder, 'config.json');
      return fs.existsSync(configPath);
    });

  const dynamicCourses = coursesFolders.map(courseFolder => {
    const configPath = path.join(coursesDirectory, courseFolder, 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Get all chapter files
    const chaptersPath = path.join(coursesDirectory, courseFolder);
    const chapterFiles = fs.readdirSync(chaptersPath)
      .filter(file => file.endsWith('.md'));

    const chapters = chapterFiles.map(file => {
      const fullPath = path.join(chaptersPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        title: data.title,
        slug: file.replace('.md', ''),
        order: data.order,
        content: '', // Content will be loaded on demand
      };
    }).sort((a, b) => a.order - b.order);

    // Add default values for required properties if not present in config
    const courseData: Course = {
      id: courseFolder,
      ...config,
      topics: config.topics || [],
      curriculum: config.curriculum || { weeks: [] },
      requirements: config.requirements || [],
      objectives: config.objectives || [],
      features: config.features || [],
      chapters,
    };

    return courseData;
  });

  // Combine static and dynamic courses
  return [...staticCourses, ...dynamicCourses];
}

export function getCourseById(courseId: string): Course | undefined {
  const courses = getAllCourses();
  return courses.find(course => course.id === courseId);
}