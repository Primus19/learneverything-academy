import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Course } from "@/src/lib/course-loader"

interface CurriculumAccordionProps {
  curriculum: Course["curriculum"]
}

export function CurriculumAccordion({ curriculum }: CurriculumAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {curriculum.weeks.map((week, index) => (
        <AccordionItem key={index} value={`week-${index + 1}`}>
          <AccordionTrigger>Week {index + 1}: {week.title}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">{week.description}</p>
              <ul className="list-disc list-inside space-y-2">
                {week.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>{topic}</li>
                ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
