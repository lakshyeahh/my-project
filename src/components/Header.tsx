import React from 'react'


export default function Header() {
  const [currentTime, setCurrentTime] = React.useState("9:41")

  return (
    <div className="flex justify-between items-center px-5 py-2 text-sm font-medium">
      <span>{currentTime}</span>
      <div className="flex gap-1">
        <span className="font-bold">●●●●</span>
        <span>WiFi</span>
        <span>100%</span>
      </div>
    </div>
  )
} 