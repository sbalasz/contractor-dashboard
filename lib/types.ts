export interface ContractorVisit {
  id: string
  contractorName: string
  company: string
  jobType: string
  description: string
  date: string
  timeIn: string
  timeOut: string
  status: "Completed" | "In Progress" | "Scheduled" | "Cancelled"
  recurrence: "One-time" | "Daily" | "Weekly" | "Monthly" | "Quarterly"
  nextScheduled?: string
  contactEmail: string
  contactPhone: string
}
