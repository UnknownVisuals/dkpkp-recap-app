"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  error?: boolean
}

export function DatePicker({
  value,
  onChange,
  disabled = false,
  placeholder = "Select date",
  className,
  error = false,
}: DatePickerProps) {
  const date = value ? new Date(value + "T00:00:00") : undefined

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
      const day = String(selectedDate.getDate()).padStart(2, "0")
      onChange(`${year}-${month}-${day}`)
    } else {
      onChange("")
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full h-10 justify-start text-left font-normal",
            !date && "text-muted-foreground",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
