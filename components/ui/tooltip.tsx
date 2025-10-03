"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
  side?: "top" | "bottom" | "left" | "right"
}

export function Tooltip({ children, content, className, side = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  const getSideClasses = () => {
    switch (side) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2"
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2"
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2"
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2"
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2"
    }
  }

  const getArrowClasses = () => {
    switch (side) {
      case "top":
        return "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-popover"
      case "bottom":
        return "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-popover"
      case "left":
        return "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-popover"
      case "right":
        return "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-popover"
      default:
        return "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-popover"
    }
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md",
            getSideClasses(),
            className
          )}
        >
          {content}
          <div
            className={cn(
              "absolute h-0 w-0 border-4",
              getArrowClasses()
            )}
          />
        </div>
      )}
    </div>
  )
}
