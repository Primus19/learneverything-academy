import React from 'react';
import { Metadata } from 'next';
import { getChapters } from "../../../lib/markdown/loader.jsx";
import Link from 'next/link';
import { Button } from "../../../components/ui/button.jsx";
import Card from "../../../components/ui/card-direct/Card.jsx"
import CardContent from "../../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../../components/ui/card-direct/CardDescription.jsx"
import CardHeader from "../../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../../components/ui/card-direct/CardTitle.jsx";
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Security Operations Center (SOC) | LearnEverything Academy',
  description: 'Learn the fundamentals of security operations, threat detection, incident response, and SOC management.',
};

export default async function SOCCoursePage() {
  const chapters = await getChapters('soc');

  return (
    <div className="container mx-auto py-8 px-4 md-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Security Operations Center (SOC)</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Develop the skills needed to detect, analyze, and respond to cybersecurity incidents effectively.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        
          
            Course Overview</CardTitle>
            
              What you'll learn in this comprehensive SOC course
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Security Monitoring Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn the core principles of security monitoring and the role of a SOC
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Threat Detection Techniques</h3>
                  <p className="text-sm text-muted-foreground">
                    Master methods for identifying and analyzing security threats
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Incident Response Procedures</h3>
                  <p className="text-sm text-muted-foreground">
                    Develop effective incident response plans and procedures
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">SOC Tools and Technologies</h3>
                  <p className="text-sm text-muted-foreground">
                    Hands-on experience with SIEM, EDR, and other essential SOC tools
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Threat Intelligence Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn to leverage threat intelligence to enhance security operations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">SOC Automation and Orchestration</h3>
                  <p className="text-sm text-muted-foreground">
                    Implement automation to improve SOC efficiency and effectiveness
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Course Chapters</h2>
        <div className="grid gap-4">
          {chapters.map((chapter, index) => (
            <Card key={index} className="overflow-hidden">
              
                Chapter {index + 1}</CardTitle>
                {chapter.description}</CardDescription>
              </CardHeader>
              
                <div className="flex justify-end">
                  
                    <Link href={`/courses/soc/chapters/${index}`}>
                      Start Chapter
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-12">
        
          
            Prerequisites</CardTitle>
            
              Recommended knowledge before starting this course
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Basic Networking Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding of TCP/IP, network protocols, and basic network architecture
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Cybersecurity Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Familiarity with basic security concepts and terminology
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Operating System Basics</h3>
                  <p className="text-sm text-muted-foreground">
                    Working knowledge of Windows and Linux operating systems
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Basic Scripting Skills</h3>
                  <p className="text-sm text-muted-foreground">
                    Familiarity with scripting languages like Python or PowerShell is helpful but not required
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      
        
          
            Who Should Take This Course</CardTitle>
            
              This course is ideal for the following roles and career paths
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Security Analysts</h3>
                <p className="text-sm text-muted-foreground">
                  Entry-level and mid-level security analysts looking to specialize in SOC operations
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">IT Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  IT professionals transitioning to cybersecurity roles
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Security Engineers</h3>
                <p className="text-sm text-muted-foreground">
                  Engineers looking to understand security monitoring and incident response
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
