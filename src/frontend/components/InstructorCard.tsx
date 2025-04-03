import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Course } from "@/src/lib/course-loader"

interface InstructorCardProps {
  instructor: Course["instructor"]
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meet Your Instructor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image
              src={instructor.avatar}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{instructor.name}</h3>
            <p className="text-sm text-muted-foreground">{instructor.bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
