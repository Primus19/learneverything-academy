import React from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/components";

export const metadata = {
  title: 'LearnEverything Academy | Big Data',
  description: 'Learn to process, analyze, and derive insights from large-scale data using modern technologies.',
};

export default function BigDataCoursePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Big Data</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Learn to process, analyze, and derive insights from large-scale data using modern technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <div className="aspect-video relative bg-gradient-to-br from-purple-600 to-pink-800 flex items-center justify-center rounded-lg mb-6">
            <span className="text-5xl font-bold text-white">Big Data</span>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Big Data refers to extremely large datasets that may be analyzed computationally to reveal patterns, trends, and associations. This course will teach you how to work with big data technologies and frameworks to process, analyze, and derive insights from large-scale datasets.
            </p>
            
            <h2>What You'll Learn</h2>
            <ul>
              <li>Understand the fundamentals of big data and its challenges</li>
              <li>Work with distributed computing frameworks like Hadoop and Spark</li>
              <li>Process and analyze large-scale structured and unstructured data</li>
              <li>Implement data pipelines for batch and stream processing</li>
              <li>Apply machine learning algorithms to big data</li>
              <li>Visualize insights from big data analysis</li>
            </ul>
            
            <h2>Prerequisites</h2>
            <p>
              Basic programming knowledge (preferably Python or Java), understanding of databases, and familiarity with data analysis concepts. Our Data Analytics course is recommended before taking this course.
            </p>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Duration</h3>
                <p className="text-sm text-muted-foreground">6 weeks (self-paced)</p>
              </div>
              <div>
                <h3 className="font-medium">Difficulty</h3>
                <p className="text-sm text-muted-foreground">Intermediate to Advanced</p>
              </div>
              <div>
                <h3 className="font-medium">Topics Covered</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Hadoop</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Spark</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">MapReduce</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">HDFS</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">NoSQL</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Data Lakes</span>
                </div>
              </div>
              <div className="pt-4">
                <Button className="w-full">Start Learning</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Course Chapters</CardTitle>
              <CardDescription>Complete all 6 chapters to master Big Data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">1. Introduction to Big Data</h3>
                    <p className="text-sm text-muted-foreground">Concepts, challenges, and ecosystem</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/courses/big-data/chapters/0">Start</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">2. Hadoop Ecosystem</h3>
                    <p className="text-sm text-muted-foreground">HDFS, MapReduce, and YARN</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/courses/big-data/chapters/1">Start</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">3. Apache Spark</h3>
                    <p className="text-sm text-muted-foreground">RDDs, DataFrames, and SparkSQL</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/courses/big-data/chapters/2">Start</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">4. NoSQL Databases</h3>
                    <p className="text-sm text-muted-foreground">MongoDB, Cassandra, and HBase</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/courses/big-data/chapters/3">Start</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">5. Stream Processing</h3>
                    <p className="text-sm text-muted-foreground">Kafka, Spark Streaming, and Flink</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/courses/big-data/chapters/4">Start</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">6. Big Data Analytics</h3>
                    <p className="text-sm text-muted-foreground">Machine learning with big data</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/courses/big-data/chapters/5">Start</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Related Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/courses/data-analytics" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-yellow-600 to-orange-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">Analytics</span>
              </div>
              <CardHeader>
                <CardTitle>Data Analytics</CardTitle>
                <CardDescription>
                  Master the techniques and tools to analyze data and extract valuable insights for decision-making.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  View Course
                </Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/courses/data-engineering" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-blue-600 to-cyan-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">Data Eng</span>
              </div>
              <CardHeader>
                <CardTitle>Data Engineering</CardTitle>
                <CardDescription>
                  Develop skills to build robust data pipelines and infrastructure for data-driven applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  View Course
                </Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/courses/cloud-engineering" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">Cloud</span>
              </div>
              <CardHeader>
                <CardTitle>Cloud Engineering</CardTitle>
                <CardDescription>
                  Learn to design, build, and manage cloud infrastructure on major platforms like AWS, Azure, and GCP.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  View Course
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
