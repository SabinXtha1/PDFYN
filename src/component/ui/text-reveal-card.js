"use client"
import { cn } from "@/lib/utils"
import { useMotionValue, useTransform, motion } from "framer-motion"
import { useRef, useState } from "react"

export const TextRevealCard = ({ text, revealText, children, className, overlayColor = "rgba(0, 0, 0, 0.8)" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width
    const yPct = mouseY / height
    x.set(xPct - 0.5)
    y.set(yPct - 0.5)
  }

  const textX = useTransform(x, [-0.5, 0.5], ["-10%", "10%"])
  const textY = useTransform(y, [-0.5, 0.5], ["-10%", "10%"])

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className={cn("relative overflow-hidden", className)}
    >
      {children}

      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          x: textX,
          y: textY,
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to bottom right, ${overlayColor}, rgba(30, 41, 59, 0.2))`,
          }}
        />
        <div
          style={{
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
          className="z-20 text-2xl font-bold text-white"
        >
          {isHovered ? revealText : text}
        </div>
      </motion.div>
    </motion.div>
  )
}
