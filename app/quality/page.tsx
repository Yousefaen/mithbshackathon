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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QualityControlPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTests = qcTestData.filter((test) => {
    const matchesSearch =
      test.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || test.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Quality Control</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Test
              </Button>
            </div>
          </div>

          <Tabs defaultValue="tests" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tests">QC Tests</TabsTrigger>
              <TabsTrigger value="standards">Quality Standards</TabsTrigger>
              <TabsTrigger value="issues">Quality Issues</TabsTrigger>
            </TabsList>
            <TabsContent value="tests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Control Tests</CardTitle>
                  <CardDescription>Track and manage quality control tests for production batches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search tests..."
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
                            checked={statusFilter === "Pending"}
                            onCheckedChange={() => setStatusFilter("Pending")}
                          >
                            Pending
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={statusFilter === "In Progress"}
                            onCheckedChange={() => setStatusFilter("In Progress")}
                          >
                            In Progress
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={statusFilter === "Completed"}
                            onCheckedChange={() => setStatusFilter("Completed")}
                          >
                            Completed
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={statusFilter === "Failed"}
                            onCheckedChange={() => setStatusFilter("Failed")}
                          >
                            Failed
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mt-4 rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              Date
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Batch #</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Test Type</TableHead>
                          <TableHead>Tested By</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTests.map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.date}</TableCell>
                            <TableCell>
                              <Link href={`/batches/${test.batchNumber}`} className="text-primary hover:underline">
                                {test.batchNumber}
                              </Link>
                            </TableCell>
                            <TableCell>{test.product}</TableCell>
                            <TableCell>{test.testType}</TableCell>
                            <TableCell>{test.testedBy}</TableCell>
                            <TableCell>
                              <TestResultBadge result={test.result} />
                            </TableCell>
                            <TableCell>
                              <TestStatusBadge status={test.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="standards" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Standards</CardTitle>
                  <CardDescription>Product quality specifications and standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Category</TableHead>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Specification</TableHead>
                        <TableHead>Test Method</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {qualityStandards.map((standard, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{standard.category}</TableCell>
                          <TableCell>{standard.parameter}</TableCell>
                          <TableCell>{standard.specification}</TableCell>
                          <TableCell>{standard.testMethod}</TableCell>
                          <TableCell>{standard.frequency}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="issues" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Issues</CardTitle>
                  <CardDescription>Track and resolve quality issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date Reported</TableHead>
                        <TableHead>Issue ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Batch #</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {qualityIssues.map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell className="font-medium">{issue.dateReported}</TableCell>
                          <TableCell>{issue.id}</TableCell>
                          <TableCell>{issue.product}</TableCell>
                          <TableCell>{issue.batchNumber}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{issue.description}</TableCell>
                          <TableCell>
                            <IssueSeverityBadge severity={issue.severity} />
                          </TableCell>
                          <TableCell>
                            <IssueStatusBadge status={issue.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function TestResultBadge({ result }) {
  switch (result) {
    case "Pass":
      return <Badge className="bg-green-500">{result}</Badge>
    case "Fail":
      return <Badge className="bg-red-500">{result}</Badge>
    case "Pending":
      return <Badge className="bg-yellow-500">{result}</Badge>
    default:
      return <Badge>{result}</Badge>
  }
}

function TestStatusBadge({ status }) {
  switch (status) {
    case "Pending":
      return (
        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
          {status}
        </Badge>
      )
    case "In Progress":
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          {status}
        </Badge>
      )
    case "Completed":
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
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function IssueSeverityBadge({ severity }) {
  switch (severity) {
    case "Critical":
      return <Badge className="bg-red-500">{severity}</Badge>
    case "Major":
      return <Badge className="bg-orange-500">{severity}</Badge>
    case "Minor":
      return <Badge className="bg-yellow-500">{severity}</Badge>
    default:
      return <Badge>{severity}</Badge>
  }
}

function IssueStatusBadge({ status }) {
  switch (status) {
    case "Open":
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          {status}
        </Badge>
      )
    case "In Progress":
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-500">
          {status}
        </Badge>
      )
    case "Resolved":
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          {status}
        </Badge>
      )
    case "Closed":
      return (
        <Badge variant="outline" className="border-gray-500 text-gray-500">
          {status}
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const qcTestData = [
  {
    id: "QC001",
    date: "2025-04-01",
    batchNumber: "B2025-0001",
    product: "Chocolate Chip Cookies",
    testType: "Microbiological",
    testedBy: "Sarah Johnson",
    result: "Pass",
    status: "Completed",
  },
  {
    id: "QC002",
    date: "2025-04-01",
    batchNumber: "B2025-0001",
    product: "Chocolate Chip Cookies",
    testType: "Sensory Evaluation",
    testedBy: "Taste Panel",
    result: "Pass",
    status: "Completed",
  },
  {
    id: "QC003",
    date: "2025-04-01",
    batchNumber: "B2025-0001",
    product: "Chocolate Chip Cookies",
    testType: "Physical Properties",
    testedBy: "John Smith",
    result: "Pass",
    status: "Completed",
  },
  {
    id: "QC004",
    date: "2025-04-01",
    batchNumber: "B2025-0001",
    product: "Chocolate Chip Cookies",
    testType: "Metal Detection",
    testedBy: "Quality Team",
    result: "Pass",
    status: "Completed",
  },
  {
    id: "QC005",
    date: "2025-04-01",
    batchNumber: "B2025-0002",
    product: "Vanilla Cupcakes",
    testType: "Microbiological",
    testedBy: "Sarah Johnson",
    result: "Pending",
    status: "In Progress",
  },
  {
    id: "QC006",
    date: "2025-04-01",
    batchNumber: "B2025-0002",
    product: "Vanilla Cupcakes",
    testType: "Sensory Evaluation",
    testedBy: "Taste Panel",
    result: "Pending",
    status: "Pending",
  },
  {
    id: "QC007",
    date: "2025-03-30",
    batchNumber: "B2025-0005",
    product: "Cinnamon Rolls",
    testType: "Microbiological",
    testedBy: "Sarah Johnson",
    result: "Fail",
    status: "Failed",
  },
  {
    id: "QC008",
    date: "2025-03-30",
    batchNumber: "B2025-0005",
    product: "Cinnamon Rolls",
    testType: "Sensory Evaluation",
    testedBy: "Taste Panel",
    result: "Fail",
    status: "Failed",
  },
  {
    id: "QC009",
    date: "2025-03-30",
    batchNumber: "B2025-0006",
    product: "Sourdough Bread",
    testType: "Microbiological",
    testedBy: "Sarah Johnson",
    result: "Pass",
    status: "Completed",
  },
  {
    id: "QC010",
    date: "2025-03-30",
    batchNumber: "B2025-0006",
    product: "Sourdough Bread",
    testType: "Physical Properties",
    testedBy: "John Smith",
    result: "Pass",
    status: "Completed",
  },
]

const qualityStandards = [
  {
    category: "Cookies",
    parameter: "Moisture Content",
    specification: "≤ 5.0%",
    testMethod: "Moisture Analyzer",
    frequency: "Every batch",
  },
  {
    category: "Cookies",
    parameter: "Weight",
    specification: "50g ± 2g per cookie",
    testMethod: "Digital Scale",
    frequency: "Every batch",
  },
  {
    category: "Cookies",
    parameter: "Microbiological",
    specification: "< 100 CFU/g",
    testMethod: "Plate Count",
    frequency: "Daily",
  },
  {
    category: "Bread",
    parameter: "Moisture Content",
    specification: "35-40%",
    testMethod: "Moisture Analyzer",
    frequency: "Every batch",
  },
  {
    category: "Bread",
    parameter: "pH",
    specification: "5.0-5.5",
    testMethod: "pH Meter",
    frequency: "Every batch",
  },
  {
    category: "Bread",
    parameter: "Volume",
    specification: "≥ 500ml per 100g",
    testMethod: "Displacement Method",
    frequency: "Every batch",
  },
  {
    category: "Cupcakes",
    parameter: "Height",
    specification: "5-6cm",
    testMethod: "Digital Caliper",
    frequency: "Every batch",
  },
  {
    category: "Cupcakes",
    parameter: "Weight",
    specification: "60g ± 3g per cupcake",
    testMethod: "Digital Scale",
    frequency: "Every batch",
  },
  {
    category: "All Products",
    parameter: "Metal Detection",
    specification: "No metal > 2.0mm",
    testMethod: "Metal Detector",
    frequency: "Every batch",
  },
  {
    category: "All Products",
    parameter: "Allergen Control",
    specification: "No cross-contamination",
    testMethod: "Allergen Test Kits",
    frequency: "Daily",
  },
]

const qualityIssues = [
  {
    id: "QI001",
    dateReported: "2025-03-30",
    product: "Cinnamon Rolls",
    batchNumber: "B2025-0005",
    description: "Excessive yeast growth detected in microbiological testing. Batch failed quality standards.",
    severity: "Major",
    status: "In Progress",
  },
  {
    id: "QI002",
    dateReported: "2025-03-28",
    product: "Chocolate Chip Cookies",
    batchNumber: "B2025-0001",
    description: "Customer complaint about inconsistent chocolate chip distribution in some packages.",
    severity: "Minor",
    status: "Resolved",
  },
  {
    id: "QI003",
    dateReported: "2025-03-25",
    product: "Whole Wheat Bread",
    batchNumber: "B2025-0003",
    description: "Bread not rising properly, resulting in dense texture. Issue with yeast activity.",
    severity: "Major",
    status: "Resolved",
  },
  {
    id: "QI004",
    dateReported: "2025-03-20",
    product: "Blueberry Muffins",
    batchNumber: "B2025-0004",
    description: "Foreign object (plastic fragment) found during production. Metal detection system worked correctly.",
    severity: "Critical",
    status: "Closed",
  },
  {
    id: "QI005",
    dateReported: "2025-04-01",
    product: "Vanilla Cupcakes",
    batchNumber: "B2025-0002",
    description: "Inconsistent coloring in frosting across batch. Visual inspection identified the issue.",
    severity: "Minor",
    status: "Open",
  },
]

