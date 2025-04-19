import { getCourseById, getChapterContent, getAllCourses } from "@/src/lib/course-loader";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from '@/components/ui/card'

interface ChapterPageProps {
  params: {
    id: string;
    chapter: string;
  };
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  const params = [];

  for (const course of courses) {
    for (const chapter of course.chapters) {
      params.push({
        id: course.id,
        chapter: chapter.slug,
      });
    }
  }

  return params;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const course = getCourseById(params.id);
  
  if (!course) {
    notFound();
  }

  const chapterContent = await getChapterContent(params.id, params.chapter);

  if (!chapterContent) {
    notFound();
  }

  return (
    <div className="container py-8 relative z-10">
      <Link href={`/courses/${params.id}`} className="text-sm text-primary hover:underline">
        &larr; Back to Course
      </Link>
      <Card className="mt-4 bg-card/80 backdrop-blur-md border border-primary/20">
        <CardContent>
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: chapterContent }} />
          </article>
        </CardContent>
      </Card>
    </div>
  );
}