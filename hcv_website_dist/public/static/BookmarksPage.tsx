import { Link } from 'react-router-dom'
import { BookmarkIcon, Clock, ChevronRight, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { useBookmarks } from '../hooks/useBookmarks'

const BookmarksPage = () => {
  const { bookmarks, removeBookmark } = useBookmarks()
  
  // Sort bookmarks by timestamp (newest first)
  const sortedBookmarks = [...bookmarks].sort((a, b) => b.timestamp - a.timestamp)
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Bookmarks</span>
      </div>
      
      <section className="text-center py-4">
        <h1 className="text-4xl font-bold mb-2">Your Bookmarks</h1>
        <p className="text-xl">Access your saved content</p>
      </section>
      
      {sortedBookmarks.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground mb-4">
            Start exploring chapters and bookmark your favorite content
          </p>
          <Link 
            to="/" 
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Explore Content
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBookmarks.map(bookmark => (
            <div key={bookmark.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <Link 
                    to={getBookmarkUrl(bookmark)}
                    className="font-bold text-lg hover:text-primary transition-colors"
                  >
                    {bookmark.title}
                  </Link>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                    <span className="capitalize">{bookmark.type}</span>
                    <span>•</span>
                    <span>Volume {bookmark.volumeId}</span>
                    <span>•</span>
                    <span>Chapter {bookmark.chapterId}</span>
                    {bookmark.sectionId && (
                      <>
                        <span>•</span>
                        <span>Section {bookmark.sectionId}</span>
                      </>
                    )}
                    {bookmark.questionId && (
                      <>
                        <span>•</span>
                        <span>Question {bookmark.questionId}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-2">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(bookmark.timestamp)}</span>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeBookmark(bookmark.id)}
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Helper function to get the URL for a bookmark
const getBookmarkUrl = (bookmark) => {
  const { type, volumeId, chapterId } = bookmark
  
  if (type === 'chapter') {
    return `/volume/${volumeId}/chapter/${chapterId}`
  } else if (type === 'theory') {
    return `/volume/${volumeId}/chapter/${chapterId}/theory`
  } else {
    return `/volume/${volumeId}/chapter/${chapterId}/practice`
  }
}

// Helper function to format timestamp
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default BookmarksPage
