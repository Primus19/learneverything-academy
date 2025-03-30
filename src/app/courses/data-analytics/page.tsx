import React from 'react';
import { Metadata } from 'next';
import { getChapters } from "../../../lib/markdown/loader";
import Link from 'next/link';
import { Button } from "../../../components/ui/button";
import Card from "../../../components/ui/card-direct/Card.jsx"
import CardContent from "../../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../../components/ui/card-direct/CardDescription.jsx"
import CardHeader from "../../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../../components/ui/card-direct/CardTitle.jsx";
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Analytics | LearnEverything Academy',
  description: 'Master data analytics techniques, statistical analysis, and data visualization.',
};

export default async function DataAnalyticsCoursePage() {
  const chapters = await getChapters('data_analytics');

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Data Analytics</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Learn to collect, process, analyze, and visualize data to drive business decisions.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>
              What you'll learn in this comprehensive Data Analytics course
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Data Collection and Preparation</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn techniques for gathering, cleaning, and preparing data for analysis
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Exploratory Data Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Master methods for exploring and understanding data patterns
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Statistical Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply statistical methods to extract insights from data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Data Visualization</h3>
                  <p className="text-sm text-muted-foreground">
                    Create compelling visualizations to communicate data insights
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Predictive Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Introduction to predictive modeling and machine learning techniques
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Applied Data Analytics Projects</h3>
                  <p className="text-sm text-muted-foreground">
                    Hands-on projects applying analytics to real-world business problems
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
              <CardHeader>
                <CardTitle>Chapter {index + 1}: {chapter.title}</CardTitle>
                <CardDescription>{chapter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button asChild>
                    <Link href={`/courses/data-analytics/chapters/${index}`}>
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
        <Card>
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
            <CardDescription>
              Recommended knowledge before starting this course
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Basic Mathematics</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding of basic statistics and algebra
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Basic Programming</h3>
                  <p className="text-sm text-muted-foreground">
                    Familiarity with programming concepts (Python preferred)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Spreadsheet Skills</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience with Excel or similar spreadsheet applications
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Critical Thinking</h3>
                  <p className="text-sm text-muted-foreground">
                    Ability to think analytically and solve problems
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Who Should Take This Course</CardTitle>
            <CardDescription>
              This course is ideal for the following roles and career paths
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Business Analysts</h3>
                <p className="text-sm text-muted-foreground">
                  Professionals who need to analyze data to support business decisions
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Data Analysts</h3>
                <p className="text-sm text-muted-foreground">
                  Current or aspiring data analysts looking to enhance their skills
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Marketing Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  Marketers who want to leverage data for campaign optimization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
