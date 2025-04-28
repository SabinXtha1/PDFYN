"use client"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export const CardHoverEffect = ({ children, className, containerClassName, glowColor = "rgba(59, 130, 246, 0.5)" }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className={cn("grid grid-cols-1 py-10", containerClassName)}>
      <div
        className={cn("relative group", className)}
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-4 rounded-xl opacity-30 blur-xl group-hover:opacity-100 transition duration-500"
              style={{ background: `linear-gradient(to right, ${glowColor}, rgba(124, 58, 237, 0.5))` }}
            />
          )}
        </AnimatePresence>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
