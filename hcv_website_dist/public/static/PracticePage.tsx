import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, BookmarkIcon, Eye, EyeOff } from 'lucide-react'
import { Button } from './ui/button'
import { useBookmarks } from '../hooks/useBookmarks'
import { useProgress } from '../hooks/useProgress'

const PracticePage = () => {
  const { volumeId, chapterId } = useParams()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const { markQuestionCompleted } = useProgress()
  
  // Mock data - will be replaced with actual data from PDFs
  const questions = [
    {
      id: '1',
      text: "A particle moves along the x-axis according to the equation x = 3t² - 2t + 5, where x is in meters and t is in seconds. What is the velocity of the particle at t = 2 seconds?",
      answer: "The velocity is given by v = dx/dt = 6t - 2. At t = 2 seconds, v = 6(2) - 2 = 10 m/s."
    },
    {
      id: '2',
      text: "A force of 10 N acts on a body of mass 2 kg for 3 seconds. If the body is initially at rest, what is its final velocity?",
      answer: "Using F = ma, we get a = F/m = 10/2 = 5 m/s². The final velocity is v = u + at = 0 + 5 × 3 = 15 m/s."
    },
    {
      id: '3',
      text: "A ball is thrown vertically upward with an initial velocity of 20 m/s. How high will it rise? (Take g = 10 m/s²)",
      answer: "Using v² = u² - 2gh, where v = 0 at the highest point, we get 0 = 20² - 2 × 10 × h. Solving for h, we get h = 20 m."
    }
  ]
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  
  const currentQuestion = questions[currentQuestionIndex]
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowAnswer(false)
      
      // Mark current question as completed
      markQuestionCompleted(
        volumeId, 
        chapterId, 
        currentQuestion.id, 
        questions.length
      )
    }
  }
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setShowAnswer(false)
    }
  }
  
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
    
    // Mark question as completed when answer is revealed
    if (!showAnswer) {
      markQuestionCompleted(
        volumeId, 
        chapterId, 
        currentQuestion.id, 
        questions.length
      )
    }
  }
  
  const isQuestionBookmarked = isBookmarked({
    type: 'question',
    volumeId,
    chapterId,
    questionId: currentQuestion.id
  })
  
  const toggleBookmark = () => {
    if (isQuestionBookmarked) {
      removeBookmark(`question-${volumeId}-${chapterId}-${currentQuestion.id}`)
    } else {
      addBookmark({
        type: 'question',
        volumeId,
        chapterId,
        questionId: currentQuestion.id,
        title: `Question ${currentQuestion.id}`
      })
    }
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/volume/${volumeId}`} className="hover:text-primary">Volume {volumeId}</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/volume/${volumeId}/chapter/${chapterId}`} className="hover:text-primary">Chapter {chapterId}</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Practice</span>
      </div>
      
      <section className="text-center py-4">
        <h1 className="text-3xl font-bold mb-2">Practice Questions</h1>
        <p className="text-xl">Chapter {chapterId}</p>
      </section>
      
      <div className="max-w-4xl mx-auto border rounded-lg p-8 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label={isQuestionBookmarked ? "Remove bookmark" : "Bookmark this question"}
            onClick={toggleBookmark}
          >
            <BookmarkIcon className={`h-5 w-5 ${isQuestionBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Question:</h2>
          <div className="p-4 bg-muted/30 rounded-md">
            {currentQuestion.text}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Answer:</h2>
            <Button 
              variant="outline" 
              onClick={toggleAnswer}
              className="flex items-center gap-2"
            >
              {showAnswer ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide Answer
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show Answer
                </>
              )}
            </Button>
          </div>
          
          {showAnswer && (
            <div className="p-4 bg-primary/10 rounded-md">
              {currentQuestion.answer}
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Question
          </Button>
          
          <Button
            variant="outline"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className="flex items-center"
          >
            Next Question
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Progress</span>
          <span>{currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default PracticePage
