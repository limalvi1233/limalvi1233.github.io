import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { Search as SearchIcon, Loader2, BookOpen, BookText, HelpCircle } from 'lucide-react'
import { Button } from './ui/button'

const SearchResultsPage = () => {
  const { query, results, isSearching, setQuery, performSearch } = useSearch()
  const navigate = useNavigate()
  const location = useLocation()
  const [localQuery, setLocalQuery] = useState(query)
  
  // Extract query from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const queryParam = searchParams.get('q')
    if (queryParam) {
      setLocalQuery(queryParam)
      setQuery(queryParam)
      performSearch()
    }
  }, [location.search])
  
  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(localQuery)
    performSearch()
    
    // Update URL with search query
    const searchParams = new URLSearchParams()
    searchParams.set('q', localQuery)
    navigate(`/search?${searchParams.toString()}`)
  }
  
  // Group results by type
  const groupedResults = {
    chapter: results.filter(result => result.type === 'chapter'),
    theory: results.filter(result => result.type === 'theory'),
    question: results.filter(result => result.type === 'question')
  }
  
  return (
    <div className="space-y-8">
      <section className="text-center py-4">
        <h1 className="text-4xl font-bold mb-6">Search</h1>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input 
              type="text" 
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search for chapters, concepts, or questions..." 
              className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-background text-lg"
            />
            <Button 
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              disabled={isSearching || !localQuery.trim()}
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <SearchIcon className="h-4 w-4 mr-2" />
              )}
              Search
            </Button>
          </div>
        </form>
      </section>
      
      {query && (
        <div className="text-sm text-muted-foreground mb-4">
          {isSearching ? (
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Searching for "{query}"...
            </div>
          ) : (
            <div>
              Found {results.length} results for "{query}"
            </div>
          )}
        </div>
      )}
      
      {!isSearching && results.length > 0 && (
        <div className="space-y-8">
          {Object.entries(groupedResults).map(([type, typeResults]) => {
            if (typeResults.length === 0) return null
            
            return (
              <section key={type} className="space-y-4">
                <h2 className="text-2xl font-bold capitalize">{type}s</h2>
                
                <div className="space-y-4">
                  {typeResults.map(result => (
                    <div key={result.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                      <a 
                        href={result.url}
                        className="block"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate(result.url)
                        }}
                      >
                        <div className="flex items-start">
                          <div className="mr-4 mt-1">
                            {type === 'chapter' && <BookOpen className="h-5 w-5 text-primary" />}
                            {type === 'theory' && <BookText className="h-5 w-5 text-primary" />}
                            {type === 'question' && <HelpCircle className="h-5 w-5 text-primary" />}
                          </div>
                          
                          <div>
                            <h3 className="font-bold text-lg hover:text-primary transition-colors">
                              {result.title}
                            </h3>
                            
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                              <span className="capitalize">{result.type}</span>
                              <span>•</span>
                              <span>Volume {result.volumeId}</span>
                              <span>•</span>
                              <span>Chapter {result.chapterId}</span>
                              {result.sectionId && (
                                <>
                                  <span>•</span>
                                  <span>Section {result.sectionId}</span>
                                </>
                              )}
                              {result.questionId && (
                                <>
                                  <span>•</span>
                                  <span>Question {result.questionId}</span>
                                </>
                              )}
                            </div>
                            
                            <p className="mt-2 text-sm">
                              {result.snippet}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
      
      {!isSearching && query && results.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find any matches for "{query}"
          </p>
          <p className="text-sm text-muted-foreground">
            Try using different keywords or check your spelling
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
