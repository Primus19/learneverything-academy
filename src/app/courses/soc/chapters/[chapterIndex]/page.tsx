import React from 'react';
import { Metadata } from 'next';
import { getChapters } from "../../../../../lib/markdown/loader";
import Link from 'next/link';
import { Button } from "../../../../../components/ui/button";
import Card from "../../../../../components/ui/card-direct/Card.jsx"
import CardContent from "../../../../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../../../../components/ui/card-direct/CardDescription.jsx"
import CardHeader from "../../../../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../../../../components/ui/card-direct/CardTitle.jsx";
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chapters | LearnEverything Academy',
  description: 'Learn about Security Operations Center (SOC) concepts and practices',
};

export default async function ChapterPage({ params }: { params: { chapterIndex: string } }) {
  const chapters = await getChapters('soc');
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
        <Link href="/courses/soc" className="text-primary hover:underline">
          ← Back to SOC Course
        </Link>
      </div>

      <div className="prose prose-invert max-w-none">
        <h1>{chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
        {hasPrevChapter ? (
          <Button variant="outline" asChild>
            <Link href={`/courses/soc/chapters/${prevChapterIndex}`}>
              ← Previous Chapter
            </Link>
          </Button>
        ) : (
          <div></div>
        )}
        {hasNextChapter ? (
          <Button asChild>
            <Link href={`/courses/soc/chapters/${nextChapterIndex}`}>
              Next Chapter →
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/courses/soc">
              Complete Course
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
