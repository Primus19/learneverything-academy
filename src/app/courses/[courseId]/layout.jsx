import React from 'react';
import Link from 'next/link';
import { Button } from "../../../components/ui/button.jsx";
import Card from "../../../components/ui/card-direct/Card.jsx"
import CardContent from "../../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../../components/ui/card-direct/CardDescription.jsx"
import CardFooter from "../../../components/ui/card-direct/CardFooter.jsx"
import CardHeader from "../../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../../components/ui/card-direct/CardTitle.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs.jsx";
import InteractiveLearningTools from "../../../components/features/interactive_learning_tools.jsx";
import ProgressTracking from "../../../components/features/progress_tracking.jsx";

export default function CourseLayout({
  children,
  params,
};
}) {
  // This would normally come from an API or database
  const courseData = {
    title(params.courseId),
    description(params.courseId),
    chapters(params.courseId),
  };

  return (
    <div className="container mx-auto py-8 px-4 md-6">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{courseData.title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-6">
          {courseData.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {courseData.chapters} Chapters</span>
          •</span>
          Hands-on Labs</span>
          •</span>
          Knowledge Checks</span>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Labs</TabsTrigger>
          <TabsTrigger value="progress">Your Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-6">
          {children}
        </TabsContent>
        <TabsContent value="interactive" className="mt-6">
          <InteractiveLearningTools courseId={params.courseId} />
        </TabsContent>
        <TabsContent value="progress" className="mt-6">
          <ProgressTracking userId="user123" userName="John Doe" courseId={params.courseId} />
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        
          
            Ready to advance your skills?</CardTitle>
            
              Explore related courses to continue your learning journey
            </CardDescription>
          </CardHeader>
          
            <div className="grid grid-cols-1 md-cols-3 gap-4">
              {getRelatedCourses(params.courseId).map((course, index) => (
                <Link key={index} href={`/courses/${course.id}`} className="group">
                  <Card className="h-full border-2 border-transparent transition-all hover-primary hover-md">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </CardContent>
                    
                      <Button variant="ghost" className="w-full group-hover-primary group-hover-primary-foreground">
                        Explore Course
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper functions to get course data
function getCourseTitle(courseId) {
  const titles = {
    'devops': 'DevOps Engineering',
    'cloud-engineering': 'Cloud Engineering',
    'soc': 'Security Operations Center (SOC)',
    'risk-management': 'Risk Management',
    'data-analytics': 'Data Analytics',
    'big-data': 'Big Data',
    'data-engineering': 'Data Engineering',
    'ethical-hacking': 'Ethical Hacking',
  };
  return titles[courseId] || 'Course Title';
}

function getCourseDescription(courseId) {
  const descriptions = {
    'devops': 'Master the tools and practices that enable continuous software delivery and infrastructure automation.',
    'cloud-engineering': 'Learn to design, build, and manage cloud infrastructure on major platforms like AWS, Azure, and GCP.',
    'soc': 'Develop the skills needed to detect, analyze, and respond to cybersecurity incidents effectively.',
    'risk-management': 'Learn to identify, assess, and mitigate risks in IT and business environments.',
    'data-analytics': 'Master the techniques and tools to analyze data and extract valuable insights for decision-making.',
    'big-data': 'Learn to process, analyze, and derive insights from large-scale data using modern technologies.',
    'data-engineering': 'Develop skills to build robust data pipelines and infrastructure for data-driven applications.',
    'ethical-hacking': 'Learn to identify and exploit vulnerabilities in systems and applications to improve security.',
  };
  return descriptions[courseId] || 'Course description';
}

function getChapterCount(courseId) {
  // All courses have 6 chapters
  return 6;
}

function getRelatedCourses(courseId)<{ id; title; description }> {
  // Define related courses for each course
  const relatedCourses<string, Array<{ id; title; description }>> = {
    'devops': [
      { id: 'cloud-engineering', title: 'Cloud Engineering', description: 'Extend your DevOps skills to cloud platforms' },
      { id: 'data-engineering', title: 'Data Engineering', description: 'Learn to build data pipelines and infrastructure' },
      { id: 'ethical-hacking', title: 'Ethical Hacking', description: 'Secure your DevOps pipelines and infrastructure' },
    ],
    'cloud-engineering': [
      { id: 'devops', title: 'DevOps Engineering', description: 'Automate your cloud infrastructure deployment' },
      { id: 'big-data', title: 'Big Data', description: 'Process large-scale data in the cloud' },
      { id: 'soc', title: 'Security Operations Center', description: 'Secure your cloud environments' },
    ],
    'soc': [
      { id: 'ethical-hacking', title: 'Ethical Hacking', description: 'Identify and exploit vulnerabilities' },
      { id: 'risk-management', title: 'Risk Management', description: 'Assess and mitigate security risks' },
      { id: 'cloud-engineering', title: 'Cloud Engineering', description: 'Secure cloud infrastructure' },
    ],
    'risk-management': [
      { id: 'soc', title: 'Security Operations Center', description: 'Implement security monitoring and response' },
      { id: 'ethical-hacking', title: 'Ethical Hacking', description: 'Understand attack vectors and vulnerabilities' },
      { id: 'data-analytics', title: 'Data Analytics', description: 'Analyze security data for risk assessment' },
    ],
    'data-analytics': [
      { id: 'big-data', title: 'Big Data', description: 'Scale your analytics to large datasets' },
      { id: 'data-engineering', title: 'Data Engineering', description: 'Build robust data pipelines' },
      { id: 'risk-management', title: 'Risk Management', description: 'Apply analytics to risk assessment' },
    ],
    'big-data': [
      { id: 'data-analytics', title: 'Data Analytics', description: 'Master data analysis techniques' },
      { id: 'data-engineering', title: 'Data Engineering', description: 'Build data infrastructure at scale' },
      { id: 'cloud-engineering', title: 'Cloud Engineering', description: 'Deploy big data solutions in the cloud' },
    ],
    'data-engineering': [
      { id: 'big-data', title: 'Big Data', description: 'Process and analyze large-scale data' },
      { id: 'data-analytics', title: 'Data Analytics', description: 'Extract insights from your data pipelines' },
      { id: 'devops', title: 'DevOps Engineering', description: 'Automate your data infrastructure' },
    ],
    'ethical-hacking': [
      { id: 'soc', title: 'Security Operations Center', description: 'Monitor and respond to security incidents' },
      { id: 'risk-management', title: 'Risk Management', description: 'Assess and mitigate security risks' },
      { id: 'cloud-engineering', title: 'Cloud Engineering', description: 'Secure cloud infrastructure' },
    ],
  };
  
  return relatedCourses[courseId] || [];
}
