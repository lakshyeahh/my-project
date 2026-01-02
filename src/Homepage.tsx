'use client'

import { useState, useEffect } from 'react'
import { Clock, Image, MessageCircleHeart, PauseIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import pp from './assets/pp.png'

const affirmations = [
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
    "The only limit to our realization of tomorrow is our doubts of today.",    
    "All our dreams can come true, if we have the courage to pursue them.",
    "Believe you can and you're halfway there.",
    "Do what you can, with what you have, where you are.",
    "Life itself is the most wonderful fairy tale.",
    "Not all those who wander are lost.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  ];

export default function Component() {
  const [greeting, setGreeting] = useState("Hello, Gorgeous! 💖")
  const [currentTime, setCurrentTime] = useState("9:41")

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) {
        setGreeting("Good Morning, Beautiful! 💖")
      } else if (hour < 18) {
        setGreeting("Hello, Gorgeous! 💖")
      } else {
        setGreeting("Sweet Dreams, Lovely! 💫")
      }
    }

    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    }

    updateGreeting()
    updateTime()

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // Get the affirmation for the current day
  const currentDay = getDayOfYear();
  const quote = affirmations[currentDay % affirmations.length];
  
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen relative overflow-hidden">
      {/* Animated background */}
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
        {/* Status Bar */}
        <div className="flex justify-between items-center px-5 py-2 text-sm font-medium text-pink-800">
          <span>{currentTime}</span>
          <div className="flex gap-1">
            <span className="font-bold">●●●●</span>
            <span>WiFi</span>
            <span>100%</span>
          </div>
        </div>

        {/* Header */}
        <div className="px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-pink-200 overflow-hidden border-4 border-white shadow-lg animate-pulse">
              <img 
                src={pp}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-caveat font-bold text-pink-800 animate-fadeIn">{greeting}</h1>
          </div>
        </div>

        {/* Quick Actions */}
       
        {/* Daily Affirmation */}
        <div className="px-5 ">
      <h2 className="text-2xl font-bold mb-4 text-pink-800">Today's Affirmation</h2>
      <div className="relative w-full h-40 bg-gradient-to-br from-pink-300 to-purple-300 rounded-3xl overflow-hidden p-6 flex items-center shadow-lg animate-fadeIn">
        <div className="z-10">
          <div className="text-xl font-bold text-white mb-2 animate-fadeIn">
            {quote}
          </div>
          <div className="text-base text-pink-100 mt-2 animate-fadeIn animation-delay-300">
            Come back tomorrow for a new affirmation!
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-40 h-40 bg-pink-200 rounded-full -mr-10 -mb-10 opacity-50 animate-pulse"></div>
        <div className="absolute left-0 top-0 w-20 h-20 bg-purple-200 rounded-full -ml-5 -mt-5 opacity-50 animate-pulse animation-delay-500"></div>
      </div>
    </div>

        {/* Features */}
        <div className="px-5 mt-10">
          <h2 className="text-2xl font-bold mb-4 text-pink-800">Love Yourself</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                icon: <MessageCircleHeart className="w-8 h-8" color="black" />, 
                title: 'Compliment\nGenerator', 
                bg: 'bg-gradient-to-br from-pink-200 to-pink-300',
                count: '3 new',
                goto: '/compliment'
              },
              { 
                icon: <Clock className="w-8 h-8" color="black" />, 
                title: 'Why I\nLove You Wall', 
                bg: 'bg-gradient-to-br from-blue-200 to-blue-300',
                count: '2 active',
                goto: '/wall'
              },
              { 
                icon: <Image className="w-8 h-8" color="black" />, 
                title: 'Mood\nBooster', 
                bg: 'bg-gradient-to-br from-green-200 to-green-300',
                count: '12 photos',
                goto: '/mood'
              },
             
              {
                icon: <PauseIcon className="w-6 h-6" color="black" />,
                title: 'Sit With Me',
                bg: 'bg-gradient-to-br from-green-500 to-green-300',
                count: 'Just Pause',
                goto: '/sitwithme'
              }
            ].map((feature, index) => (
              <Link 
                to={feature.goto || '/'}
                key={index}
              >
                <div
                  className={`${feature.bg} rounded-3xl p-5 aspect-square flex flex-col justify-between 
                  transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer
                  animate-fadeIn`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white whitespace-pre-line">{feature.title}</div>
                    <div className="text-sm text-white mt-1">{feature.count}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
      
      </div>
    </div>
  )
}

