"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Calendar, ChevronDown, Download, Filter, Plus, Search } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"

export default function ProductionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSchedule = productionSchedule.filter((item) => {
    const matchesSearch = item.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Production Planning</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Production Run
              </Button>
            </div>
          </div>

          <Tabs defaultValue="schedule" className="space-y-4">
            <TabsList>
              <TabsTrigger value="schedule">Production Schedule</TabsTrigger>
              <TabsTrigger value="forecast">Inventory Forecast</TabsTrigger>
              <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
            </TabsList>
            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Production Schedule</CardTitle>
                  <CardDescription>Upcoming production runs and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search products..."
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
                            checked={statusFilter === "Scheduled"}
                            onCheckedChange={() => setStatusFilter("Scheduled")}
                          >
                            Scheduled
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
                            checked={statusFilter === "Delayed"}
                            onCheckedChange={() => setStatusFilter("Delayed")}
                          >
                            Delayed
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-9">
                        <Calendar className="mr-2 h-4 w-4" />
                        April 2025
                      </Button>
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
                          <TableHead>Product</TableHead>
                          <TableHead>Batch Size</TableHead>
                          <TableHead>Line</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Inventory Impact</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSchedule.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.date}</TableCell>
                            <TableCell>
                              <Link href={`/recipes/${item.recipeId}`} className="text-primary hover:underline">
                                {item.product}
                              </Link>
                            </TableCell>
                            <TableCell>{item.batchSize}</TableCell>
                            <TableCell>{item.productionLine}</TableCell>
                            <TableCell>
                              <ProductionStatusBadge status={item.status} />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={item.progress} className="h-2 w-[60px]" />
                                <span className="text-xs">{item.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-xs text-green-500">
                                  +{item.batchSize} {item.unit}
                                </span>
                                <span className="text-xs text-red-500">-{item.ingredientsUsed} ingredients</span>
                              </div>
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
            <TabsContent value="forecast" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Forecast</CardTitle>
                  <CardDescription>Projected inventory levels based on production schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Critical Ingredients</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ingredient</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Projected Usage</TableHead>
                            <TableHead>Remaining Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action Required</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {inventoryForecast.map((item) => (
                            <TableRow key={item.ingredient}>
                              <TableCell className="font-medium">{item.ingredient}</TableCell>
                              <TableCell>
                                {item.currentStock} {item.unit}
                              </TableCell>
                              <TableCell>
                                {item.projectedUsage} {item.unit}
                              </TableCell>
                              <TableCell>
                                {item.remainingStock} {item.unit}
                              </TableCell>
                              <TableCell>
                                <ForecastStatusBadge status={item.status} />
                              </TableCell>
                              <TableCell>{item.actionRequired}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Recommended Orders</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ingredient</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Order Quantity</TableHead>
                            <TableHead>Estimated Cost</TableHead>
                            <TableHead>Lead Time</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recommendedOrders.map((order) => (
                            <TableRow key={order.ingredient}>
                              <TableCell className="font-medium">{order.ingredient}</TableCell>
                              <TableCell>{order.supplier}</TableCell>
                              <TableCell>
                                {order.orderQuantity} {order.unit}
                              </TableCell>
                              <TableCell>${order.estimatedCost.toFixed(2)}</TableCell>
                              <TableCell>{order.leadTime} days</TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                  Order Now
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="capacity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Production Capacity</CardTitle>
                  <CardDescription>Current production line capacity and utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {productionLines.map((line) => (
                        <Card key={line.name}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{line.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Utilization</span>
                                <span className="font-medium">{line.utilization}%</span>
                              </div>
                              <Progress value={line.utilization} className="h-2" />
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Capacity:</span>
                                  <span className="ml-1 font-medium">{line.capacity} units/day</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Scheduled:</span>
                                  <span className="ml-1 font-medium">{line.scheduled} units/day</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Products:</span>
                                  <span className="ml-1 font-medium">{line.products.join(", ")}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Status:</span>
                                  <span className="ml-1 font-medium">{line.status}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Production Bottlenecks</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Resource</TableHead>
                            <TableHead>Issue</TableHead>
                            <TableHead>Impact</TableHead>
                            <TableHead>Recommended Action</TableHead>
                            <TableHead className="text-right">Priority</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bottlenecks.map((bottleneck) => (
                            <TableRow key={bottleneck.resource}>
                              <TableCell className="font-medium">{bottleneck.resource}</TableCell>
                              <TableCell>{bottleneck.issue}</TableCell>
                              <TableCell>{bottleneck.impact}</TableCell>
                              <TableCell>{bottleneck.recommendedAction}</TableCell>
                              <TableCell className="text-right">
                                <PriorityBadge priority={bottleneck.priority} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function ProductionStatusBadge({ status }) {
  switch (status) {
    case "Scheduled":
      return <Badge className="bg-blue-500">{status}</Badge>
    case "In Progress":
      return <Badge className="bg-yellow-500">{status}</Badge>
    case "Completed":
      return <Badge className="bg-green-500">{status}</Badge>
    case "Delayed":
      return <Badge className="bg-red-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

function ForecastStatusBadge({ status }) {
  switch (status) {
    case "Sufficient":
      return <Badge className="bg-green-500">{status}</Badge>
    case "Warning":
      return <Badge className="bg-yellow-500">{status}</Badge>
    case "Critical":
      return <Badge className="bg-red-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

function PriorityBadge({ priority }) {
  switch (priority) {
    case "High":
      return <Badge className="bg-red-500">{priority}</Badge>
    case "Medium":
      return <Badge className="bg-yellow-500">{priority}</Badge>
    case "Low":
      return <Badge className="bg-green-500">{priority}</Badge>
    default:
      return <Badge>{priority}</Badge>
  }
}

const productionSchedule = [
  {
    id: "PS001",
    date: "2025-04-02",
    product: "Chocolate Chip Cookies",
    recipeId: "R001",
    batchSize: 500,
    unit: "boxes",
    productionLine: "Line 1",
    status: "In Progress",
    progress: 65,
    ingredientsUsed: 12,
  },
  {
    id: "PS002",
    date: "2025-04-02",
    product: "Vanilla Cupcakes",
    recipeId: "R002",
    batchSize: 300,
    unit: "boxes",
    productionLine: "Line 2",
    status: "Scheduled",
    progress: 0,
    ingredientsUsed: 10,
  },
  {
    id: "PS003",
    date: "2025-04-03",
    product: "Whole Wheat Bread",
    recipeId: "R003",
    batchSize: 200,
    unit: "loaves",
    productionLine: "Line 3",
    status: "Scheduled",
    progress: 0,
    ingredientsUsed: 6,
  },
  {
    id: "PS004",
    date: "2025-04-03",
    product: "Blueberry Muffins",
    recipeId: "R004",
    batchSize: 400,
    unit: "boxes",
    productionLine: "Line 2",
    status: "Scheduled",
    progress: 0,
    ingredientsUsed: 9,
  },
  {
    id: "PS005",
    date: "2025-04-01",
    product: "Cinnamon Rolls",
    recipeId: "R005",
    batchSize: 250,
    unit: "boxes",
    productionLine: "Line 1",
    status: "Completed",
    progress: 100,
    ingredientsUsed: 11,
  },
  {
    id: "PS006",
    date: "2025-04-01",
    product: "Sourdough Bread",
    recipeId: "R006",
    batchSize: 150,
    unit: "loaves",
    productionLine: "Line 3",
    status: "Completed",
    progress: 100,
    ingredientsUsed: 4,
  },
  {
    id: "PS007",
    date: "2025-04-04",
    product: "Chocolate Croissants",
    recipeId: "R007",
    batchSize: 350,
    unit: "boxes",
    productionLine: "Line 1",
    status: "Scheduled",
    progress: 0,
    ingredientsUsed: 7,
  },
  {
    id: "PS008",
    date: "2025-04-04",
    product: "Oatmeal Cookies",
    recipeId: "R008",
    batchSize: 450,
    unit: "boxes",
    productionLine: "Line 2",
    status: "Delayed",
    progress: 0,
    ingredientsUsed: 9,
  },
]

const inventoryForecast = [
  {
    ingredient: "Flour (All-Purpose)",
    currentStock: 120,
    projectedUsage: 95,
    remainingStock: 25,
    unit: "kg",
    status: "Warning",
    actionRequired: "Order within 3 days",
  },
  {
    ingredient: "Sugar (Granulated)",
    currentStock: 80,
    projectedUsage: 65,
    remainingStock: 15,
    unit: "kg",
    status: "Warning",
    actionRequired: "Order within 3 days",
  },
  {
    ingredient: "Butter",
    currentStock: 45,
    projectedUsage: 42,
    remainingStock: 3,
    unit: "kg",
    status: "Critical",
    actionRequired: "Order immediately",
  },
  {
    ingredient: "Eggs",
    currentStock: 200,
    projectedUsage: 180,
    remainingStock: 20,
    unit: "pcs",
    status: "Warning",
    actionRequired: "Order within 2 days",
  },
  {
    ingredient: "Chocolate Chips",
    currentStock: 40,
    projectedUsage: 25,
    remainingStock: 15,
    unit: "kg",
    status: "Sufficient",
    actionRequired: "No action needed",
  },
  {
    ingredient: "Vanilla Extract",
    currentStock: 5,
    projectedUsage: 4.5,
    remainingStock: 0.5,
    unit: "L",
    status: "Critical",
    actionRequired: "Order immediately",
  },
  {
    ingredient: "Baking Powder",
    currentStock: 8,
    projectedUsage: 3,
    remainingStock: 5,
    unit: "kg",
    status: "Sufficient",
    actionRequired: "No action needed",
  },
]

const recommendedOrders = [
  {
    ingredient: "Flour (All-Purpose)",
    supplier: "Premium Flour Mills",
    orderQuantity: 100,
    unit: "kg",
    estimatedCost: 120.0,
    leadTime: 3,
  },
  {
    ingredient: "Sugar (Granulated)",
    supplier: "Sweet Supplies Inc.",
    orderQuantity: 75,
    unit: "kg",
    estimatedCost: 67.5,
    leadTime: 3,
  },
  {
    ingredient: "Butter",
    supplier: "Dairy Fresh",
    orderQuantity: 50,
    unit: "kg",
    estimatedCost: 225.0,
    leadTime: 2,
  },
  {
    ingredient: "Eggs",
    supplier: "Farm Fresh Eggs",
    orderQuantity: 300,
    unit: "pcs",
    estimatedCost: 60.0,
    leadTime: 1,
  },
  {
    ingredient: "Vanilla Extract",
    supplier: "Flavor Essentials",
    orderQuantity: 5,
    unit: "L",
    estimatedCost: 150.0,
    leadTime: 5,
  },
]

const productionLines = [
  {
    name: "Production Line 1",
    capacity: 1000,
    scheduled: 850,
    utilization: 85,
    products: ["Cookies", "Pastries"],
    status: "Operational",
  },
  {
    name: "Production Line 2",
    capacity: 800,
    scheduled: 700,
    utilization: 88,
    products: ["Cupcakes", "Muffins"],
    status: "Operational",
  },
  {
    name: "Production Line 3",
    capacity: 600,
    scheduled: 350,
    utilization: 58,
    products: ["Bread"],
    status: "Operational",
  },
]

const bottlenecks = [
  {
    resource: "Mixer 2 (Line 1)",
    issue: "Operating at reduced capacity due to maintenance issue",
    impact: "Reduced throughput on cookie production by 15%",
    recommendedAction: "Schedule maintenance for April 5th",
    priority: "Medium",
  },
  {
    resource: "Packaging Machine (Line 2)",
    issue: "Frequent jams causing downtime",
    impact: "Approximately 45 minutes of downtime per shift",
    recommendedAction: "Replace worn parts and recalibrate",
    priority: "High",
  },
  {
    resource: "Staff - Morning Shift",
    issue: "Understaffed by 2 people",
    impact: "Slower changeovers between production runs",
    recommendedAction: "Approve overtime or temporary staff",
    priority: "Medium",
  },
  {
    resource: "Refrigeration Unit 3",
    issue: "Temperature fluctuations",
    impact: "Risk to butter and dairy ingredient quality",
    recommendedAction: "Service refrigeration unit",
    priority: "High",
  },
]

