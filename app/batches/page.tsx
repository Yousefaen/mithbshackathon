"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, Download, Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"

export default function BatchesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBatches = batchData.filter((batch) => {
    const matchesSearch =
      batch.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Batch Tracking</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="#">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href="#">
                  <Plus className="mr-2 h-4 w-4" />
                  New Batch
                </a>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Production Batches</CardTitle>
              <CardDescription>Track and manage all production batches for traceability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search batches..."
                      className="pl-8 w-[250px] sm:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "all"}
                        onCheckedChange={() => setStatusFilter("all")}
                      >
                        All Statuses
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "In Production"}
                        onCheckedChange={() => setStatusFilter("In Production")}
                      >
                        In Production
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "Completed"}
                        onCheckedChange={() => setStatusFilter("Completed")}
                      >
                        Completed
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "QC Pending"}
                        onCheckedChange={() => setStatusFilter("QC Pending")}
                      >
                        QC Pending
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "Released"}
                        onCheckedChange={() => setStatusFilter("Released")}
                      >
                        Released
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter === "On Hold"}
                        onCheckedChange={() => setStatusFilter("On Hold")}
                      >
                        On Hold
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">
                        <div className="flex items-center gap-1">
                          Batch #
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Production Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>QC Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBatches.map((batch) => (
                      <TableRow key={batch.batchNumber}>
                        <TableCell className="font-medium">
                          <Link href={`/batches/${batch.batchNumber}`} className="text-primary hover:underline">
                            {batch.batchNumber}
                          </Link>
                        </TableCell>
                        <TableCell>{batch.product}</TableCell>
                        <TableCell>{batch.productionDate}</TableCell>
                        <TableCell>{batch.expiryDate}</TableCell>
                        <TableCell>
                          {batch.quantity} {batch.unit}
                        </TableCell>
                        <TableCell>
                          <BatchStatusBadge status={batch.status} />
                        </TableCell>
                        <TableCell>
                          <QCStatusBadge status={batch.qcStatus} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/batches/${batch.batchNumber}`}>
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">View Batch</span>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="#">Next</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function BatchStatusBadge({ status }) {
  switch (status) {
    case "In Production":
      return <Badge className="bg-blue-500">{status}</Badge>
    case "Completed":
      return <Badge className="bg-green-500">{status}</Badge>
    case "QC Pending":
      return <Badge className="bg-yellow-500">{status}</Badge>
    case "Released":
      return <Badge className="bg-emerald-500">{status}</Badge>
    case "On Hold":
      return <Badge className="bg-red-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

function QCStatusBadge({ status }) {
  switch (status) {
    case "Passed":
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          {status}
        </Badge>
      )
    case "Failed":
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          {status}
        </Badge>
      )
    case "Pending":
      return (
        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
          {status}
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const batchData = [
  {
    batchNumber: "B2025-0001",
    product: "Chocolate Chip Cookies",
    productionDate: "2025-03-25",
    expiryDate: "2025-06-25",
    quantity: 500,
    unit: "boxes",
    status: "Released",
    qcStatus: "Passed",
  },
  {
    batchNumber: "B2025-0002",
    product: "Vanilla Cupcakes",
    productionDate: "2025-03-26",
    expiryDate: "2025-04-10",
    quantity: 300,
    unit: "boxes",
    status: "In Production",
    qcStatus: "Pending",
  },
  {
    batchNumber: "B2025-0003",
    product: "Whole Wheat Bread",
    productionDate: "2025-03-27",
    expiryDate: "2025-04-05",
    quantity: 200,
    unit: "loaves",
    status: "QC Pending",
    qcStatus: "Pending",
  },
  {
    batchNumber: "B2025-0004",
    product: "Blueberry Muffins",
    productionDate: "2025-03-28",
    expiryDate: "2025-04-12",
    quantity: 400,
    unit: "boxes",
    status: "Completed",
    qcStatus: "Passed",
  },
  {
    batchNumber: "B2025-0005",
    product: "Cinnamon Rolls",
    productionDate: "2025-03-29",
    expiryDate: "2025-04-08",
    quantity: 250,
    unit: "boxes",
    status: "On Hold",
    qcStatus: "Failed",
  },
  {
    batchNumber: "B2025-0006",
    product: "Sourdough Bread",
    productionDate: "2025-03-30",
    expiryDate: "2025-04-07",
    quantity: 150,
    unit: "loaves",
    status: "Released",
    qcStatus: "Passed",
  },
  {
    batchNumber: "B2025-0007",
    product: "Chocolate Croissants",
    productionDate: "2025-03-31",
    expiryDate: "2025-04-05",
    quantity: 350,
    unit: "boxes",
    status: "In Production",
    qcStatus: "Pending",
  },
  {
    batchNumber: "B2025-0008",
    product: "Oatmeal Cookies",
    productionDate: "2025-04-01",
    expiryDate: "2025-07-01",
    quantity: 450,
    unit: "boxes",
    status: "In Production",
    qcStatus: "Pending",
  },
]

