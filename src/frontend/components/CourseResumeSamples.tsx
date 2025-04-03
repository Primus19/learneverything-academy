"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from "@/src/lib/course-loader"
import { resumeSamples, ResumeSample } from "@/src/resume-samples/data"
import Image from "next/image"
import { Download, FileType, Users, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface CourseResumeSamplesProps {
  course: Course
}

function getRelevantResumeSamples(course: Course): ResumeSample[] {
  const categoryMap: { [key: string]: string } = {
    'web-development-fundamentals': 'Web Development',
    'react-masterclass': 'Frontend',
    'devops': 'DevOps',
    'cloud-engineering': 'Cloud',
    'data-engineering': 'Data Engineering',
    'data_analytics': 'Data Analytics',
    'big_data': 'Data Engineering',
    'ethical_hacking': 'Security',
    'risk_management': 'Security',
    'soc': 'Security'
  };

  const courseCategory = categoryMap[course.id];
  return courseCategory ? resumeSamples.filter(sample => sample.category === courseCategory) : [];
}

export function CourseResumeSamples({ course }: CourseResumeSamplesProps) {
  const { toast } = useToast();
  const relevantSamples = getRelevantResumeSamples(course);

  if (relevantSamples.length === 0) {
    return null;
  }

  const handleDownload = async (sample: ResumeSample, format: 'pdf' | 'docx') => {
    try {
      const baseUrl = window.location.origin;
<<<<<<< HEAD
      const fileUrl = `${baseUrl}/templates/${sample.id}.${format}`;
=======
      const fileUrl = `${baseUrl}/static/templates/${sample.id}.${format}`;
>>>>>>> 8f3f698f5e15749b771a7e9281b080f783f417d5
      
      const response = await fetch(fileUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to download ${format.toUpperCase()} template`);
      }

      const blob = await response.blob();
      const fileName = `${sample.title.toLowerCase().replace(/\s+/g, '-')}.${format}`;
      
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);

      toast({
        title: "Success",
        description: `Resume template downloaded successfully as ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: `Failed to download the ${format.toUpperCase()} template. Please try again.`,
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

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(sample, 'pdf')}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download PDF
                    </Button>
                    <Button 
                      onClick={() => handleDownload(sample, 'docx')}
                      variant="outline"
                      className="flex-1"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      Download Word
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 8f3f698f5e15749b771a7e9281b080f783f417d5
