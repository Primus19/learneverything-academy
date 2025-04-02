import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

interface CourseRequirementsProps {
  requirements: string[]
}

export function CourseRequirements({ requirements }: CourseRequirementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prerequisites</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {requirements.map((requirement, index) => (
            <div key={index} className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-1" />
              <span>{requirement}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}