import React from 'react'
import { Home, Heart, MessageCircleHeart, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md border-t border-pink-200">
      <div className="max-w-md mx-auto px-8 py-4 flex justify-between">
        {[
          { icon: <Home className="w-6 h-6" color="black" />, href: "/", active: true },
          { icon: <Heart className="w-6 h-6" color="black" />, href: "/wall" },
          { icon: <MessageCircleHeart className="w-6 h-6" color="black" />, href: "/jar" },
          { icon: <Settings className="w-6 h-6" color="black" />, href: "/settings" },
        ].map((item, index) => (
          <Link key={index} to={item.href} className="flex flex-col items-center">
            <div className={`w-14 h-14 ${item.active ? 'bg-pink-200' : 'bg-gray-100'} rounded-full flex items-center justify-center shadow-md`}>
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 