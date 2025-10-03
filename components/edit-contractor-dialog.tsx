"use client"

import { useState, useEffect } from "react"
import type { ContractorVisit } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface EditContractorDialogProps {
  visit: ContractorVisit | null
  isOpen: boolean
  onClose: () => void
  onSave: (id: string, data: Partial<ContractorVisit>) => void
}

export function EditContractorDialog({ visit, isOpen, onClose, onSave }: EditContractorDialogProps) {
  const [formData, setFormData] = useState<Partial<ContractorVisit>>({})

  useEffect(() => {
    if (visit) {
      setFormData(visit)
    }
  }, [visit])

  const handleSave = () => {
    if (visit && formData) {
      onSave(visit.id, formData)
      onClose()
    }
  }

  const handleCancel = () => {
    setFormData(visit || {})
    onClose()
  }

  if (!visit) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Contractor Visit</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractorName" className="text-foreground">
                Contractor Name
              </Label>
              <Input
                id="contractorName"
                value={formData.contractorName || ""}
                onChange={(e) => setFormData({ ...formData, contractorName: e.target.value })}
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">
                Company
              </Label>
              <Input
                id="company"
                value={formData.company || ""}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">
                Date
              </Label>
              <DatePicker
                value={formData.date}
                onChange={(date) => setFormData({ ...formData, date: date || "" })}
                placeholder="Select date"
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeIn" className="text-foreground">
                Time In
              </Label>
              <Input
                id="timeIn"
                type="time"
                value={formData.timeIn || ""}
                onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeOut" className="text-foreground">
                Time Out
              </Label>
              <Input
                id="timeOut"
                type="time"
                value={formData.timeOut || ""}
                onChange={(e) => setFormData({ ...formData, timeOut: e.target.value })}
                required
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobType" className="text-foreground">
                Job Type
              </Label>
              <Input
                id="jobType"
                value={formData.jobType || ""}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">
                Status
              </Label>
              <Select
                value={formData.status || visit.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as ContractorVisit["status"],
                  })
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recurrence" className="text-foreground">
                Recurrence
              </Label>
              <Select
                value={formData.recurrence || visit.recurrence}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    recurrence: value as ContractorVisit["recurrence"],
                  })
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select recurrence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="One-time">One-time</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextScheduled" className="text-foreground">
                Next Scheduled Visit (Optional)
              </Label>
              <DatePicker
                value={formData.nextScheduled}
                onChange={(date) => setFormData({ ...formData, nextScheduled: date || "" })}
                placeholder="Select next visit date"
                className="bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description..."
              className="bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-foreground">
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail || ""}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-foreground">
                Contact Phone
              </Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone || ""}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="bg-background"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} className="border-border">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
