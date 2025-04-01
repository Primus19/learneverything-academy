// Update the import paths to use the direct JSX files
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import Link from 'next/link';
import Image from "next/image";
import { ProgressTracking } from "../../components/features/progress_tracking";
import { CommunityEngagement } from "../../components/features/community_engagement";
import { AdvancedSearch } from "../../components/features/advanced_search";
import { CareerAdvancement } from "../../components/features/career_advancement";
// Fix imports to use default exports for Card components
import Card from "../../components/ui/card-direct/Card";
import CardContent from "../../components/ui/card-direct/CardContent";
import CardDescription from "../../components/ui/card-direct/CardDescription";
import CardHeader from "../../components/ui/card-direct/CardHeader";
import CardTitle from "../../components/ui/card-direct/CardTitle";
import { Button } from "../../components/ui/button";

// Use plain JS object for metadata without any type annotations
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

      <AdvancedSearch />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Link href="/courses/devops" className="group">
          <Card className="overflow-hidden border-2 border-transparent transition-all hover:border-primary hover:shadow-lg">
            <div className="aspect-video relative">
              <Image
                src="/images/courses/devops.jpg"
                alt="DevOps"
                fill
                className="object-cover"
              />
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
            <div className="aspect-video relative">
              <Image
                src="/images/courses/cloud-engineering.jpg"
                alt="Cloud Engineering"
                fill
                className="object-cover"
              />
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
            <div className="aspect-video relative">
              <Image
                src="/images/courses/soc.jpg"
                alt="Security Operations Center"
                fill
                className="object-cover"
              />
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
            <div className="aspect-video relative">
              <Image
                src="/images/courses/risk-management.jpg"
                alt="Risk Management"
                fill
                className="object-cover"
              />
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
            <div className="aspect-video relative">
              <Image
                src="/images/courses/data-analytics.jpg"
                alt="Data Analytics"
                fill
                className="object-cover"
              />
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
            <div className="aspect-video relative">
              <Image
                src="/images/courses/big-data.jpg"
                alt="Big Data"
                fill
                className="object-cover"
              />
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
            <div className="aspect-video relative">
              <Image
                src="/images/courses/data-engineering.jpg"
                alt="Data Engineering"
                fill
                className="object-cover"
              />
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
            <div className="aspect-video relative">
              <Image
                src="/images/courses/ethical-hacking.jpg"
                alt="Ethical Hacking"
                fill
                className="object-cover"
              />
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
        <ProgressTracking userId="user123" userName="John Doe" />
        
        <Tabs defaultValue="community" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="career">Career Advancement</TabsTrigger>
          </TabsList>
          <TabsContent value="community" className="mt-6">
            <CommunityEngagement userId="user123" userName="John Doe" />
          </TabsContent>
          <TabsContent value="career" className="mt-6">
            <CareerAdvancement userId="user123" userName="John Doe" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
