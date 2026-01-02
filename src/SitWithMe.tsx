"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Pause } from "lucide-react"
import { Link } from "react-router-dom"

import calmMusic from "./assets/s7.mp3" // add your music here

const affirmationSegments = [
  "hi singh",
  "lakki here",
  "i am coding fast sorry for the mistake... but",
  "before anything else,\nbreathe in…\nslowly.",
  "Hold it for a moment.",
  "Now breathe out.\nLet your shoulders drop.",
  "It's okay.\nI'm here.",
  "I just want to tell you something.",
  "I don't always say it out loud,\nbut I am so proud of you.",
  "More proud than you can imagine.",
  "You've handled things\nthat would have broken many people",
  "and you did it quietly,\nwithout asking the world for applause.",
  "i dont wanna list your achievements to make them countable but oracle is one of them",
  "You try.\nEven on days when you're tired.\nEven on days when you doubt yourself.",
  "And that effort matters more than results.",
  "You don't need to compare yourself to anyone.",
  "Not today.\nNot ever.",
  "Because you are already enough.",
  "The way you care ",
  "the way you keep going,\nthe way you feel deeply",
  "that makes you special.",
  "You are not behind",
  "You are not weak.\nYou are not failing.",
  "You are a warrior.",
  "And yes…\nin your own way",
  "you are better than everyone els",
  "not because you're above them,",
  "but because you are you.",
  "No matter what happens,\nno matter how heavy things feel",
  "remember this:",
  "You don't have to earn love.\nYou already have it.",
  "Take another breath.",
  "I'm right here.\nAnd I always will be. (even if u hate me)",
]

export default function SitWithMe() {
  const [isActive, setIsActive] = useState(false)
  const [currentSegment, setCurrentSegment] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  /* ---------- INIT AUDIO ONCE ---------- */
  useEffect(() => {
    audioRef.current = new Audio(calmMusic)
    audioRef.current.loop = true
    audioRef.current.volume = 0.4

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  /* ---------- AFFIRMATION TIMER ---------- */
  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setCurrentSegment((prev) =>
        prev < affirmationSegments.length - 1 ? prev + 1 : prev
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [isActive])

  /* ---------- AUDIO FADE HELPERS ---------- */
  const fadeInAudio = () => {
    if (!audioRef.current) return
    audioRef.current.volume = 0
    requestAnimationFrame(() => {
      audioRef.current?.play()
    })

    let vol = 0
    const fade = setInterval(() => {
      vol += 0.02
      if (audioRef.current) audioRef.current.volume = Math.min(vol, 0.4)
      if (vol >= 0.4) clearInterval(fade)
    }, 100)
  }

  const fadeOutAudio = () => {
    if (!audioRef.current) return

    let vol = audioRef.current.volume
    const fade = setInterval(() => {
      vol -= 0.02
      if (audioRef.current) audioRef.current.volume = Math.max(vol, 0)
      if (vol <= 0) {
        audioRef.current?.pause()
        audioRef.current!.currentTime = 0
        clearInterval(fade)
      }
    }, 100)
  }

  /* ---------- HANDLERS ---------- */
  const handleStart = () => {
    setIsActive(true)
    setCurrentSegment(0)
    fadeInAudio()
  }

  const handleStop = () => {
    setIsActive(false)
    setCurrentSegment(0)
    fadeOutAudio()
  }

  return (
    <motion.div
      className="min-h-screen w-screen flex flex-col p-4"
      animate={{
        backgroundColor: isActive ? "#000000" : "#f3f4f6",
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* HEADER */}
      {!isActive &&
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-2xl">
              <Pause className="w-4 h-4 text-purple-600" />
            </div>
            <h1 className="text-xl font-bold text-purple-700">Sit With Me</h1>
          </div>
          <Link to="/homepage">
            <button className="bg-white p-3 rounded-2xl shadow-md border-2 border-purple-200">
              <Home className="w-4 h-4 text-purple-600" />
            </button>
          </Link>
        </div>
      }

      {/* CONTENT */}
      <div className="flex-1 w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center w-full"
            >
              <div className="rounded-3xl p-10 shadow-lg border-2 border-purple-200 mb-8 bg-gradient-to-br from-pink-100 to-purple-100">
                <p className="text-2xl text-purple-700 mb-6 font-bold">
                  Need a moment to pause?
                </p>
                <p className="text-xs text-gray-700 ">
                  Sometimes the best thing you can do is just be.
                </p>
                <p className="text-xs text-gray-600">
                  I’ll guide your breath. I’m here.
                </p>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-br from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold text-lg"
              >
                Start
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="breathing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center w-full px-4"
            >
              {/* BREATHING CIRCLE */}
              <div className=" top-48 mb-24">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 blur-xl"
                />
                {/* <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 w-48 h-48 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400"
                /> */}
              </div>

              {/* AFFIRMATION TEXT */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSegment}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="fixed bottom-24 mb-12"
                >
                  <p className="text-2xl  font-medium text-purple-200 text-center whitespace-pre-line leading-relaxed">
                    {affirmationSegments[currentSegment]}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* STOP */}
              <button
                onClick={handleStop}
                className="mt-8 absolute bottom-5  text-purple-600 py-4 px-8 rounded-3xl shadow-lg font-semibold flex items-center gap-2"
              >
                <Pause className="w-5 h-5" />
                Stop
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
