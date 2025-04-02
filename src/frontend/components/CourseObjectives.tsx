import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface CourseObjectivesProps {
  objectives: string[]
}

export function CourseObjectives({ objectives }: CourseObjectivesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What You&apos;ll Learn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {objectives.map((objective, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              <span>{objective}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}