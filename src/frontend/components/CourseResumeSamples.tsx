import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from "@/src/courses/data"
import { resumeSamples, ResumeSample } from "@/src/resume-samples/data"
import Image from "next/image"
import { Download, FileType, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface CourseResumeSamplesProps {
  course: Course
}

function getRelevantResumeSamples(course: Course): ResumeSample[] {
  // Map course IDs to resume sample categories
  const categoryMap: { [key: string]: string } = {
    'devops': 'DevOps',
    'cloud-engineering': 'Cloud',
    'soc': 'Security',
    'aws-cloud': 'Cloud'
  };

  // Get the category for this course
  const courseCategory = course.id.split('-')[0];
  const targetCategory = categoryMap[courseCategory];

  // Filter resume samples by category
  return targetCategory 
    ? resumeSamples.filter(sample => sample.category === targetCategory)
    : [];
}

export function CourseResumeSamples({ course }: CourseResumeSamplesProps) {
  const { toast } = useToast();
  const relevantSamples = getRelevantResumeSamples(course);

  if (relevantSamples.length === 0) {
    return null;
  }

  const handleDownload = async (sample: ResumeSample) => {
    try {
      const response = await fetch(sample.downloadUrl);
      
      if (!response.ok) {
        throw new Error('Failed to download template');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${sample.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Resume template downloaded successfully",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download the resume template. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Templates</CardTitle>
        <CardDescription>
          Professional resume templates tailored for graduates of this course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {relevantSamples.map((sample) => (
            <div 
              key={sample.id}
              className="group relative overflow-hidden rounded-lg border bg-card/50 backdrop-blur-sm"
            >
              <div className="relative">
                <div className="relative aspect-[21/9] overflow-hidden">
                  <Image
                    src={sample.previewImage}
                    alt={sample.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary border-primary/20">
                    {sample.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{sample.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{sample.description}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between text-sm bg-primary/[0.03] p-4 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-2">
                      <FileType className="h-5 w-5 text-primary" />
                      <span className="font-medium">{sample.format}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">Updated {sample.lastUpdated}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Perfect For</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {sample.suitableFor.map((role, index) => (
                        <div
                          key={index}
                          className="text-sm p-2 rounded-lg bg-primary/[0.03] border border-primary/10"
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleDownload(sample)}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Template
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}