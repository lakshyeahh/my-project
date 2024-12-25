'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// Import assets
import ComplimentVideo from './assets/ob1.mp4'
import LoveWallVideo from './assets/ob2.png'
import MoodBoosterPng from './assets/ob3.png'
import NotificationsGif from './assets/ob4.gif'

const onboardingSlides = [
  {
    title: 'Compliment Generator',
    description: 'Get personalized compliments AI picked, but written by meeee oink oink!',
    media: ComplimentVideo,
    type: 'video'
  },
  {
    title: 'Love Jar',
    description: 'Discover heartfelt reasons why you are loved by everyone oink oink!',
    media: LoveWallVideo,
    type: 'image'
  },
  {
    title: 'Mood Booster',
    description: 'Instant happiness with cute animations and songs oink oink!',
    media: MoodBoosterPng,
    type: 'image'
  },
  {
    title: 'Personalized Notifications',
    description: 'Receive love and support throughout the day oink oink!',
    media: NotificationsGif,
    type: 'gif'
  }
]

export default function OnboardingSlides({ onFinish }: { onFinish: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onFinish()
      navigate('/homepage')
    }
  }

  const renderMedia = (slide: any) => {
    switch(slide.type) {
      case 'video':
        return (
          <video 
            src={slide.media} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
          />
        )
      case 'image':
        return (
          <img 
            src={slide.media} 
            alt={slide.title} 
            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
          />
        )
      case 'gif':
        return (
          <img 
            src={slide.media} 
            alt={slide.title} 
            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col justify-center items-center p-6">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md w-full"
        >
          <div className="mb-6 flex justify-center">
            {renderMedia(onboardingSlides[currentSlide])}
          </div>
          <h2 className="text-3xl font-bold mb-4 text-pink-800">
            {onboardingSlides[currentSlide].title}
          </h2>
          <p className="text-xl text-pink-600 mb-8">
            {onboardingSlides[currentSlide].description}
          </p>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex space-x-2 mb-8">
        {onboardingSlides.map((_, index) => (
          <div 
            key={index} 
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-pink-500' : 'bg-pink-200'
            }`} 
          />
        ))}
      </div>

      <button 
        onClick={nextSlide} 
        className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg hover:bg-pink-600 transition-colors"
      >
        {currentSlide === onboardingSlides.length - 1 ? 'Start' : 'Next'}
      </button>
    </div>
  )
}