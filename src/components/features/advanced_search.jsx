'use client'

import React, { useState, useEffect } from 'react'
// Using direct imports instead of destructured imports
import Card from "../ui/card-direct/Card"
import CardContent from "../ui/card-direct/CardContent"
import CardDescription from "../ui/card-direct/CardDescription"
import CardFooter from "../ui/card-direct/CardFooter"
import CardHeader from "../ui/card-direct/CardHeader"
import CardTitle from "../ui/card-direct/CardTitle"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import { Search, Filter, SlidersHorizontal, Clock, BookOpen, Tag, BarChart, Briefcase, ChevronDown, ChevronUp, Check } from 'lucide-react'

// Search Results List Component - Moved before the main component to fix build error
function SearchResultsList({ results }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-700">
        <div className="text-gray-400 mb-2">No results match your search criteria</div>
        <p className="text-sm text-gray-500">Try adjusting your filters or search terms</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {results.map(result => (
        <div key={result.id} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              {result.type === 'course' && (
                <div className="h-20 w-20 bg-gray-800 rounded-md flex items-center justify-center mr-4 flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={`mb-2 ${
                      result.type === 'course' ? 'bg-blue-900/30 text-blue-400 border-blue-800' :
                      result.type === 'article' ? 'bg-purple-900/30 text-purple-400 border-purple-800' :
                      result.type === 'tutorial' ? 'bg-green-900/30 text-green-400 border-green-800' :
                      'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                    }`}>
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </Badge>
                    <h3 className="text-lg font-medium">{result.title}</h3>
                  </div>
                  {result.rating && (
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{result.rating}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 mt-1">{result.description}</p>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                  {result.author && (
                    <div className="text-sm text-gray-400">
                      By: {result.author}
                    </div>
                  )}
                  
                  {result.date && (
                    <div className="text-sm text-gray-400">
                      {new Date(result.date).toLocaleDateString()}
                    </div>
                  )}
                  
                  {result.duration && (
                    <div className="text-sm text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {result.duration}
                    </div>
                  )}
                  
                  {result.level && (
                    <Badge variant="outline" className="bg-gray-800 border-gray-600">
                      {result.level}
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {result.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-800 border-gray-600">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-850 border-t border-gray-700 p-3 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">
              {result.type === 'course' ? 'View Course' : 
               result.type === 'article' ? 'Read Article' : 
               result.type === 'tutorial' ? 'Start Tutorial' : 'View Resource'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AdvancedSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  
  // Filter states
  const [selectedContentTypes, setSelectedContentTypes] = useState(['course', 'article', 'tutorial', 'resource'])
  const [selectedLevels, setSelectedLevels] = useState(['Beginner', 'Intermediate', 'Advanced'])
  const [selectedDurations, setSelectedDurations] = useState(['short', 'medium', 'long'])
  const [selectedTopics, setSelectedTopics] = useState([])
  const [dateRange, setDateRange] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  
  // Available topics for filtering
  const availableTopics = [
    'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'DevOps', 
    'Cloud Computing', 'Cybersecurity', 'Data Science', 'Machine Learning',
    'Web Development', 'Mobile Development', 'Database', 'Networking',
    'Blockchain', 'UI/UX Design', 'Project Management', 'Agile'
  ]
  
  // Mock search results data
  const mockResults = [
    {
      id: 'course-1',
      type: 'course',
      title: 'Advanced React Patterns',
      description: 'Master advanced React patterns and build scalable applications',
      author: 'Sarah Johnson',
      date: '2023-11-15',
      duration: '8 weeks',
      level: 'Advanced',
      topics: ['JavaScript', 'React', 'Web Development'],
      rating: 4.8,
      image: '/images/courses/react-advanced.jpg'
    },
    {
      id: 'article-1',
      type: 'article',
      title: 'Understanding AWS Lambda Functions',
      description: 'A comprehensive guide to serverless computing with AWS Lambda',
      author: 'Michael Chen',
      date: '2024-02-20',
      topics: ['AWS', 'Cloud Computing', 'Serverless'],
      rating: 4.5
    },
    {
      id: 'tutorial-1',
      type: 'tutorial',
      title: 'Building a REST API with Node.js and Express',
      description: 'Step-by-step tutorial for creating a RESTful API',
      author: 'David Wilson',
      date: '2024-01-10',
      duration: '2 hours',
      level: 'Intermediate',
      topics: ['JavaScript', 'Node.js', 'API Development'],
      rating: 4.7
    },
    {
      id: 'resource-1',
      type: 'resource',
      title: 'Python Data Science Cheat Sheet',
      description: 'Essential commands and functions for data analysis with Python',
      author: 'Emma Rodriguez',
      date: '2023-12-05',
      topics: ['Python', 'Data Science'],
      rating: 4.9
    },
    {
      id: 'course-2',
      type: 'course',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn the core principles of cybersecurity and threat prevention',
      author: 'James Smith',
      date: '2024-03-01',
      duration: '6 weeks',
      level: 'Beginner',
      topics: ['Cybersecurity', 'Networking', 'Security'],
      rating: 4.6,
      image: '/images/courses/cybersecurity.jpg'
    },
    {
      id: 'article-2',
      type: 'article',
      title: 'The Future of Machine Learning in 2025',
      description: 'Exploring upcoming trends and technologies in ML',
      author: 'Lisa Wang',
      date: '2024-03-15',
      topics: ['Machine Learning', 'AI', 'Data Science'],
      rating: 4.4
    }
  ]
  
  // Toggle filter selection
  const toggleFilter = (type, value) => {
    switch (type) {
      case 'contentType':
        setSelectedContentTypes(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        )
        break
      case 'level':
        setSelectedLevels(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        )
        break
      case 'duration':
        setSelectedDurations(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        )
        break
      case 'topic':
        setSelectedTopics(prev => 
          prev.includes(value) 
            ? prev.filter(item => item !== value)
            : [...prev, value]
        )
        break
    }
  }
  
  // Perform search with filters
  const performSearch = () => {
    // In a real implementation, this would call an API with all the filter parameters
    // For demo purposes, we'll filter the mock data
    
    const filteredResults = mockResults.filter(result => {
      // Filter by search query
      if (searchQuery && !result.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !result.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !result.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false
      }
      
      // Filter by content type
      if (!selectedContentTypes.includes(result.type)) {
        return false
      }
      
      // Filter by level (if applicable)
      if (result.level && !selectedLevels.includes(result.level)) {
        return false
      }
      
      // Filter by topics
      if (selectedTopics.length > 0 && !result.topics.some(topic => selectedTopics.includes(topic))) {
        return false
      }
      
      // Filter by date range
      if (dateRange !== 'all' && result.date) {
        const resultDate = new Date(result.date)
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        
        if (dateRange === 'week' && resultDate < weekAgo) return false
        if (dateRange === 'month' && resultDate < monthAgo) return false
        if (dateRange === 'year' && resultDate < yearAgo) return false
      }
      
      // Filter by duration (if applicable)
      if (result.duration) {
        const durationValue = parseInt(result.duration.split(' ')[0])
        const durationUnit = result.duration.split(' ')[1]
        
        if (durationUnit === 'weeks' || durationUnit === 'week') {
          if (!selectedDurations.includes('long') && durationValue > 4) return false
          if (!selectedDurations.includes('medium') && durationValue >= 2 && durationValue <= 4) return false
          if (!selectedDurations.includes('short') && durationValue < 2) return false
        } else if (durationUnit === 'hours' || durationUnit === 'hour') {
          if (!selectedDurations.includes('short')) return false
        }
      }
      
      return true
    })
    
    // Sort results
    let sortedResults = [...filteredResults]
    if (sortBy === 'date') {
      sortedResults.sort((a, b) => {
        if (!a.date) return 1
        if (!b.date) return -1
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    } else if (sortBy === 'rating') {
      sortedResults.sort((a, b) => {
        if (!a.rating) return 1
        if (!b.rating) return -1
        return b.rating - a.rating
      })
    }
    
    setSearchResults(sortedResults)
    
    // Notify parent component if callback provided
    if (onSearch) {
      onSearch(sortedResults)
    }
  }
  
  // Trigger search on filter changes
  useEffect(() => {
    if (searchQuery.length > 0 || activeTab !== 'all' || selectedTopics.length > 0) {
      performSearch()
    }
  }, [searchQuery, activeTab, selectedContentTypes, selectedLevels, selectedDurations, selectedTopics, dateRange, sortBy])
  
  // Reset filters
  const resetFilters = () => {
    setSelectedContentTypes(['course', 'article', 'tutorial', 'resource'])
    setSelectedLevels(['Beginner', 'Intermediate', 'Advanced'])
    setSelectedDurations(['short', 'medium', 'long'])
    setSelectedTopics([])
    setDateRange('all')
    setSortBy('relevance')
  }
  
  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Advanced Search
        </CardTitle>
        <CardDescription className="text-gray-400">
          Find exactly what you're looking for with powerful search filters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses, topics, skills..."
                className="pl-10 bg-gray-900 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && performSearch()}
              />
            </div>
            <Button 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={performSearch}
            >
              Search
            </Button>
          </div>
          
          {showFilters && (
            <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Search Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 text-gray-400 hover:text-white hover:bg-gray-800"
                  onClick={resetFilters}
                >
                  Reset All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Content Type
                  </h4>
                  <div className="space-y-2">
                    {['course', 'article', 'tutorial', 'resource'].map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`type-${type}`}
                          checked={selectedContentTypes.includes(type)}
                          onChange={() => toggleFilter('contentType', type)}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                        />
                        <label htmlFor={`type-${type}`} className="ml-2 text-sm capitalize">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                    <BarChart className="h-4 w-4 mr-1" />
                    Skill Level
                  </h4>
                  <div className="space-y-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                      <div key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`level-${level}`}
                          checked={selectedLevels.includes(level)}
                          onChange={() => toggleFilter('level', level)}
                          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                        />
                        <label htmlFor={`level-${level}`} className="ml-2 text-sm">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Duration
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="duration-short"
                        checked={selectedDurations.includes('short')}
                        onChange={() => toggleFilter('duration', 'short')}
                        className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                      />
                      <label htmlFor="duration-short" className="ml-2 text-sm">
                        Short (< 2 weeks)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="duration-medium"
                        checked={selectedDurations.includes('medium')}
                        onChange={() => toggleFilter('duration', 'medium')}
                        className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                      />
                      <label htmlFor="duration-medium" className="ml-2 text-sm">
                        Medium (2-4 weeks)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="duration-long"
                        checked={selectedDurations.includes('long')}
                        onChange={() => toggleFilter('duration', 'long')}
                        className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                      />
                      <label htmlFor="duration-long" className="ml-2 text-sm">
                        Long (> 4 weeks)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-1" />
                    More Filters
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="date-range" className="text-sm block mb-1">Date Range</label>
                      <select
                        id="date-range"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md text-sm p-2"
                      >
                        <option value="all">All Time</option>
                        <option value="week">Past Week</option>
                        <option value="month">Past Month</option>
                        <option value="year">Past Year</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="sort-by" className="text-sm block mb-1">Sort By</label>
                      <select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md text-sm p-2"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="date">Newest First</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map(topic => (
                    <Badge
                      key={topic}
                      variant={selectedTopics.includes(topic) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedTopics.includes(topic)
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => toggleFilter('topic', topic)}
                    >
                      {selectedTopics.includes(topic) && <Check className="h-3 w-3 mr-1" />}
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="mt-4">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-900">All</TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-blue-900">Courses</TabsTrigger>
              <TabsTrigger value="articles" className="data-[state=active]:bg-blue-900">Articles</TabsTrigger>
              <TabsTrigger value="tutorials" className="data-[state=active]:bg-blue-900">Tutorials</TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-blue-900">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <SearchResultsList 
                results={searchResults.filter(result => 
                  activeTab === 'all' || 
                  (activeTab === 'courses' && result.type === 'course') ||
                  (activeTab === 'articles' && result.type === 'article') ||
                  (activeTab === 'tutorials' && result.type === 'tutorial') ||
                  (activeTab === 'resources' && result.type === 'resource')
                )} 
              />
            </TabsContent>
            
            <TabsContent value="courses" className="mt-4">
              <SearchResultsList results={searchResults.filter(result => result.type === 'course')} />
            </TabsContent>
            
            <TabsContent value="articles" className="mt-4">
              <SearchResultsList results={searchResults.filter(result => result.type === 'article')} />
            </TabsContent>
            
            <TabsContent value="tutorials" className="mt-4">
              <SearchResultsList results={searchResults.filter(result => result.type === 'tutorial')} />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-4">
              <SearchResultsList results={searchResults.filter(result => result.type === 'resource')} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
        <div className="text-sm text-gray-400">
          {searchResults.length > 0 
            ? `Showing ${searchResults.length} results`
            : 'Use the search bar and filters to find content'}
        </div>
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          Save Search
        </Button>
      </CardFooter>
    </Card>
  )
}
