import type { ContractorVisit } from "./types"

export function exportToCSV(data: ContractorVisit[], filename = "contractor-visits.csv") {
  const headers = [
    "ID",
    "Contractor Name",
    "Company",
    "Job Type",
    "Description",
    "Date",
    "Time In",
    "Time Out",
    "Status",
    "Recurrence",
    "Next Scheduled",
    "Contact Email",
    "Contact Phone",
  ]

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      [
        row.id,
        `"${row.contractorName}"`,
        `"${row.company}"`,
        `"${row.jobType}"`,
        `"${row.description}"`,
        row.date,
        row.timeIn,
        row.timeOut,
        row.status,
        row.recurrence,
        row.nextScheduled || "",
        row.contactEmail,
        row.contactPhone,
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToExcel(data: ContractorVisit[], filename = "contractor-visits.xlsx") {
  // For Excel export, we'll create a more structured format
  // This creates a TSV (Tab-Separated Values) which Excel can open
  const headers = [
    "ID",
    "Contractor Name",
    "Company",
    "Job Type",
    "Description",
    "Date",
    "Time In",
    "Time Out",
    "Status",
    "Recurrence",
    "Next Scheduled",
    "Contact Email",
    "Contact Phone",
  ]

  const tsvContent = [
    headers.join("\t"),
    ...data.map((row) =>
      [
        row.id,
        row.contractorName,
        row.company,
        row.jobType,
        row.description,
        row.date,
        row.timeIn,
        row.timeOut,
        row.status,
        row.recurrence,
        row.nextScheduled || "",
        row.contactEmail,
        row.contactPhone,
      ].join("\t"),
    ),
  ].join("\n")

  const blob = new Blob([tsvContent], { type: "application/vnd.ms-excel" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
