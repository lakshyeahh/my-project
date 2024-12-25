import  { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import shakeSound from './assets/shake.mp3'
import loadingGif from './assets/jarvid2.gif'
import loveJarVideo from './assets/jarvid.mp4'

const loveNotes = [
  "You make me smile every day! Tumhare bina din adhoora lagta hai, jaise bina aloo ke paratha.",
  "Your kindness inspires me. Tumhare jaisa dil, aur kisi ka nahi ho sakta.",
  "I love the way you laugh. Tumhari hasi sunke lagta hai jaise zindagi mein sab sahi hai.",
  "You're my favorite person to talk to. Tumhare bina baatein karna hai jaise bina chai ke biscuit.",
  "Your hugs are the best in the world. Tumhari jhappi se zyada cozy toh mera razai bhi nahi hai.",
  "I'm grateful for your support. Tum bina, mere plans Google Maps ki bina shortcut jaise hai.",
  "You bring out the best in me. Tumhare saath lagta hai jaise main ek movie ka hero hoon.",
  "I love your sense of humor. Tumhare jokes mere Monday ko bhi Sunday banate hain.",
  "You're beautiful inside and out. Tum chand se zyada aur unicorn se bhi zyada special ho.",
  "I'm so lucky to have you in my life. Tumhare bina zindagi hai jaise golgappa bina pani."
]

export default function Lovewall() {
  const { width, height } = useWindowSize()
  const [currentNote, setCurrentNote] = useState('')
  const [isNoteVisible, setIsNoteVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const audioRef = useRef(new Audio(shakeSound))

  const handleJarPress = () => {
    if (!isNoteVisible) {
      setIsLoading(true)
      
      // Play sound
      audioRef.current.currentTime = 0
      audioRef.current.play()

      // Stop sound after 5 seconds
      const soundTimeout = setTimeout(() => {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }, 5000)

      // Wait for 5 seconds
      setTimeout(() => {
        clearTimeout(soundTimeout)
        const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)]
        setCurrentNote(randomNote)
        setIsNoteVisible(true)
        setIsLoading(false)
        setShowConfetti(true)
        
        // Stop confetti after 5 seconds
        setTimeout(() => setShowConfetti(false), 5000)
      }, 5000)
    }
  }

  const handleRepeat = () => {
    setIsNoteVisible(false)
    setTimeout(handleJarPress, 300)
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center">
      
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100">
          <img 
            src={loadingGif}
            alt="Loading"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {showConfetti && (
        <Confetti 
          width={width} 
          height={height}
          recycle={false}
        />
      )}

      <div className="flex items-center mb-6">
        <h1 className="text-4xl font-bold text-pink-600 mr-3">Love Jar</h1>
        <Heart stroke="#FF69B4" fill="#FF69B4" className="w-10 h-10" />
        
      </div>
      <h5 className="text-xs m-4 text-pink-400 mr-3">Click on the jar to know why exactly people are fond of you..</h5>
   

      <motion.div 
        onClick={handleJarPress}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-80 h-80 cursor-pointer rounded-full overflow-hidden border-4 border-white shadow-lg"
      >
        <video 
          src={loveJarVideo}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <AnimatePresence>
        {isNoteVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-6 p-8 bg-white rounded-lg shadow-lg text-center max-w-md w-full"
          >
            <p className="text-2xl font-caveat text-pink-600">{currentNote}</p>
            <button 
              onClick={handleRepeat}
              className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors duration-300"
            >
              Pick another note
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}