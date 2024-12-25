import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Music } from 'lucide-react'
import s1 from './assets/s1.mp3'
import s2 from './assets/s2.mp3'
import s3 from './assets/s3.mp3'
import vid1 from './assets/vid1.mp4'
import vid2 from './assets/vid2.mp4'
import vid3 from './assets/vid3.mp4'

const musicOptions = [
  { 
    title: "If you feel sad", 
    videoUrl: vid1,
    audioUrl: s1
  },
  { 
    title: "If you feel angry", 
    videoUrl: vid2,
    audioUrl: s2
  },
  { 
    title: "If you feel lazy", 
    videoUrl: vid3,
    audioUrl: s3
  },
]

const MoodBooster: React.FC = () => {
  const [currentMusic, setCurrentMusic] = useState<{
    title: string, 
    videoUrl: string, 
    audioUrl: string
  } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playMusic = (option: typeof musicOptions[number]) => {
    setCurrentMusic(option)
    
    // Ensure refs are current before playing
    if (videoRef.current && audioRef.current) {
      videoRef.current.src = option.videoUrl
      audioRef.current.src = option.audioUrl
      
      videoRef.current.play()
      audioRef.current.play()
    }
  }

  const stopMusic = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.pause()
      audioRef.current.pause()
      setCurrentMusic(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-200 to-pink-200 flex flex-col items-center justify-center">
      {/* Initial Music Selection Screen */}
      {!currentMusic && (
        <div className="w-full max-w-md px-6">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-600 inline-flex items-center">
              Mood Booster
              <motion.span
                className="ml-2 text-5xl"
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                🌞
              </motion.span>
            </h1>
          </header>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Music Options</h2>
              <div className="space-y-4">
                {musicOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => playMusic(option)}
                    className="w-full flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors p-4 rounded-lg"
                  >
                    <span className="text-lg text-gray-700">{option.title}</span>
                    <Music size={24} className="text-pink-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Music Video */}
      {currentMusic && (
        <div className="fixed inset-0 z-50 bg-black">
          <button 
            onClick={stopMusic}
            className="absolute top-6 right-6 z-60 bg-white/30 rounded-full p-2"
          >
            <X size={32} className="text-white" />
          </button>
          
          <video 
            ref={videoRef}
            src={currentMusic.videoUrl}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          
          <audio 
            ref={audioRef}
            src={currentMusic.audioUrl}
            autoPlay
            loop
          />
        </div>
      )}
    </div>
  )
}

export default MoodBooster

