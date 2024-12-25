import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'
import { motion } from 'framer-motion'
import './index.css'
import './animations.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen relative overflow-hidden">
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

      <div className="relative z-10">
        {children}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 z-50">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors 
            ${location.pathname === '/homepage' 
              ? 'bg-pink-500 text-white' 
              : 'bg-pink-200 text-black'}`}
        >
          <Link to="/homepage" className="w-full h-full flex items-center justify-center">
            <Home className="w-8 h-8" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
} 