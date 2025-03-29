import { Metadata } from 'next';
import { getChapters } from '@/lib/markdown/loader';
import CourseHeader from '@/components/course/CourseHeader';
import ChapterList from '@/components/course/ChapterList';

export const metadata: Metadata = {
  title: 'Big Data Course - LearnEverything Academy',
  description: 'Learn about big data fundamentals, Hadoop ecosystem, Apache Spark, NoSQL databases, and machine learning for big data.',
};

export default async function BigDataCoursePage() {
  const chapters = await getChapters('big_data');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader 
        title="Big Data"
        description="Master big data technologies, from Hadoop and Spark to data warehousing and machine learning applications."
        imageUrl="/images/courses/big-data-course.jpg"
      />
      <ChapterList chapters={chapters} courseSlug="big-data" />
    </div>
  );
}
