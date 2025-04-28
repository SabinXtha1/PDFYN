"use client"
import React from "react"
import { cn } from "@/lib/utils"

export const AnimatedButton = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-md transition-all duration-300 hover:scale-105 active:scale-95",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})

AnimatedButton.displayName = "AnimatedButton"
