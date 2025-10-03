"use client"

import { useState } from "react"
import type { ContractorVisit } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip } from "@/components/ui/tooltip"
import { ContractorTooltip } from "@/components/contractor-tooltip"
import { EditContractorDialog } from "@/components/edit-contractor-dialog"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

interface CalendarViewProps {
  data: ContractorVisit[]
  onUpdate: (id: string, data: Partial<ContractorVisit>) => void
  onDelete: (id: string) => void
}

export function CalendarView({ data, onUpdate, onDelete }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [editingVisit, setEditingVisit] = useState<ContractorVisit | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const getVisitsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return data.filter((visit) => visit.date === dateString || visit.nextScheduled === dateString)
  }

  const getVisitsForMonth = () => {
    const { year, month } = getDaysInMonth(currentDate)
    return data
      .filter((visit) => {
        const visitDate = new Date(visit.date)
        const visitInMonth = visitDate.getFullYear() === year && visitDate.getMonth() === month

        // Also check nextScheduled if it exists
        if (visit.nextScheduled) {
          const nextScheduledDate = new Date(visit.nextScheduled)
          const nextScheduledInMonth =
            nextScheduledDate.getFullYear() === year && nextScheduledDate.getMonth() === month
          return visitInMonth || nextScheduledInMonth
        }

        return visitInMonth
      })
      .sort((a, b) => {
        // Sort by whichever date falls in the current month
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        const { year, month } = getDaysInMonth(currentDate)

        const aInMonth = aDate.getFullYear() === year && aDate.getMonth() === month
        const bInMonth = bDate.getFullYear() === year && bDate.getMonth() === month

        const aCompareDate = aInMonth ? aDate : a.nextScheduled ? new Date(a.nextScheduled) : aDate
        const bCompareDate = bInMonth ? bDate : b.nextScheduled ? new Date(b.nextScheduled) : bDate

        return aCompareDate.getTime() - bCompareDate.getTime()
      })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const today = () => {
    setCurrentDate(new Date())
  }

  const handleEditClick = (visit: ContractorVisit) => {
    setEditingVisit(visit)
    setIsEditDialogOpen(true)
  }

  const handleEditSave = (id: string, data: Partial<ContractorVisit>) => {
    onUpdate(id, data)
    setIsEditDialogOpen(false)
    setEditingVisit(null)
  }

  const handleEditClose = () => {
    setIsEditDialogOpen(false)
    setEditingVisit(null)
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const isToday = (day: number) => {
    const today = new Date()
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  }

  const getStatusColor = (status: ContractorVisit["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "In Progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Scheduled":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const monthlyVisits = getVisitsForMonth()

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-foreground">
              {monthNames[month]} {year}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={today} className="border-border bg-transparent">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={previousMonth} className="border-border bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth} className="border-border bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="min-h-[120px] bg-muted/30 rounded-lg" />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const date = new Date(year, month, day)
              const visits = getVisitsForDate(date)
              const isTodayDate = isToday(day)

              return (
                <div
                  key={day}
                  className={`min-h-[120px] p-2 rounded-lg border transition-colors ${
                    isTodayDate ? "bg-primary/10 border-primary" : "bg-card border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`text-sm font-semibold mb-2 ${isTodayDate ? "text-primary" : "text-foreground"}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {visits.map((visit) => (
                      <Tooltip
                        key={visit.id}
                        content={<ContractorTooltip visit={visit} />}
                        side="top"
                      >
                        <div 
                          className={`text-xs p-1.5 rounded border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(visit.status)}`}
                          onClick={() => handleEditClick(visit)}
                        >
                          <div className="font-medium truncate">{visit.contractorName}</div>
                          <div className="text-[10px] truncate opacity-90">{visit.company}</div>
                          <div className="text-[10px] truncate opacity-75">{visit.timeIn}</div>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30" />
              <span className="text-sm text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30" />
              <span className="text-sm text-muted-foreground">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/30" />
              <span className="text-sm text-muted-foreground">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30" />
              <span className="text-sm text-muted-foreground">Cancelled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            {monthNames[month]} Visits ({monthlyVisits.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyVisits.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No visits scheduled for this month</div>
          ) : (
            <div className="space-y-3">
              {monthlyVisits.map((visit) => (
                <Tooltip
                  key={visit.id}
                  content={<ContractorTooltip visit={visit} />}
                  side="left"
                >
                  <div 
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors cursor-pointer"
                    onClick={() => handleEditClick(visit)}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">{visit.contractorName}</span>
                        <Badge variant="outline" className={getStatusColor(visit.status)}>
                          {visit.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {visit.company} • {visit.jobType}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(visit.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm font-medium text-foreground">
                        {visit.timeIn} - {visit.timeOut}
                      </div>
                      <div className="text-xs text-muted-foreground">{visit.recurrence}</div>
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <EditContractorDialog
        visit={editingVisit}
        isOpen={isEditDialogOpen}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
    </div>
  )
}
