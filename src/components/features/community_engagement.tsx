'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Users, BookOpen, ThumbsUp, Flag } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CommunityEngagementProps {
  courseId: string
  courseName: string
}

export default function CommunityEngagement({ courseId, courseName }: CommunityEngagementProps) {
  const [activeTab, setActiveTab] = useState('discussions')
  const [newDiscussion, setNewDiscussion] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  
  // Mock data for discussions
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: 'Alex Johnson',
      avatar: '/avatars/alex.jpg',
      content: 'I found the section on threat detection particularly helpful. Has anyone implemented these techniques in a production environment?',
      timestamp: '2 hours ago',
      likes: 5,
      replies: 3,
    },
    {
      id: 2,
      author: 'Sam Rivera',
      avatar: '/avatars/sam.jpg',
      content: 'The hands-on lab in chapter 3 was excellent. I was able to follow along and get everything working on the first try.',
      timestamp: '1 day ago',
      likes: 12,
      replies: 7,
    },
  ])
  
  // Mock data for study groups
  const studyGroups = [
    {
      id: 1,
      name: `${courseName} Weekly Study Group`,
      members: 8,
      nextMeeting: 'Tomorrow, 7:00 PM EST',
      description: 'We meet weekly to discuss course materials and help each other with exercises.',
    },
    {
      id: 2,
      name: 'Advanced Practice Group',
      members: 5,
      nextMeeting: 'Saturday, 10:00 AM EST',
      description: 'For those who want to go beyond the course material and tackle more challenging problems.',
    },
  ]
  
  // Mock data for Q&A
  const [questions, setQuestions] = useState([
    {
      id: 1,
      author: 'Jordan Lee',
      avatar: '/avatars/jordan.jpg',
      question: 'In chapter 4, I\'m having trouble with the configuration step. Can someone explain how to properly set up the environment variables?',
      timestamp: '3 hours ago',
      answers: [
        {
          id: 101,
          author: 'Taylor Smith',
          avatar: '/avatars/taylor.jpg',
          content: 'Make sure you\'re creating the .env file in the root directory, not in the src folder. Also, remember that all variable names need to be prefixed with REACT_APP_',
          timestamp: '2 hours ago',
          isInstructor: true,
        }
      ]
    },
    {
      id: 2,
      author: 'Casey Morgan',
      avatar: '/avatars/casey.jpg',
      question: 'What\'s the best way to approach the final project? Should I start with the backend or frontend?',
      timestamp: '2 days ago',
      answers: [
        {
          id: 201,
          author: 'Riley Johnson',
          avatar: '/avatars/riley.jpg',
          content: 'I found it easier to start with defining the data models and API endpoints first, then build the frontend to consume them.',
          timestamp: '1 day ago',
          isInstructor: false,
        }
      ]
    }
  ])
  
  // Handler for posting a new discussion
  const handlePostDiscussion = () => {
    if (!newDiscussion.trim()) return
    
    const newPost = {
      id: discussions.length + 1,
      author: 'You',
      avatar: '/avatars/default.jpg',
      content: newDiscussion,
      timestamp: 'Just now',
      likes: 0,
      replies: 0,
    }
    
    setDiscussions([newPost, ...discussions])
    setNewDiscussion('')
  }
  
  // Handler for posting a new question
  const handlePostQuestion = () => {
    if (!newQuestion.trim()) return
    
    const newQuestionPost = {
      id: questions.length + 1,
      author: 'You',
      avatar: '/avatars/default.jpg',
      question: newQuestion,
      timestamp: 'Just now',
      answers: []
    }
    
    setQuestions([newQuestionPost, ...questions])
    setNewQuestion('')
  }
  
  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Community
        </CardTitle>
        <CardDescription className="text-gray-400">
          Connect with fellow learners and instructors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="discussions" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4 bg-gray-900">
            <TabsTrigger value="discussions" className="data-[state=active]:bg-blue-900">
              <MessageSquare className="h-4 w-4 mr-2" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="study-groups" className="data-[state=active]:bg-purple-900">
              <Users className="h-4 w-4 mr-2" />
              Study Groups
            </TabsTrigger>
            <TabsTrigger value="qa" className="data-[state=active]:bg-green-900">
              <BookOpen className="h-4 w-4 mr-2" />
              Q&A
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions" className="mt-0">
            <div className="mb-4">
              <Textarea 
                placeholder="Share your thoughts or insights about the course..." 
                className="bg-gray-900 border-gray-700 text-white"
                value={newDiscussion}
                onChange={(e) => setNewDiscussion(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={handlePostDiscussion}
                  disabled={!newDiscussion.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Post Discussion
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {discussions.map(discussion => (
                  <div key={discussion.id} className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={discussion.avatar} alt={discussion.author} />
                        <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{discussion.author}</span>
                          <span className="text-xs text-gray-400">{discussion.timestamp}</span>
                        </div>
                        <p className="mt-2 text-gray-300">{discussion.content}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{discussion.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400">
                            <Flag className="h-4 w-4" />
                            <span>Report</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="study-groups" className="mt-0">
            <div className="mb-4 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
              <h3 className="text-lg font-medium text-white mb-2">Join a Study Group</h3>
              <p className="text-gray-300 mb-4">
                Study groups help you stay motivated and learn from peers. Join an existing group or create your own.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Create New Study Group
              </Button>
            </div>
            
            <div className="space-y-4">
              {studyGroups.map(group => (
                <div key={group.id} className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">{group.name}</h4>
                      <p className="text-sm text-gray-400 mt-1">{group.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-gray-300">{group.members} members</span>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        <span className="font-medium">Next meeting:</span> {group.nextMeeting}
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Join Group
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="qa" className="mt-0">
            <div className="mb-4">
              <Textarea 
                placeholder="Ask a question about the course content..." 
                className="bg-gray-900 border-gray-700 text-white"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={handlePostQuestion}
                  disabled={!newQuestion.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Post Question
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {questions.map(question => (
                  <div key={question.id} className="rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-900 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={question.avatar} alt={question.author} />
                          <AvatarFallback>{question.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{question.author}</span>
                            <span className="text-xs text-gray-400">{question.timestamp}</span>
                          </div>
                          <p className="mt-2 text-gray-300">{question.question}</p>
                        </div>
                      </div>
                    </div>
                    
                    {question.answers.length > 0 && (
                      <div className="pl-8 pr-4 py-3 bg-gray-850 border-x border-b border-gray-700">
                        <h4 className="text-sm font-medium text-gray-400 mb-3">
                          {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
                        </h4>
                        <div className="space-y-4">
                          {question.answers.map(answer => (
                            <div key={answer.id} className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={answer.avatar} alt={answer.author} />
                                <AvatarFallback>{answer.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{answer.author}</span>
                                  {answer.isInstructor && (
                                    <span className="px-2 py-0.5 text-xs bg-blue-900 text-blue-300 rounded-full">
                                      Instructor
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-400 ml-auto">{answer.timestamp}</span>
                                </div>
                                <p className="mt-1 text-gray-300">{answer.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4">
                          <Textarea 
                            placeholder="Write your answer..." 
                            className="bg-gray-900 border-gray-700 text-white text-sm"
                          />
                          <div className="flex justify-end mt-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Submit Answer
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
        <div className="text-sm text-gray-400">
          {activeTab === 'discussions' && 'Join the conversation with fellow learners'}
          {activeTab === 'study-groups' && 'Learn together, achieve more'}
          {activeTab === 'qa' && 'Get help from instructors and peers'}
        </div>
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          Community Guidelines
        </Button>
      </CardFooter>
    </Card>
  )
}
