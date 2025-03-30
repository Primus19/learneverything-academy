import { Metadata } from 'next';
import { getChapter, getChapters } from '@/lib/markdown/loader';
import ChapterNavigation from '@/components/course/ChapterNavigation';
import ChapterContent from '@/components/course/ChapterContent';

export const metadata: Metadata = {
  title: 'Big Data Course Chapter - LearnEverything Academy',
  description: 'Big Data course chapter content',
};

export default async function ChapterPage({ params }: { params: { chapterIndex: string } }) {
  const chapterIndex = parseInt(params.chapterIndex);
  const chapter = await getChapter('big_data', chapterIndex);
  const chapters = await getChapters('big_data');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ChapterContent chapter={chapter} />
      <ChapterNavigation 
        currentIndex={chapterIndex} 
        chapters={chapters} 
        courseSlug="big-data" 
      />
    </div>
  );
}
