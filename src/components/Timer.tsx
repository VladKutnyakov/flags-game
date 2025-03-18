import { useEffect, useRef, useState } from "react"

interface Props {
  value: number
  paused: boolean
  timeTotal: number
  onTimeIsUp: () => void
}

function Timer ({ value, paused, timeTotal, onTimeIsUp }: Props) {
  const DELAY = 100
  const timeLeftRef = useRef(value)
  const [timeLeft, setTimeLeft] = useState(value / 1000)

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (timeLeftRef.current <= 0 || paused) {
        clearInterval(interval)  
      } else {
        timeLeftRef.current = timeLeftRef.current - DELAY
        setTimeLeft(timeLeftRef.current / 1000)
        if (timeLeftRef.current === 0 ) {
          onTimeIsUp()
        }
      }
    }, DELAY)

    return () => {
      clearInterval(interval)
    }
  }, [onTimeIsUp, paused])

  useEffect(() => {
    timeLeftRef.current = value
    setTimeLeft(value / 1000)
  }, [onTimeIsUp, paused, value])

  return (
    <>
      <div className='w-full basis-2 py-4 rounded-full'>
        <div
          className='h-full bg-emerald-700 rounded-full transition-width duration-200 ease-linear'
          style={{width: `${String(Math.floor((timeLeftRef.current / timeTotal) * 100))}%`}}
        ></div>
        <div className="text-center h-2">
          {timeLeft}
        </div>
      </div>
    </>
  )
}

export default Timer 
