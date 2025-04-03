'use client';

import React from 'react';
import ResumeTemplateCard from "../../components/resume/ResumeTemplateCard";

export default function ResumePage() {
  // Dummy handler example - replace with actual logic
  const handleCardClick = (templateName) => {
    console.log(`Clicked on template: ${templateName}`);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Professional Resume Templates</h1>
      <p className="text-lg mb-8">
        Stand out in the job market with our professionally crafted resume templates designed specifically for tech professionals.
        Each template is tailored to highlight the skills and experiences most valued by employers in the tech industry.
      </p>
      
      <div className="grid grid-cols-1 md-cols-2 lg-cols-3 gap-6 mb-12">
        <ResumeTemplateCard 
          title="DevOps Engineer Resume Pack"
          description="Comprehensive resume templates for DevOps professionals at all career stages"
          price="$29.99"
          roles={[
            "Entry-Level DevOps Engineer",
            "Mid-Level DevOps Engineer",
            "Senior DevOps Engineer / Architect"
          ]}
          onClick={() => handleCardClick('DevOps Engineer Resume Pack')}
        />
        
        <ResumeTemplateCard 
          title="AWS Cloud Engineer Resume Pack"
          description="Tailored resume templates for AWS Cloud professionals at all experience levels"
          price="$29.99"
          roles={[
            "Entry-Level AWS Cloud Engineer",
            "Mid-Level AWS Cloud Engineer",
            "Senior AWS Cloud Architect"
          ]}
          onClick={() => handleCardClick('AWS Cloud Engineer Resume Pack')}
        />
        
        <ResumeTemplateCard 
          title="SOC Analyst Resume Pack"
          description="Specialized resume templates for cybersecurity professionals focusing on security operations"
          price="$29.99"
          roles={[
            "Entry-Level SOC Analyst",
            "Mid-Level SOC Analyst",
            "Senior SOC Analyst / Security Operations Manager"
          ]}
          onClick={() => handleCardClick('SOC Analyst Resume Pack')}
        />
      </div>
      
      <div className="bg-gray-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Complete Resume Bundle</h2>
        <p className="text-lg mb-6">
          Get all resume templates at a discounted price. Perfect if you're exploring multiple career paths or want to see different formatting options.
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold">$69.99</p>
            <p className="text-sm text-gray-400">Save $19.98 compared to buying individually</p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover-primary/90 transition-colors">
            Purchase Bundle
          </button>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <h2>Why Our Resume Templates Stand Out</h2>
        <p>
          Our resume templates are crafted by industry professionals with years of experience in tech hiring and recruitment.
          They are specifically designed to highlight the skills, projects, and experiences that employers in the tech industry value most.
        </p>
        
        <h3>Each Resume Pack Includes:</h3>
        <ul>
          <li>Three complete resume templates for different career stages (entry-level, mid-level, senior)</li>
          <li>Customizable sections to highlight your specific skills and experiences</li>
          <li>Professional summaries tailored to each role</li>
          <li>Technical skills sections organized by relevance</li>
          <li>Project description examples that showcase practical experience</li>
          <li>Both Word and PDF formats for easy editing</li>
          <li>Detailed instructions for customization</li>
        </ul>
        
        <h3>Resume Writing Tips</h3>
        <p>
          Each template pack also includes a comprehensive guide with tips for customizing your resume, highlighting your strengths,
          and tailoring your application to specific job postings. Our guidance is based on feedback from actual hiring managers in the tech industry.
        </p>
        
        <h3>Satisfaction Guarantee</h3>
        <p>
          We're confident that our resume templates will help you present your skills and experience effectively.
          If you're not satisfied with your purchase, contact us within 30 days for a full refund.
        </p>
      </div>
    </div>
  );
}
