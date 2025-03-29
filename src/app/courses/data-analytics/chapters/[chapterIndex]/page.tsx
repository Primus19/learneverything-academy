import React from 'react';
import { Metadata } from 'next';
import { getChapters } from '@/lib/markdown/loader';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chapters | LearnEverything Academy',
  description: 'Learn about Data Analytics concepts and practices',
};

export default async function ChapterPage({ params }: { params: { chapterIndex: string } }) {
  const chapters = await getChapters('data_analytics');
  const chapterIndex = parseInt(params.chapterIndex);
  const chapter = chapters[chapterIndex];

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  const nextChapterIndex = chapterIndex + 1;
  const prevChapterIndex = chapterIndex - 1;
  const hasNextChapter = nextChapterIndex < chapters.length;
  const hasPrevChapter = prevChapterIndex >= 0;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <Link href="/courses/data-analytics" className="text-primary hover:underline">
          ← Back to Data Analytics Course
        </Link>
      </div>

      <div className="prose prose-invert max-w-none">
        <h1>{chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
        {hasPrevChapter ? (
          <Button variant="outline" asChild>
            <Link href={`/courses/data-analytics/chapters/${prevChapterIndex}`}>
              ← Previous Chapter
            </Link>
          </Button>
        ) : (
          <div></div>
        )}
        {hasNextChapter ? (
          <Button asChild>
            <Link href={`/courses/data-analytics/chapters/${nextChapterIndex}`}>
              Next Chapter →
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/courses/data-analytics">
              Complete Course
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
