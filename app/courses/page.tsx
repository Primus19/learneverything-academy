import { getAllCourses } from "@/src/lib/course-loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Clock, GraduationCap, List } from "lucide-react";

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Our Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <Card className="group overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <CardTitle className="text-xl text-white mb-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-white/90 line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4 text-primary" />
                      <span>{course.chapters.length} chapters</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{course.level}</span>
                  </div>
                </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}