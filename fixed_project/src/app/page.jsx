import React from 'react';
import Link from 'next/link';
import { Button } from "../components/ui/button";
import Card from "../components/ui/card-direct/Card"
import CardContent from "../components/ui/card-direct/CardContent"
import CardDescription from "../components/ui/card-direct/CardDescription"
import CardHeader from "../components/ui/card-direct/CardHeader"
import CardTitle from "../components/ui/card-direct/CardTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { PersonalizedLearning } from "../components/features/personalized_learning";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4 md-6">
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
        <PersonalizedLearning userId="user123" userName="John Doe" />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Featured Courses</h2>
        <div className="grid grid-cols-1 md-cols-2 lg-cols-4 gap-6">
          <Link href="/courses/devops" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover-primary hover-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">DevOps</span>
              </div>
              
                DevOps Engineering</CardTitle>
                
                  Master the tools and practices that enable continuous software delivery and infrastructure automation.
                </CardDescription>
              </CardHeader>
              
                <Button variant="ghost" className="w-full group-hover-primary group-hover-primary-foreground">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/courses/cloud-engineering" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover-primary hover-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">Cloud</span>
              </div>
              
                Cloud Engineering</CardTitle>
                
                  Learn to design, build, and manage cloud infrastructure on major platforms like AWS, Azure, and GCP.
                </CardDescription>
              </CardHeader>
              
                <Button variant="ghost" className="w-full group-hover-primary group-hover-primary-foreground">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/courses/soc" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover-primary hover-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-red-600 to-purple-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">SOC</span>
              </div>
              
                Security Operations</CardTitle>
                
                  Develop the skills needed to detect, analyze, and respond to cybersecurity incidents effectively.
                </CardDescription>
              </CardHeader>
              
                <Button variant="ghost" className="w-full group-hover-primary group-hover-primary-foreground">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/courses/ethical-hacking" className="group">
            <Card className="overflow-hidden border-2 border-transparent transition-all hover-primary hover-lg h-full">
              <div className="aspect-video relative bg-gradient-to-br from-green-600 to-teal-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">Ethical Hacking</span>
              </div>
              
                Ethical Hacking</CardTitle>
                
                  Learn to identify and exploit vulnerabilities in systems and applications to improve security.
                </CardDescription>
              </CardHeader>
              
                <Button variant="ghost" className="w-full group-hover-primary group-hover-primary-foreground">
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
        <div className="grid grid-cols-1 md-cols-3 gap-8">
          
            
              Hands-on Learning</CardTitle>
            </CardHeader>
            
              
                Our courses feature practical, hands-on labs and exercises that simulate real-world scenarios, allowing you to apply what you learn immediately.
              </p>
            </CardContent>
          </Card>
          
            
              Industry-Relevant Skills</CardTitle>
            </CardHeader>
            
              
                Our curriculum is designed by industry experts and regularly updated to ensure you're learning the most in-demand skills and technologies.
              </p>
            </CardContent>
          </Card>
          
            
              Comprehensive Learning Path</CardTitle>
            </CardHeader>
            
              
                From beginner to advanced, our structured learning paths guide you through a logical progression of skills to achieve your career goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Learning Paths</h2>
        <Tabs defaultValue="cybersecurity">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
            <TabsTrigger value="cloud">Cloud & DevOps</TabsTrigger>
            <TabsTrigger value="data">Data Science</TabsTrigger>
            <TabsTrigger value="software">Software Development</TabsTrigger>
          </TabsList>
          <TabsContent value="cybersecurity" className="mt-6">
            
              
                Cybersecurity Career Path</CardTitle>
                
                  Build a career in cybersecurity with these recommended courses
                </CardDescription>
              </CardHeader>
              
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">1. Security Operations Center (SOC)</h3>
                      <p className="text-sm text-muted-foreground">Learn the fundamentals of security monitoring and incident response</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/soc">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">2. Ethical Hacking</h3>
                      <p className="text-sm text-muted-foreground">Master penetration testing and vulnerability assessment</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/ethical-hacking">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    
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
            
              
                Cloud & DevOps Career Path</CardTitle>
                
                  Become a cloud and DevOps professional with these recommended courses
                </CardDescription>
              </CardHeader>
              
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">1. DevOps Engineering</h3>
                      <p className="text-sm text-muted-foreground">Master continuous integration, delivery, and deployment</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/devops">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">2. Cloud Engineering</h3>
                      <p className="text-sm text-muted-foreground">Learn to design and manage cloud infrastructure</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/cloud-engineering">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">3. Security Operations Center (SOC)</h3>
                      <p className="text-sm text-muted-foreground">Secure your cloud and DevOps environments</p>
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
            
              
                Data Science Career Path</CardTitle>
                
                  Build a career in data science with these recommended courses
                </CardDescription>
              </CardHeader>
              
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">1. Data Analytics</h3>
                      <p className="text-sm text-muted-foreground">Learn to analyze data and extract valuable insights</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/data-analytics">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">2. Big Data</h3>
                      <p className="text-sm text-muted-foreground">Process and analyze large-scale datasets</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/big-data">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">3. Data Engineering</h3>
                      <p className="text-sm text-muted-foreground">Build robust data pipelines and infrastructure</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/data-engineering">Start</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="software" className="mt-6">
            
              
                Software Development Career Path</CardTitle>
                
                  Become a software developer with these recommended courses
                </CardDescription>
              </CardHeader>
              
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">1. DevOps Engineering</h3>
                      <p className="text-sm text-muted-foreground">Learn modern software development practices</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/devops">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">2. Cloud Engineering</h3>
                      <p className="text-sm text-muted-foreground">Deploy applications to cloud platforms</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/cloud-engineering">Start</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    
                      <h3 className="font-medium">3. Ethical Hacking</h3>
                      <p className="text-sm text-muted-foreground">Learn to write secure code and identify vulnerabilities</p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/courses/ethical-hacking">Start</Link>
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
