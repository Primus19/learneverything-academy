import { Metadata } from 'next';
import { getChapters } from '@/lib/markdown/loader';
import CourseHeader from '@/components/course/CourseHeader';
import ChapterList from '@/components/course/ChapterList';

export const metadata: Metadata = {
  title: 'Data Engineering Course - LearnEverything Academy',
  description: 'Learn about data engineering fundamentals, data integration, ETL processes, data pipelines, and data architecture.',
};

export default async function DataEngineeringCoursePage() {
  const chapters = await getChapters('data_engineering');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader 
        title="Data Engineering"
        description="Master data engineering concepts and techniques for building robust data pipelines and architectures."
        imageUrl="/images/courses/data-engineering-course.jpg"
      />
      <ChapterList chapters={chapters} courseSlug="data-engineering" />
    </div>
  );
}
