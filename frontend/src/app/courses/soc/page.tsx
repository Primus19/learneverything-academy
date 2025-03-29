import { Metadata } from 'next';
import { getChapters } from '@/lib/markdown/loader';
import CourseHeader from '@/components/course/CourseHeader';
import ChapterList from '@/components/course/ChapterList';

export const metadata: Metadata = {
  title: 'SOC Course - LearnEverything Academy',
  description: 'Learn about Security Operations Center (SOC) fundamentals, monitoring, threat detection, incident response, and automation.',
};

export default async function SOCCoursePage() {
  const chapters = await getChapters('soc');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader 
        title="Security Operations Center (SOC)"
        description="Master the fundamentals of security operations, threat detection, incident response, and SOC automation."
        imageUrl="/images/courses/soc-course.jpg"
      />
      <ChapterList chapters={chapters} courseSlug="soc" />
    </div>
  );
}
