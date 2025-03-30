'use client'

import React, { useState } from 'react'
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
import { Slider } from "../../components/ui/slider"
import { Switch } from "../../components/ui/switch"
import { Code, Terminal, Play, Pause, RotateCcw, Download, Check, X } from 'lucide-react'
import { ScrollArea } from "../../components/ui/scroll-area"
import { Badge } from "../../components/ui/badge"

interface InteractiveLearningToolsProps {
  courseId: string
  chapterId: string
  lessonType: 'code' | 'quiz' | 'terminal'
  initialCode?: string
  initialTerminalCommands?: string[]
  quizQuestions?: QuizQuestion[]
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function InteractiveLearningTools({
  courseId,
  chapterId,
  lessonType = 'code',
  initialCode = '// Write your code here\n\nfunction example() {\n  console.log("Hello, world!");\n}\n\nexample();',
  initialTerminalCommands = ['ls -la', 'cd /home/user', 'mkdir project', 'cd project', 'touch index.js'],
  quizQuestions = []
}: InteractiveLearningToolsProps) {
  // Code editor state
  const [code, setCode] = useState(initialCode)
  const [codeOutput, setCodeOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [fontSize, setFontSize] = useState(14)
  
  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Welcome to the interactive terminal!',
    'Type commands to practice Linux skills.',
    '-----------------------------------'
  ])
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quizQuestions.length).fill(-1))
  const [showResults, setShowResults] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  
  // Mock function to run code
  const runCode = () => {
    setIsRunning(true)
    
    // Simulate code execution delay
    setTimeout(() => {
      try {
        // In a real implementation, this would use a sandboxed environment
        // For demo purposes, we'll just simulate output
        setCodeOutput('> Hello, world!\n> Execution completed successfully.')
      } catch (error) {
        setCodeOutput(`Error: ${error}`)
      } finally {
        setIsRunning(false)
      }
    }, 1000)
  }
  
  // Mock function to execute terminal command
  const executeTerminalCommand = () => {
    if (!currentCommand.trim()) return
    
    setTerminalHistory([...terminalHistory, currentCommand])
    
    // Simulate command execution
    let output: string
    
    if (currentCommand === 'ls') {
      output = 'index.js  package.json  node_modules/  README.md'
    } else if (currentCommand === 'pwd') {
      output = '/home/user/project'
    } else if (currentCommand.startsWith('echo ')) {
      output = currentCommand.substring(5)
    } else if (currentCommand === 'help') {
      output = 'Available commands: ls, pwd, echo, clear, help'
    } else if (currentCommand === 'clear') {
      setTerminalOutput(['Terminal cleared'])
      setCurrentCommand('')
      return
    } else {
      output = `Command not found: ${currentCommand}`
    }
    
    setTerminalOutput([...terminalOutput, `$ ${currentCommand}`, output])
    setCurrentCommand('')
  }
  
  // Handle terminal key press
  const handleTerminalKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeTerminalCommand()
    }
  }
  
  // Handle quiz answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }
  
  // Submit quiz
  const submitQuiz = () => {
    let score = 0
    selectedAnswers.forEach((selected, index) => {
      if (selected === quizQuestions[index].correctAnswer) {
        score++
      }
    })
    
    setQuizScore(score)
    setShowResults(true)
  }
  
  // Reset quiz
  const resetQuiz = () => {
    setSelectedAnswers(Array(quizQuestions.length).fill(-1))
    setCurrentQuestionIndex(0)
    setShowResults(false)
    setQuizScore(0)
  }
  
  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {lessonType === 'code' && <Code className="h-5 w-5" />}
          {lessonType === 'terminal' && <Terminal className="h-5 w-5" />}
          {lessonType === 'quiz' && <Badge className="h-5 px-2 py-1 bg-green-600">Quiz</Badge>}
          
          {lessonType === 'code' && 'Interactive Code Editor'}
          {lessonType === 'terminal' && 'Terminal Simulator'}
          {lessonType === 'quiz' && 'Knowledge Check'}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {lessonType === 'code' && 'Practice coding with real-time feedback'}
          {lessonType === 'terminal' && 'Learn command-line skills in a safe environment'}
          {lessonType === 'quiz' && 'Test your understanding of key concepts'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {lessonType === 'code' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="theme" className="text-sm text-gray-400">Theme</Label>
                  <select
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white rounded-md text-sm px-2 py-1"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="dracula">Dracula</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Label htmlFor="fontSize" className="text-sm text-gray-400">Font Size</Label>
                  <Slider
                    id="fontSize"
                    min={10}
                    max={24}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-400">{fontSize}px</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCode(initialCode)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isRunning ? (
                    <>
                      <Pause className="h-4 w-4 mr-1" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Run Code
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-md overflow-hidden border border-gray-700">
                <div className="bg-gray-900 px-4 py-2 text-sm font-medium border-b border-gray-700">
                  Editor
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-80 p-4 bg-gray-900 text-gray-100 font-mono text-sm focus:outline-none resize-none"
                  style={{ fontSize: `${fontSize}px` }}
                />
              </div>
              
              <div className="rounded-md overflow-hidden border border-gray-700">
                <div className="bg-gray-900 px-4 py-2 text-sm font-medium border-b border-gray-700">
                  Output
                </div>
                <div 
                  className="w-full h-80 p-4 bg-black text-green-400 font-mono text-sm overflow-auto whitespace-pre-wrap"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {codeOutput || '// Code output will appear here after running'}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {lessonType === 'terminal' && (
          <div className="space-y-4">
            <div className="rounded-md overflow-hidden border border-gray-700">
              <div className="bg-gray-900 px-4 py-2 text-sm font-medium border-b border-gray-700 flex justify-between items-center">
                <span>Terminal</span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTerminalOutput(['Terminal cleared'])}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 h-7 px-2"
                  >
                    Clear
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="suggestions" className="text-xs text-gray-400">Suggestions</Label>
                    <Switch id="suggestions" />
                  </div>
                </div>
              </div>
              
              <div className="bg-black p-4 h-96 overflow-auto font-mono text-sm">
                <ScrollArea className="h-full">
                  {terminalOutput.map((line, index) => (
                    <div key={index} className={line.startsWith('$') ? 'text-blue-400' : 'text-green-400'}>
                      {line}
                    </div>
                  ))}
                  <div className="flex items-center text-white mt-2">
                    <span className="text-blue-400 mr-2">$</span>
                    <input
                      type="text"
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyDown={handleTerminalKeyPress}
                      className="flex-1 bg-transparent border-none outline-none"
                      placeholder="Type a command..."
                    />
                  </div>
                </ScrollArea>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-md border border-gray-700">
              <h3 className="text-sm font-medium mb-2">Suggested Commands</h3>
              <div className="flex flex-wrap gap-2">
                {initialTerminalCommands.map((cmd, index) => (
                  <Badge 
                    key={index}
                    className="bg-blue-900/30 hover:bg-blue-800 cursor-pointer"
                    onClick={() => setCurrentCommand(cmd)}
                  >
                    {cmd}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {lessonType === 'quiz' && quizQuestions.length > 0 && (
          <div className="space-y-4">
            {!showResults ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-400">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentQuestionIndex(Math.min(quizQuestions.length - 1, currentQuestionIndex + 1))}
                      disabled={currentQuestionIndex === quizQuestions.length - 1}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Next
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-6 rounded-md border border-gray-700">
                  <h3 className="text-lg font-medium mb-4">{quizQuestions[currentQuestionIndex].question}</h3>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-md border cursor-pointer transition-colors ${
                          selectedAnswers[currentQuestionIndex] === index
                            ? 'bg-blue-900/30 border-blue-500'
                            : 'bg-gray-800 border-gray-700 hover:border-gray-500'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            selectedAnswers[currentQuestionIndex] === index
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-700 text-gray-400'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset Quiz
                  </Button>
                  <Button
                    onClick={submitQuiz}
                    disabled={selectedAnswers.includes(-1)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit Answers
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-900 p-6 rounded-md border border-gray-700 text-center">
                  <h3 className="text-xl font-medium mb-2">Quiz Results</h3>
                  <div className="text-5xl font-bold my-4">
                    {quizScore} / {quizQuestions.length}
                  </div>
                  <div className="text-lg mb-4">
                    {quizScore === quizQuestions.length ? (
                      <span className="text-green-400">Perfect score! Excellent work!</span>
                    ) : quizScore >= quizQuestions.length * 0.7 ? (
                      <span className="text-blue-400">Good job! You're on the right track.</span>
                    ) : (
                      <span className="text-yellow-400">Keep practicing to improve your score.</span>
                    )}
                  </div>
                  <Button
                    onClick={resetQuiz}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Retake Quiz
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review Your Answers</h3>
                  {quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-gray-900 p-4 rounded-md border border-gray-700">
                      <div className="flex items-start">
                        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          selectedAnswers[qIndex] === question.correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {selectedAnswers[qIndex] === question.correctAnswer ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{question.question}</h4>
                          <div className="mt-2 space-y-2">
                            {question.options.map((option, oIndex) => (
                              <div
                                key={oIndex}
                                className={`p-2 rounded-md ${
                                  oIndex === question.correctAnswer
                                    ? 'bg-green-900/30 border border-green-700'
                                    : oIndex === selectedAnswers[qIndex]
                                    ? 'bg-red-900/30 border border-red-700'
                                    : 'bg-gray-800'
                                }`}
                              >
                                <div className="flex items-center">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs ${
                                    oIndex === question.correctAnswer
                                      ? 'bg-green-600 text-white'
                                      : oIndex === selectedAnswers[qIndex]
                                      ? 'bg-red-600 text-white'
                                      : 'bg-gray-700 text-gray-400'
                                  }`}>
                                    {String.fromCharCode(65 + oIndex)}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 text-sm bg-blue-900/20 border border-blue-800 p-3 rounded-md">
                            <span className="font-medium text-blue-400">Explanation: </span>
                            {question.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
        <div className="text-sm text-gray-400">
          {lessonType === 'code' && 'Practice makes perfect. Try modifying the code to see different results.'}
          {lessonType === 'terminal' && 'Type "help" to see available commands.'}
          {lessonType === 'quiz' && 'Complete the quiz to test your knowledge.'}
        </div>
        
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          <Download className="h-4 w-4 mr-1" />
          {lessonType === 'code' && 'Download Code'}
          {lessonType === 'terminal' && 'Download History'}
          {lessonType === 'quiz' && 'Download Results'}
        </Button>
      </CardFooter>
    </Card>
  )
}
