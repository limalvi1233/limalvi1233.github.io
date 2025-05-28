import { Link, useParams } from 'react-router-dom'
import { BookmarkIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useBookmarks } from '../hooks/useBookmarks'

const ChapterPage = () => {
  const { volumeId, chapterId } = useParams()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  
  // Mock data - will be replaced with actual data from PDFs
  const chapterData = {
    title: `Chapter ${chapterId}`,
    description: 'This chapter covers fundamental concepts and principles.'
  }
  
  const bookmarkParams = {
    type: 'chapter' as const,
    volumeId: volumeId || '',
    chapterId: chapterId || '',
    title: chapterData.title
  }
  
  const isChapterBookmarked = isBookmarked({
    type: 'chapter',
    volumeId: volumeId || '',
    chapterId: chapterId || ''
  })
  
  const toggleBookmark = () => {
    if (isChapterBookmarked) {
      removeBookmark(`chapter-${volumeId}-${chapterId}`)
    } else {
      addBookmark(bookmarkParams)
    }
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/volume/${volumeId}`} className="hover:text-primary">Volume {volumeId}</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Chapter {chapterId}</span>
      </div>
      
      <section className="text-center py-4">
        <div className="flex justify-center items-center mb-2">
          <h1 className="text-4xl font-bold">{chapterData.title}</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2" 
            aria-label={isChapterBookmarked ? "Remove bookmark" : "Bookmark this chapter"}
            onClick={toggleBookmark}
          >
            <BookmarkIcon className={`h-5 w-5 ${isChapterBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
        <p className="text-xl max-w-3xl mx-auto">{chapterData.description}</p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-primary/10 p-8 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Theory</h2>
            <p className="mb-4">Read and study the theoretical concepts of this chapter.</p>
            <Link 
              to={`/volume/${volumeId}/chapter/${chapterId}/theory`} 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Study Theory
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-primary/10 p-8 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Practice Questions</h2>
            <p className="mb-4">Test your understanding with practice questions.</p>
            <Link 
              to={`/volume/${volumeId}/chapter/${chapterId}/practice`} 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Practice Questions
            </Link>
          </div>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto border rounded-lg p-6 bg-muted/50">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Theory</span>
              <span>0%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full w-0"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Practice Questions</span>
              <span>0%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full w-0"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Add missing ChevronRight component
const ChevronRight = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

export default ChapterPage
