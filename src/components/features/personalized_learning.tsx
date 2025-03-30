'use client'

import React, { useState, useEffect } from 'react'
import Card from "../../components/ui/card-direct/Card.jsx"
import CardContent from "../../components/ui/card-direct/CardContent.jsx"
import CardDescription from "../../components/ui/card-direct/CardDescription.jsx"
import CardFooter from "../../components/ui/card-direct/CardFooter.jsx"
import CardHeader from "../../components/ui/card-direct/CardHeader.jsx"
import CardTitle from "../../components/ui/card-direct/CardTitle.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Search, BookOpen, Briefcase, TrendingUp, Award, ChevronRight, Filter, MapPin } from 'lucide-react'

interface PersonalizedLearningProps {
  userId: string
  userName: string
  userSkills?: string[]
  userInterests?: string[]
  careerGoal?: string
}

interface CourseRecommendation {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  skills: string[]
  rating: number
  enrolled: number
  image: string
  match: number
}

interface CareerPath {
  id: string
  title: string
  description: string
  avgSalary: string
  growthRate: string
  requiredSkills: string[]
  recommendedCourses: string[]
  jobOpenings: number
  timeToComplete: string
  image: string
}

interface SkillMap {
  id: string
  name: string
  level: number
  relatedSkills: string[]
  coursesToImprove: string[]
  industryDemand: 'High' | 'Medium' | 'Low'
}

export default function PersonalizedLearning({
  userId,
  userName,
  userSkills = ['JavaScript', 'React', 'HTML/CSS'],
  userInterests = ['Web Development', 'Cloud Computing', 'Cybersecurity'],
  careerGoal = 'Full Stack Developer'
}: PersonalizedLearningProps) {
  const [activeTab, setActiveTab] = useState('recommendations')
  const [searchQuery, setSearchQuery] = useState('')
  const [skillLevel, setSkillLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  const [timeCommitment, setTimeCommitment] = useState<'all' | 'short' | 'medium' | 'long'>('all')
  
  // Mock course recommendations data
  const [courseRecommendations, setCourseRecommendations] = useState<CourseRecommendation[]>([
    {
      id: 'course-1',
      title: 'Advanced React Patterns',
      description: 'Master advanced React patterns and build scalable applications',
      level: 'Advanced',
      duration: '8 weeks',
      skills: ['React', 'JavaScript', 'Redux', 'TypeScript'],
      rating: 4.8,
      enrolled: 3245,
      image: '/images/courses/react-advanced.jpg',
      match: 95
    },
    {
      id: 'course-2',
      title: 'AWS Cloud Architecture',
      description: 'Design and implement scalable cloud solutions with AWS',
      level: 'Intermediate',
      duration: '10 weeks',
      skills: ['AWS', 'Cloud Computing', 'DevOps', 'Terraform'],
      rating: 4.7,
      enrolled: 2890,
      image: '/images/courses/aws-cloud.jpg',
      match: 87
    },
    {
      id: 'course-3',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn the core principles of cybersecurity and threat prevention',
      level: 'Beginner',
      duration: '6 weeks',
      skills: ['Security', 'Network Security', 'Encryption', 'Risk Assessment'],
      rating: 4.6,
      enrolled: 4120,
      image: '/images/courses/cybersecurity.jpg',
      match: 82
    },
    {
      id: 'course-4',
      title: 'Node.js Microservices',
      description: 'Build scalable backend systems with Node.js microservices',
      level: 'Intermediate',
      duration: '8 weeks',
      skills: ['Node.js', 'Microservices', 'Docker', 'API Design'],
      rating: 4.9,
      enrolled: 1875,
      image: '/images/courses/nodejs.jpg',
      match: 91
    }
  ])
  
  // Mock career paths data
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([
    {
      id: 'career-1',
      title: 'Full Stack Developer',
      description: 'Build complete web applications from frontend to backend',
      avgSalary: '$105,000',
      growthRate: '+24% (2020-2030)',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'AWS'],
      recommendedCourses: ['Advanced React Patterns', 'Node.js Microservices', 'SQL Mastery'],
      jobOpenings: 12450,
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
      recommendedCourses: ['AWS Cloud Architecture', 'Kubernetes in Production', 'Infrastructure as Code'],
      jobOpenings: 8750,
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
      jobOpenings: 16200,
      timeToComplete: '6-12 months',
      image: '/images/careers/cybersecurity-analyst.jpg'
    }
  ])
  
  // Mock skill map data
  const [skillMap, setSkillMap] = useState<SkillMap[]>([
    {
      id: 'skill-1',
      name: 'JavaScript',
      level: 75,
      relatedSkills: ['TypeScript', 'React', 'Node.js', 'Vue.js'],
      coursesToImprove: ['JavaScript Performance Optimization', 'Advanced JavaScript Patterns'],
      industryDemand: 'High'
    },
    {
      id: 'skill-2',
      name: 'React',
      level: 80,
      relatedSkills: ['Redux', 'React Native', 'Next.js', 'GraphQL'],
      coursesToImprove: ['Advanced React Patterns', 'React Performance'],
      industryDemand: 'High'
    },
    {
      id: 'skill-3',
      name: 'HTML/CSS',
      level: 90,
      relatedSkills: ['SASS', 'Tailwind CSS', 'Bootstrap', 'Web Design'],
      coursesToImprove: ['Advanced CSS Animations', 'Responsive Design Mastery'],
      industryDemand: 'Medium'
    },
    {
      id: 'skill-4',
      name: 'Node.js',
      level: 40,
      relatedSkills: ['Express.js', 'MongoDB', 'REST APIs', 'GraphQL'],
      coursesToImprove: ['Node.js Microservices', 'Backend Development with Node.js'],
      industryDemand: 'High'
    },
    {
      id: 'skill-5',
      name: 'AWS',
      level: 30,
      relatedSkills: ['Cloud Computing', 'DevOps', 'Serverless', 'Infrastructure as Code'],
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
                <div>
                  <Label htmlFor="skill-level" className="text-sm text-gray-400 mr-2">Skill Level</Label>
                  <select
                    id="skill-level"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value as any)}
                    className="bg-gray-900 border border-gray-700 text-white rounded-md text-sm px-3 py-1"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="time-commitment" className="text-sm text-gray-400 mr-2">Time Commitment</Label>
                  <select
                    id="time-commitment"
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(e.target.value as any)}
                    className="bg-gray-900 border border-gray-700 text-white rounded-md text-sm px-3 py-1"
                  >
                    <option value="all">Any Duration</option>
                    <option value="short">Short (≤ 4 weeks)</option>
                    <option value="medium">Medium (5-8 weeks)</option>
                    <option value="long">Long (> 8 weeks)</option>
                  </select>
                </div>
                
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                  <Filter className="h-4 w-4 mr-1" />
                  More Filters
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recommended for You</h3>
                <span className="text-sm text-gray-400">Based on your profile and learning history</span>
              </div>
              
              {filteredRecommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRecommendations.map(course => (
                    <div key={course.id} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                      <div className="h-40 bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{course.title}</div>
                          <div className="text-gray-400 mt-2">{course.description}</div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <Badge className={`${
                            course.level === 'Beginner' ? 'bg-green-900/30 text-green-400 border-green-800' :
                            course.level === 'Intermediate' ? 'bg-blue-900/30 text-blue-400 border-blue-800' :
                            'bg-purple-900/30 text-purple-400 border-purple-800'
                          }`}>
                            {course.level}
                          </Badge>
                          <div className="text-sm text-gray-400">{course.duration}</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {course.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-800 border-gray-600">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span>{course.rating}</span>
                            <span className="text-gray-400 text-sm ml-2">({course.enrolled.toLocaleString()} enrolled)</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">Match:</span>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-black font-medium">
                              {course.match}%
                            </Badge>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          View Course
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="text-gray-400 mb-2">No courses match your current filters</div>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700" onClick={() => {
                    setSearchQuery('')
                    setSkillLevel('all')
                    setTimeCommitment('all')
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="career-paths" className="mt-0">
            <div className="mb-4">
              <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-lg border border-purple-800 p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <Briefcase className="h-12 w-12 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Your Career Goal: {careerGoal}</h3>
                    <p className="text-gray-300 mb-4">
                      We've created a personalized roadmap to help you achieve your career goal.
                      Follow the recommended paths and courses to build the skills you need.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        View Detailed Roadmap
                      </Button>
                      <Button variant="outline" className="border-purple-700 text-purple-300 hover:bg-purple-900/30">
                        Change Career Goal
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Explore Career Paths</h3>
              
              {careerPaths.map(career => (
                <div key={career.id} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="h-16 w-16 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                        <Briefcase className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xl font-medium">{career.title}</h4>
                          <Badge className={`${
                            career.title === careerGoal 
                              ? 'bg-green-900/30 text-green-400 border-green-800' 
                              : 'bg-gray-800 text-gray-300 border-gray-700'
                          }`}>
                            {career.title === careerGoal ? 'Current Goal' : 'Explore'}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mt-1">{career.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <div className="flex items-center text-gray-400 mb-2">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              <span className="text-sm">Career Outlook</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Avg. Salary:</span>
                                <span className="font-medium text-green-400">{career.avgSalary}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Growth Rate:</span>
                                <span className="font-medium text-green-400">{career.growthRate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Job Openings:</span>
                                <span className="font-medium">{career.jobOpenings.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Time to Complete:</span>
                                <span className="font-medium">{career.timeToComplete}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center text-gray-400 mb-2">
                              <Award className="h-4 w-4 mr-1" />
                              <span className="text-sm">Required Skills</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {career.requiredSkills.map((skill, index) => (
                                <Badge 
                                  key={index} 
                                  className={`${
                                    userSkills.includes(skill)
                                      ? 'bg-green-900/30 text-green-400 border-green-800'
                                      : 'bg-gray-800 text-gray-300 border-gray-700'
                                  }`}
                                >
                                  {userSkills.includes(skill) && '✓ '}
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Your Skill Match</span>
                                <span>
                                  {career.requiredSkills.filter(skill => userSkills.includes(skill)).length} of {career.requiredSkills.length} skills
                                </span>
                              </div>
                              <Progress 
                                value={Math.round((career.requiredSkills.filter(skill => userSkills.includes(skill)).length / career.requiredSkills.length) * 100)} 
                                className="h-2 bg-gray-700" 
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h5 className="text-sm font-medium text-gray-400 mb-2">Recommended Courses</h5>
                          <div className="space-y-2">
                            {career.recommendedCourses.map((course, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                                <span>{course}</span>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-850 border-t border-gray-700 p-4 flex justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">Top hiring locations: New York, San Francisco, Austin</span>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      View Career Path
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="skill-map" className="mt-0">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-green-900/40 to-teal-900/40 rounded-lg border border-green-800 p-6">
                <h3 className="text-xl font-medium mb-2">Your Skill Profile</h3>
                <p className="text-gray-300 mb-4">
                  Track your skills, identify gaps, and find learning opportunities to advance your career.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Current Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {userSkills.map((skill, index) => (
                        <Badge key={index} className="bg-blue-900/30 text-blue-400 border-blue-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {userInterests.map((interest, index) => (
                        <Badge key={index} className="bg-purple-900/30 text-purple-400 border-purple-800">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Career Goal</h4>
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-green-400 mr-2" />
                      <span className="font-medium">{careerGoal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Skill Assessment</h3>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                  Take Skill Assessment
                </Button>
              </div>
              
              <div className="space-y-4">
                {skillMap.map(skill => (
                  <div key={skill.id} className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <div className="flex items-center mt-1">
                          <Badge className={`${
                            skill.industryDemand === 'High' ? 'bg-green-900/30 text-green-400 border-green-800' :
                            skill.industryDemand === 'Medium' ? 'bg-blue-900/30 text-blue-400 border-blue-800' :
                            'bg-gray-800 text-gray-300 border-gray-700'
                          }`}>
                            {skill.industryDemand} Demand
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{skill.level}%</div>
                        <div className="text-xs text-gray-400">Proficiency</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Advanced</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            skill.level >= 80 ? 'bg-green-500' :
                            skill.level >= 50 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Related Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {skill.relatedSkills.map((relatedSkill, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-800 border-gray-600">
                              {relatedSkill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Recommended Courses</h5>
                        <div className="space-y-2">
                          {skill.coursesToImprove.map((course, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span>{course}</span>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
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
          {activeTab === 'recommendations' && 'Recommendations are updated weekly based on your progress'}
          {activeTab === 'career-paths' && 'Career data is sourced from industry reports and job market analysis'}
          {activeTab === 'skill-map' && 'Take skill assessments to get more accurate proficiency ratings'}
        </div>
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          Update Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}
