'use client'

import React, { useState, useEffect } from 'react'
import Card from "../../components/ui/card-direct/Card.jsx"
import CardContent from "../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../components/ui/card-direct/CardDescription.jsx"
import CardFooter from "../../components/ui/card-direct/CardFooter.jsx"
import CardHeader from "../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../components/ui/card-direct/CardTitle.jsx"
import { Button } from "../../components/ui/button.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs.jsx"
import { Badge } from "../../components/ui/badge.jsx"
import { ScrollArea } from "../../components/ui/scroll-area.jsx"
import { Briefcase, Award, FileText, Download, ExternalLink, CheckCircle, Clock, Calendar, MapPin } from 'lucide-react'

export default function CareerAdvancement({
  userId,
  userName,
  userSkills = ['JavaScript', 'React', 'HTML/CSS'],
  completedCourses = ['Introduction to DevOps', 'Cloud Engineering Fundamentals']
}) {
  const [activeTab, setActiveTab] = useState('certifications')
  
  // Mock certification data - removed TypeScript generic
  const [certifications, setCertifications] = useState([
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      provider: 'Amazon Web Services',
      level: 'Professional',
      description: 'Validate your expertise in designing distributed systems on AWS',
      requirements: [
        'Understanding of AWS architecture best practices',
        'Experience with AWS deployment and management',
        'Knowledge of networking concepts',
        'Understanding of security practices'
      ],
      estimatedTime: '3-6 months',
      cost: '$150',
      relevantCourses: ['Cloud Engineering Fundamentals', 'AWS Cloud Architecture'],
      popularity: 95, // Fixed undefined variable
      image: '/images/certifications/aws-solutions-architect.png'
    },
    {
      id: 'cert-2',
      name: 'Certified Ethical Hacker (CEH)',
      provider: 'EC-Council',
      level: 'Professional',
      description: 'Learn to think like a hacker and protect systems from cyber threats',
      requirements: [
        'Understanding of network security concepts',
        'Knowledge of common attack vectors',
        'Familiarity with security tools and techniques',
        'Basic programming knowledge'
      ],
      estimatedTime: '2-3 months',
      cost: '$950',
      relevantCourses: ['Introduction to Ethical Hacking', 'Network Penetration Testing'],
      popularity: 88, // Fixed undefined variable
      image: '/images/certifications/ceh.png'
    },
    {
      id: 'cert-3',
      name: 'Professional Scrum Master I',
      provider: 'Scrum.org',
      level: 'Intermediate',
      description: 'Demonstrate your knowledge of Scrum and ability to apply it in real-world scenarios',
      requirements: [
        'Understanding of Scrum framework',
        'Knowledge of Scrum roles, events, and artifacts',
        'Experience with agile methodologies'
      ],
      estimatedTime: '1-2 months',
      cost: '$150',
      relevantCourses: ['Agile Project Management', 'Scrum Fundamentals'],
      popularity: 82, // Fixed undefined variable
      image: '/images/certifications/psm.png'
    },
    {
      id: 'cert-4',
      name: 'Google Professional Cloud Architect',
      provider: 'Google Cloud',
      level: 'Professional',
      description: 'Validate your ability to design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions using Google Cloud',
      requirements: [
        'Experience with Google Cloud Platform',
        'Understanding of cloud architecture principles',
        'Knowledge of networking, security, and compliance',
        'Experience with cloud-native applications'
      ],
      estimatedTime: '3-6 months',
      cost: '$200',
      relevantCourses: ['Cloud Engineering Fundamentals', 'Google Cloud Platform Essentials'],
      popularity: 90, // Fixed undefined variable
      image: '/images/certifications/gcp-architect.png'
    }
  ])
  
  // Mock job opportunities data - removed TypeScript generic
  const [jobOpportunities, setJobOpportunities] = useState([
    {
      id: 'job-1',
      title: 'Senior DevOps Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      remote: true, // Fixed undefined variable
      salary: '$120,000 - $150,000',
      description: 'Join our team to build and maintain our cloud infrastructure and CI/CD pipelines',
      requirements: [
        '5+ years of experience with AWS or similar cloud platforms',
        'Strong knowledge of Docker and Kubernetes',
        'Experience with CI/CD tools like Jenkins, GitLab CI',
        'Proficiency in scripting languages (Python, Bash)'
      ],
      postedDate: '2024-03-15',
      applicationDeadline: '2024-04-15',
      relevantCourses: ['Introduction to DevOps', 'Cloud Engineering Fundamentals', 'Kubernetes in Production'],
      relevantCertifications: ['AWS Certified DevOps Engineer', 'Certified Kubernetes Administrator']
    },
    {
      id: 'job-2',
      title: 'Cloud Security Specialist',
      company: 'SecureNet Inc.',
      location: 'Remote',
      remote: true, // Fixed undefined variable
      salary: '$110,000 - $140,000',
      description: 'Help us secure our cloud infrastructure and implement security best practices',
      requirements: [
        'Strong understanding of cloud security principles',
        'Experience with AWS security services',
        'Knowledge of compliance frameworks (SOC2, HIPAA, etc.)',
        'Familiarity with security automation'
      ],
      postedDate: '2024-03-20',
      applicationDeadline: '2024-04-20',
      relevantCourses: ['Cloud Security Fundamentals', 'Security Operations Center (SOC)', 'Risk Management'],
      relevantCertifications: ['AWS Certified Security Specialty', 'Certified Information Systems Security Professional (CISSP)']
    },
    {
      id: 'job-3',
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      location: 'Austin, TX',
      remote: false, // Fixed undefined variable
      salary: '$90,000 - $120,000',
      description: 'Develop and maintain our web applications using modern JavaScript frameworks',
      requirements: [
        'Strong proficiency in JavaScript/TypeScript',
        'Experience with React and Node.js',
        'Knowledge of RESTful APIs and GraphQL',
        'Understanding of database design and SQL/NoSQL databases'
      ],
      postedDate: '2024-03-25',
      applicationDeadline: '2024-04-25',
      relevantCourses: ['Modern JavaScript Development', 'React Fundamentals', 'Node.js Backend Development'],
      relevantCertifications: ['MongoDB Certified Developer', 'AWS Certified Developer']
    }
  ])
  
  // Mock career resources data - removed TypeScript generic
  const [careerResources, setCareerResources] = useState([
    {
      id: 'resource-1',
      title: 'Technical Resume Template',
      type: 'Template',
      description: 'ATS-friendly resume template optimized for technical roles',
      fileType: 'DOCX',
      downloadUrl: '/resources/technical-resume-template.docx'
    },
    {
      id: 'resource-2',
      title: 'Technical Interview Preparation Guide',
      type: 'Guide',
      description: 'Comprehensive guide to ace technical interviews',
      fileType: 'PDF',
      downloadUrl: '/resources/technical-interview-guide.pdf'
    },
    {
      id: 'resource-3',
      title: 'LinkedIn Profile Optimization Checklist',
      type: 'Checklist',
      description: 'Step-by-step checklist to improve your LinkedIn profile visibility',
      fileType: 'PDF',
      downloadUrl: '/resources/linkedin-optimization-checklist.pdf'
    },
    {
      id: 'resource-4',
      title: 'Salary Negotiation Strategies',
      type: 'Video',
      description: 'Expert tips on negotiating your tech salary',
      externalUrl: 'https://www.youtube.com/watch?v=example'
    },
    {
      id: 'resource-5',
      title: 'Cover Letter Templates',
      type: 'Template',
      description: 'Customizable cover letter templates for different tech roles',
      fileType: 'DOCX',
      downloadUrl: '/resources/cover-letter-templates.docx'
    }
  ])
  
  // Filter certifications based on completed courses
  const recommendedCertifications = certifications.filter(cert => 
    cert.relevantCourses.some(course => completedCourses.includes(course))
  ).sort((a, b) => b.popularity - a.popularity)
  
  // Filter job opportunities based on completed courses
  const recommendedJobs = jobOpportunities.filter(job => 
    job.relevantCourses.some(course => completedCourses.includes(course))
  )
  
  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Career Advancement
        </CardTitle>
        <CardDescription className="text-gray-400">
          Tools and resources to help you advance your career in technology
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="certifications" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4 bg-gray-900">
            <TabsTrigger value="certifications" className="data-[state=active]:bg-blue-900">
              Certifications
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-900">
              Job Opportunities
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-blue-900">
              Career Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="certifications">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {recommendedCertifications.map(cert => (
                  <div key={cert.id} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{cert.name}</h3>
                          <p className="text-sm text-gray-400">{cert.provider} • {cert.level}</p>
                        </div>
                        <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">
                          {cert.cost}
                        </Badge>
                      </div>
                      
                      <p className="mt-2 text-gray-300">{cert.description}</p>
                      
                      <div className="mt-3 flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Estimated time: {cert.estimatedTime}</span>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-400 space-y-1 list-disc pl-5">
                          {cert.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-850 border-t border-gray-700 p-3 flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Explore Certification
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="jobs">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {recommendedJobs.map(job => (
                  <div key={job.id} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{job.title}</h3>
                          <p className="text-sm text-gray-400">{job.company}</p>
                        </div>
                        <Badge className="bg-green-900/30 text-green-400 border-green-800">
                          {job.salary}
                        </Badge>
                      </div>
                      
                      <div className="mt-2 flex items-center text-sm text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                        {job.remote && (
                          <Badge variant="outline" className="ml-2 bg-gray-800 border-gray-600">
                            Remote
                          </Badge>
                        )}
                      </div>
                      
                      <p className="mt-2 text-gray-300">{job.description}</p>
                      
                      <div className="mt-3 flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-400 space-y-1 list-disc pl-5">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-850 border-t border-gray-700 p-3 flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Job Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="resources">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {careerResources.map(resource => (
                  <div key={resource.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{resource.title}</h3>
                        <Badge variant="outline" className="mt-1 bg-gray-800 border-gray-600">
                          {resource.type}
                        </Badge>
                      </div>
                      {resource.fileType && (
                        <Badge className="bg-purple-900/30 text-purple-400 border-purple-800">
                          {resource.fileType}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="mt-2 text-gray-300">{resource.description}</p>
                    
                    <div className="mt-4 flex justify-end">
                      {resource.downloadUrl && (
                        <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      
                      {resource.externalUrl && (
                        <Button className="bg-gray-700 hover:bg-gray-600 flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Resource
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t border-gray-700 pt-4 flex justify-between">
        <div className="text-sm text-gray-400">
          Recommendations based on your completed courses and skills
        </div>
        <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
          View All Resources
        </Button>
      </CardFooter>
    </Card>
  )
}
