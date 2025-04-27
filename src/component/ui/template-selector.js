"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const TemplateSelector = ({ options, selectedTemplate, setSelectedTemplate }) => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-1 bg-gray-800 rounded-lg">
      {options.map((option) => (
        <motion.button
          key={option.id}
          className={cn(
            "relative flex flex-col items-center justify-center p-3 rounded-md transition-all duration-200",
            selectedTemplate === option.id
              ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
              : "hover:bg-gray-700 text-gray-300",
          )}
          onClick={() => setSelectedTemplate(option.id)}
          onMouseEnter={() => setHoveredTemplate(option.id)}
          onMouseLeave={() => setHoveredTemplate(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="mb-1">{option.icon}</div>
          <span className="text-xs font-medium text-center">{option.name}</span>
          {hoveredTemplate === option.id && selectedTemplate !== option.id && (
            <motion.div
              className="absolute inset-0 rounded-md border border-blue-500 pointer-events-none"
              layoutId="hoverBorder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
          {selectedTemplate === option.id && (
            <motion.div
              className="absolute inset-0 rounded-md pointer-events-none"
              layoutId="selectedBorder"
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}
