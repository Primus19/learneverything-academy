import React from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/components";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight mb-4">LearnEverything Academy</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Master the most in-demand skills with our comprehensive, hands-on courses designed for modern technology professionals.
        </p>
        <div className="flex gap-4 mt-6">
          <Button asChild size="lg">
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Personalized Learning</h2>
          <p className="mb-4">Welcome back! Continue your learning journey with these recommended courses:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">DevOps Fundamentals</h3>
              <p className="text-sm text-muted-foreground mb-2">60% Complete</p>
              <div className="w-full bg-muted rounded-full h-2.5 mb-3">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <Button size="sm">Continue</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Cloud Security</h3>
              <p className="text-sm text-muted-foreground mb-2">25% Complete</p>
              <div className="w-full bg-muted rounded-full h-2.5 mb-3">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <Button size="sm">Continue</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/courses/devops" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">DevOps</span>
              </div>
              <CardHeader>
                <CardTitle>DevOps Engineering</CardTitle>
                <CardDescription>
                  Master the tools and practices that enable continuous software delivery and infrastructure automation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
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
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/courses/soc" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-red-600 to-purple-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">SOC</span>
              </div>
              <CardHeader>
                <CardTitle>Security Operations</CardTitle>
                <CardDescription>
                  Develop the skills needed to detect, analyze, and respond to cybersecurity incidents effectively.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/courses/ethical-hacking" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-green-600 to-teal-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">Ethical Hacking</span>
              </div>
              <CardHeader>
                <CardTitle>Ethical Hacking</CardTitle>
                <CardDescription>
                  Learn to identify and exploit vulnerabilities in systems and applications to improve security.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Button asChild size="lg">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Why Choose LearnEverything Academy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Hands-on Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our courses feature practical, hands-on labs and exercises that simulate real-world scenarios, allowing you to apply what you learn immediately.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Industry-Relevant Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our curriculum is designed by industry experts and regularly updated to ensure you're learning the most in-demand skills and technologies.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                From beginner to advanced, our structured learning paths guide you through a logical progression of skills to achieve your career goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Learning Paths</h2>
        <Tabs defaultValue="cybersecurity">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
            <TabsTrigger value="cloud">Cloud & DevOps</TabsTrigger>
            <TabsTrigger value="data">Data Science</TabsTrigger>
            <TabsTrigger value="software">Software Development</TabsTrigger>
          </TabsList>
          <TabsContent value="cybersecurity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cybersecurity Career Path</CardTitle>
                <CardDescription>
                  Build a career in cybersecurity with these recommended courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">1. Security Operations Center (SOC)</h3>
                      <p className="text-sm text-muted-foreground">Learn the fundamentals of security monitoring and incident response</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/soc">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">2. Ethical Hacking</h3>
                      <p className="text-sm text-muted-foreground">Master penetration testing and vulnerability assessment</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/ethical-hacking">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">3. Risk Management</h3>
                      <p className="text-sm text-muted-foreground">Learn to identify, assess, and mitigate security risks</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/risk-management">Start</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="cloud" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cloud & DevOps Career Path</CardTitle>
                <CardDescription>
                  Become a cloud and DevOps professional with these recommended courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">1. DevOps Engineering</h3>
                      <p className="text-sm text-muted-foreground">Master continuous integration, delivery, and deployment</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/devops">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">2. Cloud Engineering</h3>
                      <p className="text-sm text-muted-foreground">Learn to design and manage cloud infrastructure</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/cloud-engineering">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">3. Security Operations Center (SOC)</h3>
                      <p className="text-sm text-muted-foreground">Understand cloud security monitoring and incident response</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/soc">Start</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="data" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Science Career Path</CardTitle>
                <CardDescription>
                  Become a data professional with these recommended courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">1. Data Analytics</h3>
                      <p className="text-sm text-muted-foreground">Learn to analyze and visualize data for insights</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/data-analytics">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">2. Data Engineering</h3>
                      <p className="text-sm text-muted-foreground">Build robust data pipelines and infrastructure</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/data-engineering">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">3. Big Data</h3>
                      <p className="text-sm text-muted-foreground">Master distributed computing and big data processing</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/big-data">Start</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="software" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Software Development Career Path</CardTitle>
                <CardDescription>
                  Become a software developer with these recommended courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">1. Web Development Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">Learn HTML, CSS, and JavaScript basics</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">2. Full-Stack Development</h3>
                      <p className="text-sm text-muted-foreground">Master both frontend and backend technologies</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">3. DevOps Engineering</h3>
                      <p className="text-sm text-muted-foreground">Learn to automate software delivery and infrastructure</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/devops">Start</Link>
                    </Button>
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
