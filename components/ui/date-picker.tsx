"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DatePickerProps {
  value?: string
  onChange: (date: string | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  const selectedDate = value ? new Date(value) : undefined

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      // Format date as YYYY-MM-DD for consistency with form data
      const formattedDate = format(date, "yyyy-MM-dd")
      onChange(formattedDate)
    } else {
      onChange(undefined)
    }
    setOpen(false)
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal bg-background",
          !selectedDate && "text-muted-foreground",
          className
        )}
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {selectedDate ? format(selectedDate, "PPP") : placeholder}
      </Button>
      {open && (
        <div className="absolute z-50 mt-1 w-auto rounded-md border bg-popover p-3 text-popover-foreground shadow-md">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
            className="bg-card"
          />
        </div>
      )}
      {open && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  )
}
