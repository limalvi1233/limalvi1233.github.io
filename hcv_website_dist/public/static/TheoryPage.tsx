import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, BookmarkIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useBookmarks } from '../hooks/useBookmarks'
import { useProgress } from '../hooks/useProgress'

const TheoryPage = () => {
  const { volumeId, chapterId } = useParams()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const { markTheorySectionRead } = useProgress()
  
  // Mock data - will be replaced with actual data from PDFs
  const theoryContent = {
    title: `Chapter ${chapterId}`,
    sections: [
      {
        id: '1',
        title: 'Introduction',
        content: `
          <p>This is the introduction to the chapter. It provides an overview of the concepts that will be covered.</p>
          <p>The content will be replaced with actual content from the HC Verma books.</p>
        `
      },
      {
        id: '2',
        title: 'Main Concepts',
        content: `
          <p>This section covers the main concepts of the chapter.</p>
          <p>Equations, diagrams, and detailed explanations will be included here.</p>
        `
      },
      {
        id: '3',
        title: 'Examples',
        content: `
          <p>This section provides worked examples to illustrate the concepts.</p>
          <p>Step-by-step solutions will be provided for each example.</p>
        `
      }
    ]
  }
  
  const [activeSection, setActiveSection] = useState(1)
  
  const currentSection = theoryContent.sections.find(section => section.id === String(activeSection))
  
  // Mark section as read when viewed
  useEffect(() => {
    if (currentSection) {
      markTheorySectionRead(
        volumeId,
        chapterId,
        currentSection.id,
        theoryContent.sections.length
      )
    }
  }, [activeSection, volumeId, chapterId, markTheorySectionRead])
  
  const isSectionBookmarked = isBookmarked({
    type: 'theory',
    volumeId,
    chapterId,
    sectionId: currentSection?.id
  })
  
  const toggleBookmark = () => {
    if (isSectionBookmarked) {
      removeBookmark(`theory-${volumeId}-${chapterId}-${currentSection?.id}`)
    } else {
      addBookmark({
        type: 'theory',
        volumeId,
        chapterId,
        sectionId: currentSection?.id,
        title: `${theoryContent.title}: ${currentSection?.title}`
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
        <span>Theory</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 shrink-0 border-r pr-4">
          <h2 className="font-bold text-lg mb-4">Sections</h2>
          <nav>
            <ul className="space-y-2">
              {theoryContent.sections.map(section => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(parseInt(section.id))}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === parseInt(section.id) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{theoryContent.title}: {currentSection?.title}</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label={isSectionBookmarked ? "Remove bookmark" : "Bookmark this section"}
              onClick={toggleBookmark}
            >
              <BookmarkIcon className={`h-5 w-5 ${isSectionBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
          
          <div className="prose dark:prose-invert max-w-none" 
               dangerouslySetInnerHTML={{ __html: currentSection?.content }} />
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setActiveSection(prev => Math.max(prev - 1, 1))}
              disabled={activeSection === 1}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setActiveSection(prev => Math.min(prev + 1, theoryContent.sections.length))}
              disabled={activeSection === theoryContent.sections.length}
              className="flex items-center"
            >
              Next Section
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default TheoryPage
