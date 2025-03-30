import React from 'react';
import { Metadata } from 'next';
import { getChapters } from "../../../../../lib/markdown/loader";
import Link from 'next/link';
import { Button } from "../../../../../components/ui/button";
import Card from "../../../../../components/ui/card-direct/Card"
import CardContent from "../../../../../components/ui/card-direct/CardContent"
import CardDescription from "../../../../../components/ui/card-direct/CardDescription"
import CardHeader from "../../../../../components/ui/card-direct/CardHeader"
import CardTitle from "../../../../../components/ui/card-direct/CardTitle";
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Chapters | LearnEverything Academy',
  description: 'Learn about Data Engineering concepts and practices',
};

export default async function ChapterPage({ params } }) {
  const chapters = await getChapters('data_engineering');
  const chapterIndex = parseInt(params.chapterIndex);
  const chapter = chapters[chapterIndex];

  if (!chapter) {
    return Chapter not found</div>;
  }

  const nextChapterIndex = chapterIndex + 1;
  const prevChapterIndex = chapterIndex - 1;
  const hasNextChapter = nextChapterIndex < chapters.length;
  const hasPrevChapter = prevChapterIndex >= 0;

  return (
    <div className="container mx-auto py-8 px-4 md-6">
      <div className="mb-8">
        <Link href="/courses/data-engineering" className="text-primary hover">
          ← Back to Data Engineering Course
        </Link>
      </div>

      <div className="prose prose-invert max-w-none">
        {chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html.content }} />
      </div>

      <div className="mt-12 flex flex-col sm-row gap-4 justify-between">
        {hasPrevChapter ? (
          <Button variant="outline" asChild>
            <Link href={`/courses/data-engineering/chapters/${prevChapterIndex}`}>
              ← Previous Chapter
            </Link>
          </Button>
        ) : (
          </div>
        )}
        {hasNextChapter ? (
          
            <Link href={`/courses/data-engineering/chapters/${nextChapterIndex}`}>
              Next Chapter →
            </Link>
          </Button>
        ) : (
          
            <Link href="/courses/data-engineering">
              Complete Course
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
