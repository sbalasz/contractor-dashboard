"use client"

import { useState } from "react"
import type { ContractorVisit } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-picker"
import { Tooltip } from "@/components/ui/tooltip"
import { ContractorTooltip } from "@/components/contractor-tooltip"
import { Pencil, Trash2, Check, X } from "lucide-react"

interface ContractorTableProps {
  data: ContractorVisit[]
  onUpdate: (id: string, data: Partial<ContractorVisit>) => void
  onDelete: (id: string) => void
}

export function ContractorTable({ data, onUpdate, onDelete }: ContractorTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<ContractorVisit>>({})

  const startEdit = (visit: ContractorVisit) => {
    setEditingId(visit.id)
    setEditData(visit)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const saveEdit = () => {
    if (editingId) {
      onUpdate(editingId, editData)
      setEditingId(null)
      setEditData({})
    }
  }

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

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground font-medium">Contractor</TableHead>
            <TableHead className="text-muted-foreground font-medium">Company</TableHead>
            <TableHead className="text-muted-foreground font-medium">Job Type</TableHead>
            <TableHead className="text-muted-foreground font-medium">Date</TableHead>
            <TableHead className="text-muted-foreground font-medium">Time</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium">Recurrence</TableHead>
            <TableHead className="text-muted-foreground font-medium">Next Visit</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((visit) => (
            <TableRow key={visit.id} className="border-border hover:bg-accent/50 cursor-pointer group relative">
              {/* Tooltip */}
              <div className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none top-full left-1/2 transform -translate-x-1/2 mt-2">
                <div className="bg-popover border border-border rounded-md p-3 shadow-lg max-w-xs">
                  <ContractorTooltip visit={visit} />
                </div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover border-l border-t border-border rotate-45"></div>
              </div>
              <TableCell className="font-medium">
                {editingId === visit.id ? (
                  <Input
                    value={editData.contractorName || ""}
                    onChange={(e) => setEditData({ ...editData, contractorName: e.target.value })}
                    className="h-8 bg-background"
                  />
                ) : (
                  visit.contractorName
                )}
              </TableCell>
              <TableCell>
                {editingId === visit.id ? (
                  <Input
                    value={editData.company || ""}
                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                    className="h-8 bg-background"
                  />
                ) : (
                  visit.company
                )}
              </TableCell>
              <TableCell>
                {editingId === visit.id ? (
                  <Input
                    value={editData.jobType || ""}
                    onChange={(e) => setEditData({ ...editData, jobType: e.target.value })}
                    className="h-8 bg-background"
                  />
                ) : (
                  visit.jobType
                )}
              </TableCell>
              <TableCell>
                {editingId === visit.id ? (
                  <DatePicker
                    value={editData.date || ""}
                    onChange={(date) => setEditData({ ...editData, date: date || "" })}
                    placeholder="Select date"
                    className="h-8 bg-background"
                  />
                ) : (
                  new Date(visit.date).toLocaleDateString()
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {editingId === visit.id ? (
                  <div className="flex gap-1">
                    <Input
                      type="time"
                      value={editData.timeIn || ""}
                      onChange={(e) => setEditData({ ...editData, timeIn: e.target.value })}
                      className="h-8 w-24 bg-background"
                    />
                    <Input
                      type="time"
                      value={editData.timeOut || ""}
                      onChange={(e) => setEditData({ ...editData, timeOut: e.target.value })}
                      className="h-8 w-24 bg-background"
                    />
                  </div>
                ) : (
                  `${visit.timeIn} - ${visit.timeOut}`
                )}
              </TableCell>
              <TableCell>
                {editingId === visit.id ? (
                  <Select
                    value={editData.status || visit.status}
                    onValueChange={(value) =>
                      setEditData({
                        ...editData,
                        status: value as ContractorVisit["status"],
                      })
                    }
                  >
                    <SelectTrigger className="h-8 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={getStatusColor(visit.status)} variant="secondary">
                    {visit.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {editingId === visit.id ? (
                  <Select
                    value={editData.recurrence || visit.recurrence}
                    onValueChange={(value) =>
                      setEditData({
                        ...editData,
                        recurrence: value as ContractorVisit["recurrence"],
                      })
                    }
                  >
                    <SelectTrigger className="h-8 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="One-time">One-time</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm text-muted-foreground">{visit.recurrence}</span>
                )}
              </TableCell>
              <TableCell>
                {editingId === visit.id ? (
                  <DatePicker
                    value={editData.nextScheduled || ""}
                    onChange={(date) => setEditData({ ...editData, nextScheduled: date || "" })}
                    placeholder="Select next visit"
                    className="h-8 bg-background"
                  />
                ) : visit.nextScheduled ? (
                  new Date(visit.nextScheduled).toLocaleDateString()
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === visit.id ? (
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={saveEdit} className="h-8 w-8 p-0">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={cancelEdit} className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(visit)} className="h-8 w-8 p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(visit.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
