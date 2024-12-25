'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, Plus, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { differenceInDays, format, isToday } from 'date-fns'
import Confetti from 'react-confetti'

const emojis = ['❤️', '🎉', '🎂', '💍', '🏖️', '🎄', '🎃', '🦄', '🌈', '🌟', '🍕', '🎸', '📚', '🏆', '🚀']

interface Event {
  id: number;
  name: string;
  date: string;
  emoji: string;
}

const EventCard = ({ event, onDelete }: { event: Event; onDelete: (id: number) => void }) => {
  const daysLeft = differenceInDays(new Date(event.date), new Date())
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isToday(new Date(event.date))) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [event.date])

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-4 relative">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <button onClick={() => onDelete(event.id)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <X size={20} />
      </button>
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{event.emoji}</span>
        <h3 className="text-lg font-semibold text-pink-800">{event.name}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-1">{format(new Date(event.date), 'MMMM d, yyyy')}</p>
      <p className="text-base font-medium text-pink-600">
        {daysLeft === 0 ? "Today!" : daysLeft > 0 ? `${daysLeft} days left!` : `${Math.abs(daysLeft)} days ago`}
      </p>
    </div>
  )
}

export default function CountdownTimer() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ 
    name: '', 
    date: '', 
    emoji: '❤️' 
  })
  const [showAddEvent, setShowAddEvent] = useState(false)

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newEvent.name && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now() }])
      setNewEvent({ name: '', date: '', emoji: '❤️' })
      setShowAddEvent(false)
    }
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id))
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ChevronLeft className="w-6 h-6 text-pink-800" />
          </Link>
          <h1 className="text-2xl font-bold text-pink-800">Countdown Timer</h1>
        </div>
        <button
          onClick={() => setShowAddEvent(!showAddEvent)}
          className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      {showAddEvent && (
        <form onSubmit={handleAddEvent} className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-pink-800 mb-4">Add New Event</h2>
          <div className="mb-4">
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              type="text"
              id="eventName"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              className="w-full p-2 border border-pink-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
            <input
              type="date"
              id="eventDate"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full p-2 border border-pink-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose an Emoji</label>
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setNewEvent({ ...newEvent, emoji })}
                  className={`text-2xl p-2 rounded-md ${newEvent.emoji === emoji ? 'bg-pink-200' : 'bg-gray-100'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
          >
            Save Event
          </button>
        </form>
      )}

      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events yet. Add your first event!</p>
        ) : (
          events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDeleteEvent} />
          ))
        )}
      </div>
    </div>
  )
}