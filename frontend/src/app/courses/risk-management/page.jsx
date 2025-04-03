import { Metadata } from 'next';
import { getChapters } from '@/lib/markdown/loader';
import CourseHeader from '@/components/course/CourseHeader';
import ChapterList from '@/components/course/ChapterList';

export const metadata: Metadata = {
  title: 'Risk Management Course - LearnEverything Academy',
  description: 'Learn about risk management fundamentals, risk assessment, mitigation strategies, and enterprise risk management frameworks.',
};

export default async function RiskManagementCoursePage() {
  const chapters = await getChapters('risk_management');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader 
        title="Risk Management"
        description="Master the fundamentals of risk management, assessment methodologies, mitigation strategies, and enterprise risk frameworks."
        imageUrl="/images/courses/risk-management-course.jpg"
      />
      <ChapterList chapters={chapters} courseSlug="risk-management" />
    </div>
  );
}
