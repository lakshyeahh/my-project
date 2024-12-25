
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function EmailSettings() {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen p-6">
      <Link to="/" className="mb-4 inline-block">
        <ChevronLeft className="w-6 h-6 text-pink-800" />
      </Link>
      <h1 className="text-2xl font-bold text-center">Email Settings</h1>
      {/* Add email settings content */}
    </div>
  )
} 