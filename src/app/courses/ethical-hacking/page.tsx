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
  title: 'Ethical Hacking | LearnEverything Academy',
  description: 'Master ethical hacking techniques, penetration testing, and security assessment methodologies.',
};

export default async function EthicalHackingCoursePage() {
  const chapters = await getChapters('ethical_hacking');

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Ethical Hacking</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Learn to identify and exploit security vulnerabilities ethically to help organizations improve their security posture.
        </p>
      </div>

      <div className="grid gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>
              What you'll learn in this comprehensive Ethical Hacking course
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Ethical Hacking Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand the core principles, methodologies, and legal aspects of ethical hacking
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Network Penetration Testing</h3>
                  <p className="text-sm text-muted-foreground">
                    Master techniques for identifying and exploiting network vulnerabilities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Web Application Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn to identify and exploit common web application vulnerabilities
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Mobile Application Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover techniques for testing and securing mobile applications
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Social Engineering</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand human-focused attacks and how to defend against them
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Cloud Security Testing</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply ethical hacking techniques to cloud environments
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
                    <Link href={`/courses/ethical-hacking/chapters/${index}`}>
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
                  <h3 className="font-medium">Networking Fundamentals</h3>
                  <p className="text-sm text-muted-foreground">
                    Strong understanding of TCP/IP, network protocols, and architecture
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Operating Systems</h3>
                  <p className="text-sm text-muted-foreground">
                    Familiarity with Windows, Linux, and command line interfaces
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
                    Knowledge of scripting languages like Python, Bash, or PowerShell
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-1 bg-primary/20 p-1 rounded-full">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Web Technologies</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding of HTTP, HTML, JavaScript, and web applications
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
                <h3 className="font-medium mb-2">Security Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  IT security specialists looking to enhance their offensive security skills
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Network Administrators</h3>
                <p className="text-sm text-muted-foreground">
                  Admins who want to better understand and secure their networks
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Aspiring Penetration Testers</h3>
                <p className="text-sm text-muted-foreground">
                  Those looking to start a career in ethical hacking and penetration testing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
