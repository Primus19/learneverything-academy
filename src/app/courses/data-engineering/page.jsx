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
  title: 'Data Engineering | LearnEverything Academy',
  description: 'Master data engineering principles, ETL processes, and data pipeline development.',
};

export default async function DataEngineeringCoursePage() {
  const chapters = await getChapters('data_engineering');

  return (
    <div className="container mx-auto py-8 px-4 md-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Data Engineering</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Learn to design, build, and maintain data pipelines and infrastructure for efficient data processing.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        
          
            Course Overview</CardTitle>
            
              What you'll learn in this comprehensive Data Engineering course
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Data Engineering Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand the core principles and responsibilities of data engineering
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">ETL/ELT Processes</h3>
                  <p className="text-sm text-muted-foreground">
                    Master data extraction, transformation, and loading techniques
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Data Pipeline Development</h3>
                  <p className="text-sm text-muted-foreground">
                    Design and implement efficient data pipelines for various use cases
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Data Modeling</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn effective data modeling techniques for different data stores
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Data Governance</h3>
                  <p className="text-sm text-muted-foreground">
                    Implement data quality, security, and governance best practices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Cloud Data Engineering</h3>
                  <p className="text-sm text-muted-foreground">
                    Work with cloud-based data engineering tools and services
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
                  
                    <Link href={`/courses/data-engineering/chapters/${index}`}>
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
                
                  <h3 className="font-medium">Programming Skills</h3>
                  <p className="text-sm text-muted-foreground">
                    Proficiency in Python or another programming language
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Database Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding of SQL and database concepts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Cloud Computing Basics</h3>
                  <p className="text-sm text-muted-foreground">
                    Familiarity with cloud platforms (AWS, Azure, or GCP)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Linux Command Line</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic understanding of Linux and command line operations
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
                <h3 className="font-medium mb-2">Software Engineers</h3>
                <p className="text-sm text-muted-foreground">
                  Developers looking to specialize in data engineering
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Data Analysts</h3>
                <p className="text-sm text-muted-foreground">
                  Analysts who want to build more robust data pipelines
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Database Administrators</h3>
                <p className="text-sm text-muted-foreground">
                  DBAs transitioning to modern data engineering roles
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
