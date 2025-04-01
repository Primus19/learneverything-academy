import React from 'react';
import Link from 'next/link';

export default function ResumeTemplateCard({ title, description, image, slug }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
      <div className="aspect-[4/5] bg-muted relative">
        {/* Placeholder for resume template image */}
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Link 
          href={`/resume-templates/${slug}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 py-2 w-full"
        >
          Use Template
        </Link>
      </div>
    </div>
  );
}
