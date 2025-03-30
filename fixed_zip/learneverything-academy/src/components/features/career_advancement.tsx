'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Briefcase, Award, FileText, Download, ExternalLink, CheckCircle, Clock, Calendar, MapPin } from 'lucide-react'

interface CareerAdvancementProps {
  userId: string
  userName: string
  userSkills?: string[]
  completedCourses?: string[]
}

interface Certification {
  id: string
  name: string
  provider: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional'
  description: string
  requirements: string[]
  estimatedTime: string
  cost: string
  relevantCourses: string[]
  popularity: number
  image?: string
}

interface JobOpportunity {
  id: string
  title: string
  company: string
  location: string
  remote: boolean
  salary: string
  description: string
  requirements: string[]
  postedDate: string
  applicationDeadline: string
  relevantCourses: string[]
  relevantCertifications: string[]
}

interface CareerResource {
  id: string
  title: string
  type: 'Guide' | 'Template' | 'Checklist' | 'Video'
  description: string
  fileType?: string
  downloadUrl?: string
  externalUrl?: string
}

export default function CareerAdvancement({
  userId,
  userName,
  userSkills = ['JavaScript', 'React', 'HTML/CSS'],
  completedCourses = ['Introduction to DevOps', 'Cloud Engineering Fundamentals']
}: CareerAdvancementProps) {
  const [activeTab, setActiveTab] = useState('certifications')
  
  // Mock certification data
  const [certifications, setCertifications] = useState<Certification[]>([
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
      popularity: 95,
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
      popularity: 88,
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
      popularity: 82,
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
      popularity: 90,
      image: '/images/certifications/gcp-architect.png'
    }
  ])
  
  // Mock job opportunities data
  const [jobOpportunities, setJobOpportunities] = useState<JobOpportunity[]>([
    {
      id: 'job-1',
      title: 'Senior DevOps Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      remote: true,
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
      remote: true,
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
      remote: false,
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
  
  // Mock career resources data
  const [careerResources, setCareerResources] = useState<CareerResource[]>([
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
            <TabsTrigger value="job-opportunities" className="data-[state=active]:bg-purple-900">
              Job Opportunities
            </TabsTrigger>
            <TabsTrigger value="career-resources" className="data-[state=active]:bg-green-900">
              Career Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="certifications" className="mt-0">
            <div className="mb-4 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-lg border border-blue-800 p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <Award className="h-12 w-12 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Professional Certifications</h3>
                  <p className="text-gray-300 mb-4">
                    Boost your career with industry-recognized certifications. We've recommended certifications based on your completed courses and skills.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      View All Certifications
                    </Button>
                    <Button variant="outline" className="border-blue-700 text-blue-300 hover:bg-blue-900/30">
                      Take Skills Assessment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recommended for You</h3>
                <span className="text-sm text-gray-400">Based on your completed courses</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCertifications.map(cert => (
                  <div key={cert.id} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="h-16 w-16 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                          <Award className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-medium">{cert.name}</h4>
                          <div className="text-gray-400 mt-1">{cert.provider}</div>
                          
                          <Badge className={`mt-2 ${
                            cert.level === 'Beginner' ? 'bg-green-900/30 text-green-400 border-green-800' :
                            cert.level === 'Intermediate' ? 'bg-blue-900/30 text-blue-400 border-blue-800' :
                            cert.level === 'Advanced' ? 'bg-purple-900/30 text-purple-400 border-purple-800' :
                            'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                          }`}>
                            {cert.level}
                          </Badge>
                          
                          <p className="text-gray-300 mt-3">{cert.description}</p>
                          
                          <div className="mt-4 space-y-3">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm">Estimated Time: {cert.estimatedTime}</span>
                            </div>
                            <div className="flex items-center">
                              <Badge variant="outline" className="bg-gray-800 border-gray-600">
                                Cost: {cert.cost}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Key Requirements</h5>
                        <ul className="space-y-1">
                          {cert.requirements.slice(0, 3).map((req, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                          {cert.requirements.length > 3 && (
                            <li className="text-sm text-gray-400">
                              + {cert.requirements.length - 3} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Relevant Courses</h5>
                        <div className="flex flex-wrap gap-2">
                          {cert.relevantCourses.map((course, index) => (
                            <Badge 
                              key={index} 
                              className={`${
                                completedCourses.includes(course)
                                  ? 'bg-green-900/30 text-green-400 border-green-800'
                                  : 'bg-gray-800 text-gray-300 border-gray-700'
                              }`}
                            >
                              {completedCourses.includes(course) && '✓ '}
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-850 border-t border-gray-700 p-4 flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        <span className="font-medium text-white">{cert.popularity}%</span> of professionals in your field have this certification
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                  View All Certifications
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="job-opportunities" className="mt-0">
            <div className="mb-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-800 p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <Briefcase className="h-12 w-12 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Job Opportunities</h3>
                  <p className="text-gray-300 mb-4">
                    Discover job opportunities aligned with your skills and courses. We've curated positions that match your learning journey.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Browse All Jobs
                    </Button>
                    <Button variant="outline" className="border-purple-700 text-purple-300 hover:bg-purple-900/30">
                      Upload Resume
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recommended Jobs</h3>
                <span className="text-sm text-gray-400">Based on your profile and courses</span>
              </div>
              
              {recommendedJobs.length > 0 ? (
                <div className="space-y-4">
                  {recommendedJobs.map(job => (
                    <div key={job.id} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xl font-medium">{job.title}</h4>
                            <div className="text-gray-400 mt-1">{job.company}</div>
                            
                            <div className="flex items-center mt-2 space-x-3">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm">{job.location}</span>
                              </div>
                              {job.remote && (
                                <Badge className="bg-green-900/30 text-green-400 border-green-800">
                                  Remote
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">
                            {job.salary}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-300 mt-4">{job.description}</p>
                        
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-400 mb-2">Key Requirements</h5>
                          <ul className="space-y-1">
                            {job.requirements.slice(0, 3).map((req, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                            {job.requirements.length > 3 && (
                              <li className="text-sm text-gray-400">
                                + {job.requirements.length - 3} more requirements
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-2">Relevant Courses</h5>
                            <div className="flex flex-wrap gap-2">
                              {job.relevantCourses.map((course, index) => (
                                <Badge 
                                  key={index} 
                                  className={`${
                                    completedCourses.includes(course)
                                      ? 'bg-green-900/30 text-green-400 border-green-800'
                                      : 'bg-gray-800 text-gray-300 border-gray-700'
                                  }`}
                                >
                                  {completedCourses.includes(course) && '✓ '}
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-2">Desired Certifications</h5>
                            <div className="flex flex-wrap gap-2">
                              {job.relevantCertifications.map((cert, index) => (
                                <Badge 
                                  key={index}
                                  variant="outline" 
                                  className="bg-gray-800 border-gray-600"
                                >
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-850 border-t border-gray-700 p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm">Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm">Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            Save
                          </Button>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="text-gray-400 mb-2">No job matches found</div>
                  <p className="text-sm text-gray-500 mb-4">Complete more courses to unlock job recommendations</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Browse All Jobs
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="career-resources" className="mt-0">
            <div className="mb-4 bg-gradient-to-r from-green-900/40 to-teal-900/40 rounded-lg border border-green-800 p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <FileText className="h-12 w-12 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Career Resources</h3>
                  <p className="text-gray-300 mb-4">
                    Access tools, templates, and guides to help you in your job search and career advancement.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Browse All Resources
                    </Button>
                    <Button variant="outline" className="border-green-700 text-green-300 hover:bg-green-900/30">
                      Request Career Coaching
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Available Resources</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerResources.map(resource => (
                  <div key={resource.id} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="h-12 w-12 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                          {resource.type === 'Guide' && <FileText className="h-6 w-6 text-blue-400" />}
                          {resource.type === 'Template' && <FileText className="h-6 w-6 text-purple-400" />}
                          {resource.type === 'Checklist' && <CheckCircle className="h-6 w-6 text-green-400" />}
                          {resource.type === 'Video' && <FileText className="h-6 w-6 text-red-400" />}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="text-lg font-medium">{resource.title}</h4>
                            <Badge className="ml-2 bg-gray-800 text-gray-300 border-gray-700">
                              {resource.type}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-300 mt-2">{resource.description}</p>
                          
                          {resource.fileType && (
                            <Badge variant="outline" className="mt-3 bg-gray-800 border-gray-600">
                              {resource.fileType}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-850 border-t border-gray-700 p-4 flex justify-end">
                      {resource.downloadUrl && (
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      {resource.externalUrl && (
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Resource
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
        <div className="text-sm text-gray-400">
          {activeTab === 'certifications' && 'Certification information is updated monthly based on industry trends'}
          {activeTab === 'job-opportunities' && 'Job listings are refreshed weekly from our partner networks'}
          {activeTab === 'career-resources' && 'Resources are curated by career development experts'}
        </div>
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          Get Personalized Advice
        </Button>
      </CardFooter>
    </Card>
  )
}
