import React from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { ChevronRight, BarChart, BookOpen } from 'lucide-react'

const ProgressPage = () => {
  const { progress, getChapterProgress, getVolumeProgress, getOverallProgress } = useProgress()
  
  // Mock data for volumes
  const volumes = [
    {
      id: '1',
      title: 'Volume 1',
      subtitle: 'Mechanics, Waves, and Optics',
      chapters: Array.from({ length: 22 }, (_, i) => ({
        id: String(i + 1),
        title: `Chapter ${i + 1}`
      }))
    },
    {
      id: '2',
      title: 'Volume 2',
      subtitle: 'Thermodynamics, Electromagnetism, and Modern Physics',
      chapters: Array.from({ length: 25 }, (_, i) => ({
        id: String(i + 23),
        title: `Chapter ${i + 23}`
      }))
    }
  ]
  
  const overallProgress = getOverallProgress() * 100
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span>Progress</span>
      </div>
      
      <section className="text-center py-4">
        <h1 className="text-4xl font-bold mb-2">Your Progress</h1>
        <p className="text-xl">Track your learning journey</p>
      </section>
      
      <section className="max-w-4xl mx-auto border rounded-lg p-6 bg-muted/50">
        <h2 className="text-2xl font-bold mb-4">Overall Progress</h2>
        <div className="flex items-center space-x-4">
          <div className="relative h-24 w-24">
            <svg className="h-24 w-24" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-primary stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallProgress / 100)}`}
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{Math.round(overallProgress)}%</span>
            </div>
          </div>
          <div>
            <p className="text-lg">Keep going! You're making progress.</p>
            <p className="text-sm text-muted-foreground">
              Track your progress across all chapters and volumes.
            </p>
          </div>
        </div>
      </section>
      
      {volumes.map(volume => {
        const volumeProgress = getVolumeProgress(volume.id) * 100
        
        return (
          <section key={volume.id} className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{volume.title}</h2>
              <div className="flex items-center">
                <div className="w-32 bg-muted rounded-full h-2.5 mr-2">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${volumeProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{Math.round(volumeProgress)}%</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {volume.chapters.map(chapter => {
                const chapterProgress = getChapterProgress(volume.id, chapter.id)
                const theoryProgress = chapterProgress?.theory * 100 || 0
                const practiceProgress = chapterProgress?.practice * 100 || 0
                const overallChapterProgress = chapterProgress?.overall * 100 || 0
                
                return (
                  <div key={chapter.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <Link 
                        to={`/volume/${volume.id}/chapter/${chapter.id}`}
                        className="font-bold hover:text-primary transition-colors"
                      >
                        {chapter.title}
                      </Link>
                      <div className="flex items-center">
                        <div className="w-24 bg-muted rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${overallChapterProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{Math.round(overallChapterProgress)}%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm mr-2">Theory:</span>
                        <div className="w-full bg-muted rounded-full h-2 mr-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${theoryProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{Math.round(theoryProgress)}%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <BarChart className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm mr-2">Practice:</span>
                        <div className="w-full bg-muted rounded-full h-2 mr-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${practiceProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{Math.round(practiceProgress)}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default ProgressPage
