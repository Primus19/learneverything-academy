import { getCourseById, getAllCourses } from "@/src/lib/course-loader";
import { CourseContent } from "./CourseContent";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((course) => ({
    id: course.id,
  }));
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseById(params.id);

  if (!course) {
    return notFound();
  }

  return <CourseContent course={course} />;
}