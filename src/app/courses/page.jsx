import React from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/components";

export const metadata = {
  title: 'LearnEverything Academy | Courses',
  description: 'Explore our comprehensive courses in DevOps, Cloud Engineering, Security Operations, Risk Management, Data Analytics, Big Data, Data Engineering, and Ethical Hacking.',
};

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Courses</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Comprehensive, hands-on courses designed to help you master the most in-demand skills in technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Link href="/courses/devops" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
            <div className="aspect-video relative bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">DevOps</span>
            </div>
            <CardHeader>
              <CardTitle>DevOps</CardTitle>
              <CardDescription>
                Master the tools and practices that enable continuous software delivery and infrastructure automation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">6 Chapters</div>
                <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/courses/cloud-engineering" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
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
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">6 Chapters</div>
                <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/courses/soc" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
            <div className="aspect-video relative bg-gradient-to-br from-red-600 to-purple-800 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">SOC</span>
            </div>
            <CardHeader>
              <CardTitle>Security Operations Center (SOC)</CardTitle>
              <CardDescription>
                Develop the skills needed to detect, analyze, and respond to cybersecurity incidents effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">6 Chapters</div>
                <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/courses/risk-management" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
            <div className="aspect-video relative bg-gradient-to-br from-green-600 to-teal-800 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">Risk</span>
            </div>
            <CardHeader>
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>
                Learn to identify, assess, and mitigate risks in IT and business environments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">6 Chapters</div>
                <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/courses/data-analytics" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
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
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">6 Chapters</div>
                <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/courses/big-data" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
            <div className="aspect-video relative bg-gradient-to-br from-purple-600 to-pink-800 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">Big Data</span>
            </div>
            <CardHeader>
              <CardTitle>Big Data</CardTitle>
              <CardDescription>
                Learn to process, analyze, and derive insights from large-scale data using modern technologies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">6 Chapters</div>
                <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/courses/data-engineering" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
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
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">6 Chapters</div>
                <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/courses/ethical-hacking" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
            <div className="aspect-video relative bg-gradient-to-br from-red-600 to-orange-800 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">Ethical Hacking</span>
            </div>
            <CardHeader>
              <CardTitle>Ethical Hacking</CardTitle>
              <CardDescription>
                Learn to identify and exploit vulnerabilities in systems and applications to improve security.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">6 Chapters</div>
                <Button variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-16 space-y-12">
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Your Learning Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">DevOps Fundamentals</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Cloud Security</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Data Analytics Basics</span>
                <span className="text-sm font-medium">80%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="community" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="career">Career Advancement</TabsTrigger>
          </TabsList>
          <TabsContent value="community" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Join Our Learning Community</CardTitle>
                <CardDescription>Connect with fellow learners and industry experts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <span>JS</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">John Smith</p>
                      <p className="text-sm text-muted-foreground">Just completed the DevOps certification! The CI/CD pipeline section was incredibly helpful.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <span>AJ</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Alice Johnson</p>
                      <p className="text-sm text-muted-foreground">Looking for study partners for the Cloud Engineering course. Anyone interested?</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="career" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Opportunities</CardTitle>
                <CardDescription>Leverage your skills for professional growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Senior DevOps Engineer</h3>
                    <p className="text-sm text-muted-foreground mb-2">TechCorp Inc. - Remote</p>
                    <p className="text-sm mb-3">Looking for experienced DevOps engineers to help scale our cloud infrastructure.</p>
                    <Button size="sm">View Details</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Data Analyst</h3>
                    <p className="text-sm text-muted-foreground mb-2">Analytics Pro - New York, NY</p>
                    <p className="text-sm mb-3">Join our team of data professionals to drive business insights through data.</p>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
