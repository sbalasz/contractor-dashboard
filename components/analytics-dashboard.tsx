"use client"

import type { ContractorVisit } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Calendar, Clock, Users, TrendingUp } from "lucide-react"

interface AnalyticsDashboardProps {
  data: ContractorVisit[]
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  // Calculate statistics
  const totalVisits = data.length
  const completedVisits = data.filter((v) => v.status === "Completed").length
  const upcomingVisits = data.filter((v) => v.status === "Scheduled").length
  const inProgressVisits = data.filter((v) => v.status === "In Progress").length

  // Job type distribution
  const jobTypeData = Object.entries(
    data.reduce(
      (acc, visit) => {
        acc[visit.jobType] = (acc[visit.jobType] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({ name, value }))

  // Status distribution
  const statusData = Object.entries(
    data.reduce(
      (acc, visit) => {
        acc[visit.status] = (acc[visit.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({ name, value }))

  // Recurrence distribution
  const recurrenceData = Object.entries(
    data.reduce(
      (acc, visit) => {
        acc[visit.recurrence] = (acc[visit.recurrence] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([name, value]) => ({ name, value }))

  // Monthly visits trend (simplified)
  const monthlyData = data.reduce(
    (acc, visit) => {
      const month = new Date(visit.date).toLocaleDateString("en-US", { month: "short" })
      const existing = acc.find((item) => item.month === month)
      if (existing) {
        existing.visits += 1
      } else {
        acc.push({ month, visits: 1 })
      }
      return acc
    },
    [] as { month: string; visits: number }[],
  )

  const COLORS = [
    "#3b82f6", // bright blue
    "#10b981", // bright green
    "#f59e0b", // bright amber
    "#ef4444", // bright red
    "#8b5cf6", // bright purple
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total Visits</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalVisits}</div>
            <p className="text-xs text-muted-foreground">All contractor visits</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{completedVisits}</div>
            <p className="text-xs text-muted-foreground">
              {((completedVisits / totalVisits) * 100).toFixed(0)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{upcomingVisits}</div>
            <p className="text-xs text-muted-foreground">Scheduled visits</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">In Progress</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{inProgressVisits}</div>
            <p className="text-xs text-muted-foreground">Active contractors</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Job Type Distribution</CardTitle>
            <CardDescription className="text-muted-foreground">
              Breakdown of contractor visits by job type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Visits",
                  color: "#3b82f6",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255, 255, 255, 0.5)"
                    fontSize={12}
                    tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
                  />
                  <YAxis stroke="rgba(255, 255, 255, 0.5)" fontSize={12} tick={{ fill: "rgba(255, 255, 255, 0.7)" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Status Overview</CardTitle>
            <CardDescription className="text-muted-foreground">Current status of all contractor visits</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Count",
                  color: "#3b82f6",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#3b82f6"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recurrence Pattern</CardTitle>
            <CardDescription className="text-muted-foreground">How often contractors visit</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Visits",
                  color: "#10b981",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recurrenceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis
                    type="number"
                    stroke="rgba(255, 255, 255, 0.5)"
                    fontSize={12}
                    tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="rgba(255, 255, 255, 0.5)"
                    fontSize={12}
                    width={100}
                    tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Monthly Trend</CardTitle>
            <CardDescription className="text-muted-foreground">Contractor visits over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                visits: {
                  label: "Visits",
                  color: "#f59e0b",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis
                    dataKey="month"
                    stroke="rgba(255, 255, 255, 0.5)"
                    fontSize={12}
                    tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
                  />
                  <YAxis stroke="rgba(255, 255, 255, 0.5)" fontSize={12} tick={{ fill: "rgba(255, 255, 255, 0.7)" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
