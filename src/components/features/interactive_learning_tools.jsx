'use client'

import React, { useState } from 'react'
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
import { Slider } from "../../components/ui/slider.jsx"
import { Switch } from "../../components/ui/switch.jsx"
import { Code, Terminal, Play, Pause, RotateCcw, Download, Check, X } from 'lucide-react'
import { ScrollArea } from "../../components/ui/scroll-area.jsx"
import { Badge } from "../../components/ui/badge.jsx"

export default function InteractiveLearningTools({
  courseId,
  chapterId,
  lessonType = 'code',
  initialCode = '// Write your code here\n\nfunction example() {\n  console.log("Hello, world!");\n}\n\nexample();',
  initialTerminalCommands = ['ls -la', 'cd /home/user', 'mkdir project', 'cd project', 'touch index.js'],
  quizQuestions = []
}) {
  // Code editor state
  const [code, setCode] = useState(initialCode)
  const [codeOutput, setCodeOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [fontSize, setFontSize] = useState(14)
  
  // Terminal state - removed TypeScript type annotations
  const [terminalHistory, setTerminalHistory] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [terminalOutput, setTerminalOutput] = useState([
    'Welcome to the interactive terminal!',
    'Type commands to practice Linux skills.',
    '-----------------------------------'
  ])
  
  // Quiz state - removed TypeScript type annotations
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(-1))
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
    let output
    
    if (currentCommand === 'ls') {
      output = 'index.js  package.json  node_modules/  README.md'
    } else if (currentCommand === 'pwd') {
      output = '/home/user/project'
    } else if (currentCommand.startsWith('echo ')) {
      output = currentCommand.substring(5)
    } else if (currentCommand === 'help') {
      output = 'Available commands, pwd, echo, clear, help'
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
  
  // Handle terminal key press - removed TypeScript type annotation
  const handleTerminalKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeTerminalCommand()
    }
  }
  
  // Handle quiz answer selection
  const handleAnswerSelect = (answerIndex) => {
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
                  className="w-full h-80 p-4 bg-gray-900 text-gray-100 font-mono text-sm focus:none resize-none"
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
                </div>
              </div>
              <div className="bg-black p-4 h-80 font-mono text-sm text-green-400 overflow-auto">
                {terminalOutput.map((line, index) => (
                  <div key={index} className="whitespace-pre-wrap">{line}</div>
                ))}
                <div className="flex items-center mt-2">
                  <span className="mr-2">$</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyDown={handleTerminalKeyPress}
                    className="flex-1 bg-transparent border-none outline-none text-green-400"
                    placeholder="Type a command..."
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-md p-4 border border-gray-700">
              <h3 className="text-sm font-medium mb-2">Command History</h3>
              <div className="text-sm text-gray-400">
                {terminalHistory.length > 0 ? (
                  <div className="space-y-1">
                    {terminalHistory.slice(-5).map((cmd, index) => (
                      <div key={index} className="cursor-pointer hover:text-white" onClick={() => setCurrentCommand(cmd)}>
                        {cmd}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No commands executed yet</div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-md p-4 border border-gray-700">
              <h3 className="text-sm font-medium mb-2">Suggested Commands</h3>
              <div className="flex flex-wrap gap-2">
                {initialTerminalCommands.map((cmd, index) => (
                  <Badge 
                    key={index}
                    className="cursor-pointer bg-gray-800 hover:bg-gray-700"
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
                  <h3 className="text-lg font-medium">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </h3>
                  <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">
                    {quizQuestions[currentQuestionIndex].points} points
                  </Badge>
                </div>
                
                <div className="bg-gray-900 rounded-md p-4 border border-gray-700">
                  <h4 className="text-lg mb-4">{quizQuestions[currentQuestionIndex].question}</h4>
                  
                  <div className="space-y-3">
                    {quizQuestions[currentQuestionIndex].answers.map((answer, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-md border cursor-pointer ${
                          selectedAnswers[currentQuestionIndex] === index
                            ? 'bg-blue-900/30 border-blue-600'
                            : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        {answer}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Previous
                  </Button>
                  
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <Button
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      disabled={selectedAnswers[currentQuestionIndex] === -1}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={submitQuiz}
                      disabled={selectedAnswers.some(answer => answer === -1)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-md p-6 border border-gray-700 text-center">
                  <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
                  <div className="text-4xl font-bold mb-4">
                    {quizScore} / {quizQuestions.length}
                  </div>
                  <div className="text-lg mb-6">
                    {quizScore === quizQuestions.length ? (
                      <span className="text-green-400">Perfect score! Excellent work!</span>
                    ) : quizScore >= quizQuestions.length * 0.7 ? (
                      <span className="text-blue-400">Good job! You've passed the quiz.</span>
                    ) : (
                      <span className="text-yellow-400">You might want to review the material and try again.</span>
                    )}
                  </div>
                  <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
                    Retake Quiz
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review Answers</h3>
                  
                  {quizQuestions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-gray-900 rounded-md p-4 border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-md font-medium">{qIndex + 1}. {question.question}</h4>
                        {selectedAnswers[qIndex] === question.correctAnswer ? (
                          <Badge className="bg-green-900/30 text-green-400 border-green-800 flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            Correct
                          </Badge>
                        ) : (
                          <Badge className="bg-red-900/30 text-red-400 border-red-800 flex items-center">
                            <X className="h-3 w-3 mr-1" />
                            Incorrect
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2 mt-3">
                        {question.answers.map((answer, aIndex) => (
                          <div 
                            key={aIndex}
                            className={`p-2 rounded-md ${
                              aIndex === question.correctAnswer
                                ? 'bg-green-900/30 border border-green-800'
                                : aIndex === selectedAnswers[qIndex]
                                  ? 'bg-red-900/30 border border-red-800'
                                  : 'bg-gray-800 border border-gray-700'
                            }`}
                          >
                            {answer}
                            {aIndex === question.correctAnswer && (
                              <span className="ml-2 text-green-400 text-sm">(Correct Answer)</span>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-3 text-sm text-gray-300 bg-gray-800 p-3 rounded-md">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-gray-700 pt-4 flex justify-between">
        <div className="text-sm text-gray-400">
          {lessonType === 'code' && 'Practice makes perfect. Try modifying the code to see different results.'}
          {lessonType === 'terminal' && 'Try these commands: ls, pwd, echo hello, help'}
          {lessonType === 'quiz' && 'Complete the quiz to test your understanding.'}
        </div>
        
        {lessonType === 'code' && (
          <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
            <Download className="h-4 w-4 mr-1" />
            Download Code
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
