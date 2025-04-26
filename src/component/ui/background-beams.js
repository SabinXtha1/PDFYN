"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const BackgroundBeams = ({ className }) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  const ref = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }

    const element = ref.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div ref={ref} className={cn("h-full w-full bg-black", className)}>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient
            id="gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx={`${(mousePosition.x / (ref.current?.clientWidth || 1)) * 100}%`}
            fy={`${(mousePosition.y / (ref.current?.clientHeight || 1)) * 100}%`}
          >
            <stop offset="0%" stopColor="#0141ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0141ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
      </svg>
      <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
    </div>
  )
}
