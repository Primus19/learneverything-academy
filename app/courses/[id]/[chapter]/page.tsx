import { getCourseById, getChapterContent } from "@/src/lib/course-loader";
import { notFound } from "next/navigation";
import Link from "next/link";
import Link from "next/link";

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
    <div className="container py-8">
      <Link href={`/courses/${params.id}`} className="text-sm text-primary hover:underline">
        &larr; Back to Course
      </Link>
      <div className="prose prose-lg dark:prose-invert max-w-none mt-4">
        <div dangerouslySetInnerHTML={{ __html: chapterContent }} />
      </div>
    </div>
  );
}