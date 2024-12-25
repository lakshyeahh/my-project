'use client'
import React, { useState, useCallback } from 'react'
import { Camera, Sparkles } from 'lucide-react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { motion, AnimatePresence } from 'framer-motion'
import loadingVideo from './assets/loading.mp4'

const compliments = [
  "Your smile lights up the room!",
  "You have the most beautiful eyes!",
  "Your kindness is truly inspiring!",
  "You're absolutely radiant today!",
  "Your positive energy is contagious!",
  "You have an amazing sense of style!",
  "Your confidence is admirable!",
  "You have a heart of gold!",
  "Your laughter is music to everyone's ears!",
  "You're a true inspiration to those around you!"
]

export default function ComplimentGenerator() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [compliment, setCompliment] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { width, height } = useWindowSize()

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setTimeout(() => {
          generateCompliment()
          setIsLoading(false)
        }, 4000)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const generateCompliment = useCallback(() => {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)]
    setCompliment(randomCompliment)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-6 flex flex-col items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 opacity-50 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-70 animate-float"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <video 
              src={loadingVideo}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <motion.h1 
        className="text-5xl font-bold text-pink-600 mb-8 font-caveat"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Compliment Generator
      </motion.h1>
      
      <motion.div 
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-8 relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label htmlFor="image-upload" className="block w-48 h-48 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-200 transition-all duration-300 transform hover:scale-105">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-pink-500"
              >
                 <video 
              src={loadingVideo}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
              </motion.div>
            ) : uploadedImage ? (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full rounded-full overflow-hidden"
              >
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Camera className="w-16 h-16 text-pink-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <motion.p 
          className="text-center text-gray-600 mb-4"
          animate={{ opacity: isLoading ? 0.5 : 1 }}
        >
          {uploadedImage ? "Tap to change your photo!" : "Tap to upload your photo!"}
        </motion.p>
        
        <AnimatePresence mode="wait">
          {compliment && (
            <motion.div
              key={compliment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg p-4 text-white text-center relative overflow-hidden"
            >
              <Sparkles className="absolute top-2 left-2 w-5 h-5 text-yellow-300 animate-pulse" />
              <p className="text-xl font-semibold">{compliment}</p>
              <Sparkles className="absolute bottom-2 right-2 w-5 h-5 text-yellow-300 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.button
        onClick={() => document.getElementById('image-upload')?.click()}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
      >
        {uploadedImage ? "Generate New Compliment" : "Upload Photo"}
      </motion.button>
      
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
    </div>
  )
}