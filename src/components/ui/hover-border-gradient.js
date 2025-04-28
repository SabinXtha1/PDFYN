"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"

export const HoverBorderGradient = ({ children, className, containerClassName, as: Component = "div", ...props }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Component
      className={cn("group relative rounded-lg p-[1px] transition-all duration-300", containerClassName)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          hovered ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
        }}
      />
      <div className={cn("relative rounded-lg", className)}>{children}</div>
    </Component>
  )
}
