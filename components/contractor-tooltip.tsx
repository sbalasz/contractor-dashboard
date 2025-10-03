"use client"

import type { ContractorVisit } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface ContractorTooltipProps {
  visit: ContractorVisit
}

export function ContractorTooltip({ visit }: ContractorTooltipProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-chart-3 text-foreground"
      case "In Progress":
        return "bg-chart-1 text-foreground"
      case "Scheduled":
        return "bg-chart-4 text-foreground"
      case "Cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="max-w-xs space-y-2">
      <div className="space-y-1">
        <h4 className="font-semibold text-sm">{visit.contractorName}</h4>
        <p className="text-xs text-muted-foreground">{visit.company}</p>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Job Type:</span>
          <span className="text-xs">{visit.jobType}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Status:</span>
          <Badge className={`text-xs ${getStatusColor(visit.status)}`} variant="secondary">
            {visit.status}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Date:</span>
          <span className="text-xs">{formatDate(visit.date)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Time:</span>
          <span className="text-xs">{formatTime(visit.timeIn)} - {formatTime(visit.timeOut)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Recurrence:</span>
          <span className="text-xs">{visit.recurrence}</span>
        </div>
        
        {visit.nextScheduled && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">Next Visit:</span>
            <span className="text-xs">{formatDate(visit.nextScheduled)}</span>
          </div>
        )}
      </div>
      
      {visit.description && (
        <div className="space-y-1">
          <span className="text-xs font-medium">Description:</span>
          <p className="text-xs text-muted-foreground">{visit.description}</p>
        </div>
      )}
      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Email:</span>
          <span className="text-xs">{visit.contactEmail}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Phone:</span>
          <span className="text-xs">{visit.contactPhone}</span>
        </div>
      </div>
    </div>
  )
}
