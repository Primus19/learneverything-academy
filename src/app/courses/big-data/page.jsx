import React from 'react';
import { Metadata } from 'next';
import { getChapters } from "../../../lib/markdown/loader.jsx";
import Link from "next/link.jsx";
import { Button } from "../../../components/ui/button.jsx";
import Card from "../../../components/ui/card-direct/Card.jsx"
import CardContent from "../../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../../components/ui/card-direct/CardDescription.jsx"
import CardHeader from "../../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../../components/ui/card-direct/CardTitle.jsx";
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Big Data | LearnEverything Academy',
  description: 'Master big data technologies, distributed computing, and data processing at scale.',
};

export default async function BigDataCoursePage() {
  const chapters = await getChapters('big_data');

  return (
    <div className="container mx-auto py-8 px-4 md-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Big Data</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Learn to process, analyze, and derive insights from large-scale datasets using modern big data technologies.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        
          
            Course Overview</CardTitle>
            
              What you'll learn in this comprehensive Big Data course
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Big Data Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand the core concepts and challenges of big data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Hadoop Ecosystem</h3>
                  <p className="text-sm text-muted-foreground">
                    Master Hadoop, HDFS, MapReduce, and related technologies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Apache Spark</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn distributed data processing with Spark and its components
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">NoSQL Databases</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore non-relational databases for big data storage
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Data Warehousing</h3>
                  <p className="text-sm text-muted-foreground">
                    Implement data warehousing solutions for big data analytics
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Machine Learning for Big Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply machine learning techniques to large-scale datasets
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
                  
                    <Link href={`/courses/big-data/chapters/${index}`}>
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
                
                  <h3 className="font-medium">Programming Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Proficiency in Python, Java, or Scala programming
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Database Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding of relational databases and SQL
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Linux Basics</h3>
                  <p className="text-sm text-muted-foreground">
                    Familiarity with Linux command line and basic operations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Data Analysis Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic understanding of data analysis concepts
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
                <h3 className="font-medium mb-2">Data Engineers</h3>
                <p className="text-sm text-muted-foreground">
                  Professionals who design and build data pipelines and infrastructure
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Data Scientists</h3>
                <p className="text-sm text-muted-foreground">
                  Data scientists who need to work with large-scale datasets
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Software Developers</h3>
                <p className="text-sm text-muted-foreground">
                  Developers looking to specialize in big data technologies
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
