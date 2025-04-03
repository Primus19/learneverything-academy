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

export function getAllCourses(): Course[] {
  try {
    const coursesDirectory = path.join(process.cwd(), 'courses');
    const coursesFolders = fs.readdirSync(coursesDirectory)
      .filter(folder => {
        try {
          const configPath = path.join(coursesDirectory, folder, 'config.json');
          return fs.existsSync(configPath);
        } catch (error) {
          console.error(`Error checking config for folder ${folder}: ${error}`);
          return false;
        }
      });

    const dynamicCourses = coursesFolders.map(courseFolder => {
      try {
        const configPath = path.join(coursesDirectory, courseFolder, 'config.json');
        const configContent = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(configContent);

        const chaptersPath = path.join(coursesDirectory, courseFolder);
        const chapterFiles = fs.readdirSync(chaptersPath)
          .filter(file => file.endsWith('.md'));

        const chapters = chapterFiles.map(file => {
          try {
            const fullPath = path.join(chaptersPath, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            
            return {
              title: data.title || '',
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
      } catch (error) {
        console.error(`Error loading course ${courseFolder}: ${error}`);
        return null;
      }
    }).filter((course): course is Course => course !== null);

    return [...staticCourses, ...dynamicCourses];
  } catch (error) {
    console.error(`Error loading courses: ${error}`);
    return staticCourses;
  }
}

export function getCourseById(courseId: string): Course | undefined {
  try {
    const courses = getAllCourses();
    return courses.find(course => course.id === courseId);
  } catch (error) {
    console.error(`Error getting course by ID ${courseId}: ${error}`);
    return undefined;
  }
}