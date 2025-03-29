import { Metadata } from 'next';
import { getChapters } from '@/lib/markdown/loader';
import CourseHeader from '@/components/course/CourseHeader';
import ChapterList from '@/components/course/ChapterList';

export const metadata: Metadata = {
  title: 'Data Analytics Course - LearnEverything Academy',
  description: 'Learn about data analytics fundamentals, data collection, exploratory analysis, statistical methods, and data visualization.',
};

export default async function DataAnalyticsCoursePage() {
  const chapters = await getChapters('data_analytics');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader 
        title="Data Analytics"
        description="Master the fundamentals of data analytics, from data collection and preparation to advanced visualization and applied projects."
        imageUrl="/images/courses/data-analytics-course.jpg"
      />
      <ChapterList chapters={chapters} courseSlug="data-analytics" />
    </div>
  );
}
