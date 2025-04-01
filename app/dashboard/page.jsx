import React from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/components";
import Navbar from "@/app/components/layout/Navbar";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Continue your learning journey.</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Courses</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">DevOps Engineering</h3>
                        <p className="text-sm text-muted-foreground">Master the tools and practices that enable continuous software delivery.</p>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                        In Progress
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <span className="text-sm text-muted-foreground">Last accessed: 2 days ago</span>
                      <Button asChild size="sm">
                        <Link href="/courses/devops/chapters/2">Continue</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Cloud Engineering</h3>
                        <p className="text-sm text-muted-foreground">Learn to design, build, and manage cloud infrastructure.</p>
                      </div>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                        In Progress
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <span className="text-sm text-muted-foreground">Last accessed: 5 days ago</span>
                      <Button asChild size="sm">
                        <Link href="/courses/cloud-engineering/chapters/1">Continue</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Data Analytics</h3>
                        <p className="text-sm text-muted-foreground">Master data analysis techniques and tools.</p>
                      </div>
                      <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-medium">
                        Completed
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>100%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <span className="text-sm text-muted-foreground">Completed: 2 weeks ago</span>
                      <Button asChild size="sm" variant="outline">
                        <Link href="/courses/data-analytics">Review</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Learning Activity</CardTitle>
                <CardDescription>Your recent learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Completed Chapter 2: Continuous Integration</p>
                      <p className="text-sm text-muted-foreground">DevOps Engineering • 2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Started Chapter 3: Infrastructure as Code</p>
                      <p className="text-sm text-muted-foreground">DevOps Engineering • 2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Completed Chapter 1: Introduction to Cloud Computing</p>
                      <p className="text-sm text-muted-foreground">Cloud Engineering • 5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 rounded-full bg-muted mb-4"></div>
                  <h3 className="font-medium text-lg">John Smith</h3>
                  <p className="text-sm text-muted-foreground mb-4">john.smith@example.com</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href="/profile">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Course Completer</p>
                      <p className="text-xs text-muted-foreground">Completed Data Analytics course</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Fast Learner</p>
                      <p className="text-xs text-muted-foreground">Completed 5 chapters in one day</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Quick Starter</p>
                      <p className="text-xs text-muted-foreground">Started 3 courses in first week</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium mb-1">Ethical Hacking</h4>
                    <p className="text-xs text-muted-foreground mb-2">Learn cybersecurity techniques and ethical hacking.</p>
                    <Button asChild size="sm" className="w-full">
                      <Link href="/courses/ethical-hacking">View Course</Link>
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium mb-1">Data Engineering</h4>
                    <p className="text-xs text-muted-foreground mb-2">Master data pipelines and infrastructure.</p>
                    <Button asChild size="sm" className="w-full">
                      <Link href="/courses/data-engineering">View Course</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
