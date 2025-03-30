import React from 'react';
import { Metadata } from 'next';
import { getChapters } from "../../../../../lib/markdown/loader.jsx";
import Link from "next/link.jsx";
import { Button } from "../../../../../components/ui/button.jsx";
import Card from "../../../../../components/ui/card-direct/Card.jsx"
import CardContent from "../../../../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../../../../components/ui/card-direct/CardDescription.jsx"
import CardHeader from "../../../../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../../../../components/ui/card-direct/CardTitle.jsx";
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Chapters | LearnEverything Academy',
  description: 'Learn about Ethical Hacking concepts and techniques',
};

export default async function ChapterPage({ params } }) {
  const chapters = await getChapters('ethical_hacking');
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
        <Link href="/courses/ethical-hacking" className="text-primary hover">
          ← Back to Ethical Hacking Course
        </Link>
      </div>

      <div className="prose prose-invert max-w-none">
        {chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html.content }} />
      </div>

      <div className="mt-12 flex flex-col sm-row gap-4 justify-between">
        {hasPrevChapter ? (
          <Button variant="outline" asChild>
            <Link href={`/courses/ethical-hacking/chapters/${prevChapterIndex}`}>
              ← Previous Chapter
            </Link>
          </Button>
        ) : (
          </div>
        )}
        {hasNextChapter ? (
          
            <Link href={`/courses/ethical-hacking/chapters/${nextChapterIndex}`}>
              Next Chapter →
            </Link>
          </Button>
        ) : (
          
            <Link href="/courses/ethical-hacking">
              Complete Course
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
