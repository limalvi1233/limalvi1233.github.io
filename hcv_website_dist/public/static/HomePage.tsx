import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, BookMarked } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">HC Verma - Concepts of Physics</h1>
        <p className="text-xl max-w-3xl mx-auto">
          An interactive study platform for HC Verma's renowned physics textbooks.
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-primary/10 p-8 flex justify-center">
            <BookOpen className="h-24 w-24 text-primary" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Volume 1</h2>
            <p className="mb-4">Mechanics, Waves, and Optics</p>
            <Link 
              to="/volume/1" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Explore Volume 1
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-primary/10 p-8 flex justify-center">
            <BookOpen className="h-24 w-24 text-primary" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Volume 2</h2>
            <p className="mb-4">Thermodynamics, Electromagnetism, and Modern Physics</p>
            <Link 
              to="/volume/2" 
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Explore Volume 2
            </Link>
          </div>
        </div>
      </section>
      
      <section className="max-w-5xl mx-auto border rounded-lg p-6 bg-muted/50">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-md border">
            <h3 className="font-bold mb-2">Volume 1</h3>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full w-0"></div>
            </div>
            <p className="text-sm mt-2">0% complete</p>
          </div>
          <div className="bg-background p-4 rounded-md border">
            <h3 className="font-bold mb-2">Volume 2</h3>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full w-0"></div>
            </div>
            <p className="text-sm mt-2">0% complete</p>
          </div>
        </div>
      </section>
      
      <section className="max-w-5xl mx-auto border rounded-lg p-6 bg-muted/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Bookmarks</h2>
          <Link to="/bookmarks" className="text-primary hover:underline flex items-center gap-1">
            <span>View all</span>
          </Link>
        </div>
        <div className="text-center py-8">
          <BookMarked className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
          <p>No bookmarks yet. Start reading and bookmark your favorite sections.</p>
        </div>
      </section>
    </div>
  )
}

export default HomePage
