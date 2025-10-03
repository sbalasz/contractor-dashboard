"use client"

import { useState } from "react"
import type { ContractorVisit } from "@/lib/types"
import { demoData } from "@/lib/demo-data"
import { exportToCSV, exportToExcel } from "@/lib/export-utils"
import { ContractorTable } from "@/components/contractor-table"
import { AddContractorDialog } from "@/components/add-contractor-dialog"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { CalendarView } from "@/components/calendar-view"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Download, Search, BarChart3, Users, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ContractorDashboard() {
  const [contractors, setContractors] = useState<ContractorVisit[]>(demoData)
  const [searchQuery, setSearchQuery] = useState("")

  const handleAdd = (data: Omit<ContractorVisit, "id">) => {
    const newContractor: ContractorVisit = {
      ...data,
      id: (contractors.length + 1).toString(),
    }
    setContractors([...contractors, newContractor])
  }

  const handleUpdate = (id: string, data: Partial<ContractorVisit>) => {
    setContractors(contractors.map((c) => (c.id === id ? { ...c, ...data } : c)))
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this contractor visit?")) {
      setContractors(contractors.filter((c) => c.id !== id))
    }
  }

  const filteredContractors = contractors.filter(
    (contractor) =>
      contractor.contractorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.jobType.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Contractor Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage contractor visits, schedules, and analytics</p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => exportToCSV(contractors)}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportToExcel(contractors)}>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AddContractorDialog onAdd={handleAdd} />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="all" className="data-[state=active]:bg-background">
              <Users className="mr-2 h-4 w-4" />
              All Contractors
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-background">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search contractors, companies, or job types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-card border-border"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredContractors.length} of {contractors.length} visits
              </div>
            </div>

            {/* Table */}
            <ContractorTable data={filteredContractors} onUpdate={handleUpdate} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView data={contractors} onUpdate={handleUpdate} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard data={contractors} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
