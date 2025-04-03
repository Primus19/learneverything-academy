import React from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/components";
import Navbar from "../../../../components/layout/Navbar";
import ChapterViewer from "../../../../components/courses/ChapterViewer";

export default function CourseChapterPage({ params }) {
  const { slug, chapterIndex } = params;
  const chapterNumber = parseInt(chapterIndex) + 1;
  
  // This would normally come from a database or API
  const courseData = {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    chapter: {
      title: `Chapter ${chapterNumber}: Sample Chapter Title`,
      content: `
# Chapter ${chapterNumber}: Sample Chapter Title

This is a sample chapter content for the ${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} course.

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.

## Main Content

- Point 1: Lorem ipsum dolor sit amet
- Point 2: Consectetur adipiscing elit
- Point 3: Nullam euismod, nisl eget aliquam ultricies

## Code Example

\`\`\`javascript
function example() {
  console.log("This is a code example");
  return true;
}
\`\`\`

## Summary

In this chapter, we covered the basics of the topic. In the next chapter, we will dive deeper into more advanced concepts.
      `
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href={`/courses/${slug}`} className="text-primary hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Course
            </Link>
            
            <h1 className="text-3xl font-bold mt-4">{courseData.title}</h1>
            <h2 className="text-xl text-muted-foreground">{courseData.chapter.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <ChapterViewer content={courseData.chapter.content} />
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 flex justify-between">
                {parseInt(chapterIndex) > 0 ? (
                  <Button asChild variant="outline">
                    <Link href={`/courses/${slug}/chapters/${parseInt(chapterIndex) - 1}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous Chapter
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button asChild>
                  <Link href={`/courses/${slug}/chapters/${parseInt(chapterIndex) + 1}`}>
                    Next Chapter
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Chapter Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <Link
                        key={index}
                        href={`/courses/${slug}/chapters/${index}`}
                        className={`flex items-center px-3 py-2 text-sm rounded-md ${
                          parseInt(chapterIndex) === index
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        Chapter {index + 1}
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Chapter PDF
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Video Tutorial
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-primary hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Exercise Files
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
