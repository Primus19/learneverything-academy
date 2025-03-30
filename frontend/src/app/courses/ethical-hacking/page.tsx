import { Metadata } from 'next';
import { getChapters } from '@/lib/markdown/loader';
import CourseHeader from '@/components/course/CourseHeader';
import ChapterList from '@/components/course/ChapterList';

export const metadata: Metadata = {
  title: 'Ethical Hacking Course - LearnEverything Academy',
  description: 'Learn about ethical hacking fundamentals, penetration testing, web application security, mobile security, and cloud security testing.',
};

export default async function EthicalHackingCoursePage() {
  const chapters = await getChapters('ethical_hacking');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader 
        title="Ethical Hacking"
        description="Master ethical hacking and penetration testing techniques to identify and remediate security vulnerabilities across various platforms."
        imageUrl="/images/courses/ethical-hacking-course.jpg"
      />
      <ChapterList chapters={chapters} courseSlug="ethical-hacking" />
    </div>
  );
}
