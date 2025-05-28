import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

// Mock data - will be replaced with actual data from PDFs
const volumeData = {
  '1': {
    title: 'Volume 1',
    subtitle: 'Mechanics, Waves, and Optics',
    chapters: [
      { id: 1, title: 'Introduction to Physics' },
      { id: 2, title: 'Physics and Mathematics' },
      { id: 3, title: 'Rest and Motion: Kinematics' },
      { id: 4, title: 'The Forces' },
      { id: 5, title: 'Newton\'s Laws of Motion' },
      { id: 6, title: 'Friction' },
      { id: 7, title: 'Circular Motion' },
      { id: 8, title: 'Work and Energy' },
      { id: 9, title: 'Centre of Mass, Linear Momentum, Collision' },
      { id: 10, title: 'Rotational Mechanics' },
      { id: 11, title: 'Gravitation' },
      { id: 12, title: 'Simple Harmonic Motion' },
      { id: 13, title: 'Fluid Mechanics' },
      { id: 14, title: 'Some Mechanical Properties of Matter' },
      { id: 15, title: 'Wave Motion and Waves on a String' },
      { id: 16, title: 'Sound Waves' },
      { id: 17, title: 'Light Waves' },
      { id: 18, title: 'Geometrical Optics' },
      { id: 19, title: 'Optical Instruments' },
      { id: 20, title: 'Dispersion and Spectra' },
      { id: 21, title: 'Speed of Light' },
      { id: 22, title: 'Photometry' }
    ]
  },
  '2': {
    title: 'Volume 2',
    subtitle: 'Thermodynamics, Electromagnetism, and Modern Physics',
    chapters: [
      { id: 23, title: 'Heat and Temperature' },
      { id: 24, title: 'Kinetic Theory of Gases' },
      { id: 25, title: 'Calorimetry' },
      { id: 26, title: 'Laws of Thermodynamics' },
      { id: 27, title: 'Specific Heat Capacities of Gases' },
      { id: 28, title: 'Heat Transfer' },
      { id: 29, title: 'Electric Field and Potential' },
      { id: 30, title: 'Gauss\'s Law' },
      { id: 31, title: 'Capacitors' },
      { id: 32, title: 'Electric Current in Conductors' },
      { id: 33, title: 'Thermal and Chemical Effects of Electric Current' },
      { id: 34, title: 'Magnetic Field' },
      { id: 35, title: 'Magnetic Field due to a Current' },
      { id: 36, title: 'Permanent Magnets' },
      { id: 37, title: 'Magnetic Properties of Matter' },
      { id: 38, title: 'Electromagnetic Induction' },
      { id: 39, title: 'Alternating Current' },
      { id: 40, title: 'Electromagnetic Waves' },
      { id: 41, title: 'Electric Current through Gases' },
      { id: 42, title: 'Photoelectric Effect and Wave-Particle Duality' },
      { id: 43, title: 'Bohr\'s Model and Physics of the Atom' },
      { id: 44, title: 'X-rays' },
      { id: 45, title: 'Semiconductors and Semiconductor Devices' },
      { id: 46, title: 'The Nucleus' },
      { id: 47, title: 'The Special Theory of Relativity' }
    ]
  }
}

const VolumePage = () => {
  const { volumeId } = useParams()
  const [volume, setVolume] = useState(null)
  
  useEffect(() => {
    if (volumeId && volumeData[volumeId]) {
      setVolume(volumeData[volumeId])
    }
  }, [volumeId])
  
  if (!volume) {
    return <div className="text-center py-12">Volume not found</div>
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span>{volume.title}</span>
      </div>
      
      <section className="text-center py-4">
        <h1 className="text-4xl font-bold mb-2">{volume.title}</h1>
        <p className="text-xl">{volume.subtitle}</p>
      </section>
      
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Chapters</h2>
        <div className="space-y-4">
          {volume.chapters.map((chapter) => (
            <div key={chapter.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
              <Link 
                to={`/volume/${volumeId}/chapter/${chapter.id}`}
                className="flex items-center justify-between"
              >
                <div>
                  <span className="font-bold">{chapter.id}.</span> {chapter.title}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default VolumePage
