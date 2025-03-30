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
  title: 'Risk Management | LearnEverything Academy',
  description: 'Learn to identify, assess, and mitigate risks in IT and business environments.',
};

export default async function RiskManagementCoursePage() {
  const chapters = await getChapters('risk_management');

  return (
    <div className="container mx-auto py-8 px-4 md-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Risk Management</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Learn to identify, assess, and mitigate risks in IT and business environments.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        
          
            Course Overview</CardTitle>
            
              What you'll learn in this comprehensive Risk Management course
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Risk Management Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand the core principles and frameworks of risk management
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Risk Identification Techniques</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn methods to identify and categorize various types of risks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Risk Assessment and Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Master qualitative and quantitative risk assessment methodologies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Risk Mitigation Strategies</h3>
                  <p className="text-sm text-muted-foreground">
                    Develop effective risk response plans and mitigation strategies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Enterprise Risk Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Implement organization-wide risk management frameworks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Financial and Operational Risk</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand and manage specific risk types in business environments
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
                  
                    <Link href={`/courses/risk-management/chapters/${index}`}>
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
                
                  <h3 className="font-medium">Basic Business Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding of business operations and organizational structures
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">IT Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic understanding of IT systems and infrastructure
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Analytical Thinking</h3>
                  <p className="text-sm text-muted-foreground">
                    Ability to analyze problems and think critically
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                
                  <h3 className="font-medium">Basic Project Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Familiarity with project management concepts is helpful but not required
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
                <h3 className="font-medium mb-2">IT Managers</h3>
                <p className="text-sm text-muted-foreground">
                  Managers responsible for IT operations and security
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Security Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  Security analysts and engineers looking to understand risk management
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Business Analysts</h3>
                <p className="text-sm text-muted-foreground">
                  Analysts who need to assess and manage risks in business processes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
