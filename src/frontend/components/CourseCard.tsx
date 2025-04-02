import { Course } from "@/src/courses/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Clock, GraduationCap, User } from "lucide-react"

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
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
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">${course.price}</span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="font-medium">{course.level}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{course.instructor.name}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}