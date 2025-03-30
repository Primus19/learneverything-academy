'use client'

import React, { useState, useEffect } from 'react'
import Card from "../../components/ui/card-direct/Card.jsx"
import CardContent from "../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../components/ui/card-direct/CardDescription.jsx"
import CardFooter from "../../components/ui/card-direct/CardFooter.jsx"
import CardHeader from "../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../components/ui/card-direct/CardTitle.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs.jsx"
import { Button } from "../../components/ui/button.jsx"
import { Input } from "../../components/ui/input.jsx"
import { Label } from "../../components/ui/label.jsx"
import { ScrollArea } from "../../components/ui/scroll-area.jsx"
import { Badge } from "../../components/ui/badge.jsx"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar.jsx"
import { Progress } from "../../components/ui/progress.jsx"
import { Search, BookOpen, Briefcase, TrendingUp, Award, ChevronRight, Filter, MapPin } from 'lucide-react'

export default function PersonalizedLearning({
  userId,
  userName,
  userSkills = ['JavaScript', 'React', 'HTML/CSS'],
  userInterests = ['Web Development', 'Cloud Computing', 'Cybersecurity'],
  careerGoal = 'Full Stack Developer'
}) {
  const [activeTab, setActiveTab] = useState('recommendations')
  const [searchQuery, setSearchQuery] = useState('')
  // Removed TypeScript type annotations
  const [skillLevel, setSkillLevel] = useState('all')
  const [timeCommitment, setTimeCommitment] = useState('all')
  
  // Mock course recommendations data - removed TypeScript generic
  const [courseRecommendations, setCourseRecommendations] = useState([
    {
      id: 'course-1',
      title: 'Advanced React Patterns',
      description: 'Master advanced React patterns and build scalable applications',
      level: 'Advanced',
      duration: '8 weeks',
      skills: ['React', 'JavaScript', 'Redux', 'TypeScript'],
      rating: 4.8, // Fixed syntax error
      enrolled: 1245, // Fixed undefined variable
      image: '/images/courses/react-advanced.jpg',
      match: 95 // Fixed undefined variable
    },
    {
      id: 'course-2',
      title: 'AWS Cloud Architecture',
      description: 'Design and implement scalable cloud solutions with AWS',
      level: 'Intermediate',
      duration: '10 weeks',
      skills: ['AWS', 'Cloud Computing', 'DevOps', 'Terraform'],
      rating: 4.7, // Fixed syntax error
      enrolled: 987, // Fixed undefined variable
      image: '/images/courses/aws-cloud.jpg',
      match: 88 // Fixed undefined variable
    },
    {
      id: 'course-3',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn the core principles of cybersecurity and threat prevention',
      level: 'Beginner',
      duration: '6 weeks',
      skills: ['Security', 'Network Security', 'Encryption', 'Risk Assessment'],
      rating: 4.6, // Fixed syntax error
      enrolled: 1532, // Fixed undefined variable
      image: '/images/courses/cybersecurity.jpg',
      match: 82 // Fixed undefined variable
    },
    {
      id: 'course-4',
      title: 'Node.js Microservices',
      description: 'Build scalable backend systems with Node.js microservices',
      level: 'Intermediate',
      duration: '8 weeks',
      skills: ['Node.js', 'Microservices', 'Docker', 'API Design'],
      rating: 4.9, // Fixed syntax error
      enrolled: 876, // Fixed undefined variable
      image: '/images/courses/nodejs.jpg',
      match: 91 // Fixed undefined variable
    }
  ])
  
  // Mock career paths data - removed TypeScript generic
  const [careerPaths, setCareerPaths] = useState([
    {
      id: 'career-1',
      title: 'Full Stack Developer',
      description: 'Build complete web applications from frontend to backend',
      avgSalary: '$105,000',
      growthRate: '+24% (2020-2030)',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'AWS'],
      recommendedCourses: ['Advanced React Patterns', 'Node.js Microservices', 'SQL Mastery'],
      jobOpenings: 5280, // Fixed undefined variable
      timeToComplete: '9-12 months',
      image: '/images/careers/fullstack.jpg'
    },
    {
      id: 'career-2',
      title: 'Cloud Solutions Architect',
      description: 'Design and implement cloud infrastructure and solutions',
      avgSalary: '$135,000',
      growthRate: '+15% (2020-2030)',
      requiredSkills: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'DevOps', 'Networking'],
      recommendedCourses: ['AWS Cloud Architecture', 'Kubernetes in Production', 'Infrastructure'],
      jobOpenings: 3750, // Fixed undefined variable
      timeToComplete: '12-18 months',
      image: '/images/careers/cloud-architect.jpg'
    },
    {
      id: 'career-3',
      title: 'Cybersecurity Analyst',
      description: 'Protect organizations from digital threats and vulnerabilities',
      avgSalary: '$95,000',
      growthRate: '+33% (2020-2030)',
      requiredSkills: ['Network Security', 'Penetration Testing', 'Security Frameworks', 'Risk Assessment'],
      recommendedCourses: ['Cybersecurity Fundamentals', 'Ethical Hacking', 'Security Compliance'],
      jobOpenings: 4200, // Fixed undefined variable
      timeToComplete: '6-12 months',
      image: '/images/careers/cybersecurity-analyst.jpg'
    }
  ])
  
  // Mock skill map data - removed TypeScript generic
  const [skillMap, setSkillMap] = useState([
    {
      id: 'skill-1',
      name: 'JavaScript',
      level: 'Intermediate', // Fixed undefined variable
      relatedSkills: ['TypeScript', 'React', 'Node.js', 'Vue.js'],
      coursesToImprove: ['JavaScript Performance Optimization', 'Advanced JavaScript Patterns'],
      industryDemand: 'High'
    },
    {
      id: 'skill-2',
      name: 'React',
      level: 'Intermediate', // Fixed undefined variable
      relatedSkills: ['Redux', 'React Native', 'Next.js', 'GraphQL'],
      coursesToImprove: ['Advanced React Patterns', 'React Performance'],
      industryDemand: 'High'
    },
    {
      id: 'skill-3',
      name: 'HTML/CSS',
      level: 'Advanced', // Fixed undefined variable
      relatedSkills: ['SASS', 'Tailwind CSS', 'Bootstrap', 'Web Design'],
      coursesToImprove: ['Advanced CSS Animations', 'Responsive Design Mastery'],
      industryDemand: 'Medium'
    },
    {
      id: 'skill-4',
      name: 'Node.js',
      level: 'Beginner', // Fixed undefined variable
      relatedSkills: ['Express.js', 'MongoDB', 'REST APIs', 'GraphQL'],
      coursesToImprove: ['Node.js Microservices', 'Backend Development with Node.js'],
      industryDemand: 'High'
    },
    {
      id: 'skill-5',
      name: 'AWS',
      level: 'Beginner', // Fixed undefined variable
      relatedSkills: ['Cloud Computing', 'DevOps', 'Serverless', 'Infrastructure'],
      coursesToImprove: ['AWS Cloud Architecture', 'AWS Certified Solutions Architect'],
      industryDemand: 'High'
    }
  ])
  
  // Filter recommendations based on search and filters
  const filteredRecommendations = courseRecommendations.filter(course => {
    // Filter by search query
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false
    }
    
    // Filter by skill level
    if (skillLevel !== 'all' && course.level.toLowerCase() !== skillLevel) {
      return false
    }
    
    // Filter by time commitment
    if (timeCommitment !== 'all') {
      const weeks = parseInt(course.duration.split(' ')[0])
      if (timeCommitment === 'short' && weeks > 4) return false
      if (timeCommitment === 'medium' && (weeks <= 4 || weeks > 8)) return false
      if (timeCommitment === 'long' && weeks <= 8) return false
    }
    
    return true
  })
  
  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Personalized Learning
        </CardTitle>
        <CardDescription className="text-gray-400">
          Customized learning paths based on your skills, interests, and career goals
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="recommendations" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4 bg-gray-900">
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-blue-900">
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="career-paths" className="data-[state=active]:bg-purple-900">
              Career Paths
            </TabsTrigger>
            <TabsTrigger value="skill-map" className="data-[state=active]:bg-green-900">
              Skill Map
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="mt-0">
            <div className="mb-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses, skills, or topics..."
                  className="pl-10 bg-gray-900 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <Label htmlFor="skill-level" className="text-sm text-gray-400 mr-2">Skill Level</Label>
                  <select
                    id="skill-level"
                    className="bg-gray-900 border border-gray-700 rounded-md text-white text-sm p-1"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <Label htmlFor="time-commitment" className="text-sm text-gray-400 mr-2">Duration</Label>
                  <select
                    id="time-commitment"
                    className="bg-gray-900 border border-gray-700 rounded-md text-white text-sm p-1"
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(e.target.value)}
                  >
                    <option value="all">Any Duration</option>
                    <option value="short">Short (≤ 4 weeks)</option>
                    <option value="medium">Medium (5-8 weeks)</option>
                    <option value="long">Long (> 8 weeks)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {filteredRecommendations.map(course => (
                  <div key={course.id} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{course.title}</h3>
                          <div className="flex items-center mt-1">
                            <Badge className="bg-blue-900/30 text-blue-400 border-blue-800 mr-2">
                              {course.level}
                            </Badge>
                            <span className="text-sm text-gray-400">{course.duration}</span>
                          </div>
                        </div>
                        <Badge className="bg-green-900/30 text-green-400 border-green-800">
                          {course.match}% Match
                        </Badge>
                      </div>
                      
                      <p className="mt-2 text-gray-300">{course.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-800 border-gray-600">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span>{course.rating}</span>
                          <span className="mx-2">•</span>
                          <span>{course.enrolled.toLocaleString()} enrolled</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-850 border-t border-gray-700 p-3 flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        View Course
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="career-paths">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {careerPaths.map(career => (
                  <div key={career.id} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{career.title}</h3>
                          <p className="text-sm text-gray-400">
                            {career.timeToComplete} to complete • {career.jobOpenings.toLocaleString()} job openings
                          </p>
                        </div>
                        <Badge className="bg-purple-900/30 text-purple-400 border-purple-800">
                          {career.avgSalary}
                        </Badge>
                      </div>
                      
                      <p className="mt-2 text-gray-300">{career.description}</p>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.requiredSkills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-800 border-gray-600">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-2">Growth Rate:</h4>
                        <Badge className="bg-green-900/30 text-green-400 border-green-800">
                          {career.growthRate}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="bg-gray-850 border-t border-gray-700 p-3 flex justify-end">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Explore Career Path
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="skill-map">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {skillMap.map(skill => (
                  <div key={skill.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{skill.name}</h3>
                        <Badge className="mt-1 bg-blue-900/30 text-blue-400 border-blue-800">
                          {skill.level}
                        </Badge>
                      </div>
                      <Badge className={`
                        ${skill.industryDemand === 'High' ? 'bg-green-900/30 text-green-400 border-green-800' : 
                          skill.industryDemand === 'Medium' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800' :
                          'bg-red-900/30 text-red-400 border-red-800'}
                      `}>
                        {skill.industryDemand} Demand
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-2">Related Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.relatedSkills.map((relatedSkill, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-800 border-gray-600">
                            {relatedSkill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-2">Courses to Improve:</h4>
                      <ul className="text-sm text-gray-400 space-y-1 list-disc pl-5">
                        {skill.coursesToImprove.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
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
          Recommendations based on your skills, interests, and career goals
        </div>
        <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
          View All Recommendations
        </Button>
      </CardFooter>
    </Card>
  )
}
