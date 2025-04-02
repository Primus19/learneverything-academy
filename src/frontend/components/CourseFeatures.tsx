import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from "@/src/courses/data"
import { Book, Code, MessageCircle, Video, Beaker, Award } from "lucide-react"

const iconMap = {
  video: Video,
  code: Code,
  "message-circle": MessageCircle,
  book: Book,
  lab: Beaker,
  certificate: Award,
}

interface CourseFeaturesProps {
  features: Course["features"]
}

export function CourseFeatures({ features }: CourseFeaturesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <div key={index} className="flex items-start gap-3">
                {Icon && <Icon className="h-5 w-5 text-primary mt-1" />}
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}