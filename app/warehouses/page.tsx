"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, Download, Filter, Plus, Search, Warehouse } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WarehousesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWarehouses = warehouseData.filter((warehouse) => {
    return warehouse.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Warehouse Management</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Location
              </Button>
            </div>
          </div>

          <Tabs defaultValue="locations" className="space-y-4">
            <TabsList>
              <TabsTrigger value="locations">Storage Locations</TabsTrigger>
              <TabsTrigger value="transfers">Inventory Transfers</TabsTrigger>
              <TabsTrigger value="scanning">Barcode & RFID</TabsTrigger>
            </TabsList>

            <TabsContent value="locations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Locations</CardTitle>
                  <CardDescription>Manage your warehouses and storage areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search locations..."
                          className="pl-8 w-[250px] sm:w-[300px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">ID</TableHead>
                          <TableHead>
                            <div className="flex items-center gap-1">
                              Location Name
                              <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Usage</TableHead>
                          <TableHead>Temperature</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredWarehouses.map((warehouse) => (
                          <TableRow key={warehouse.id}>
                            <TableCell className="font-medium">{warehouse.id}</TableCell>
                            <TableCell>
                              <Link href={`/warehouses/${warehouse.id}`} className="text-primary hover:underline">
                                {warehouse.name}
                              </Link>
                            </TableCell>
                            <TableCell>{warehouse.type}</TableCell>
                            <TableCell>
                              {warehouse.capacity} {warehouse.capacityUnit}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={warehouse.usagePercent} className="h-2 w-[60px]" />
                                <span className="text-xs">{warehouse.usagePercent}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{warehouse.temperature}</TableCell>
                            <TableCell>{warehouse.itemCount}</TableCell>
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

              <div className="grid gap-4 md:grid-cols-3">
                {filteredWarehouses.slice(0, 3).map((warehouse) => (
                  <Card key={warehouse.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{warehouse.name}</CardTitle>
                        <Warehouse className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardDescription>{warehouse.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Capacity:</span>
                          <span className="font-medium">
                            {warehouse.capacity} {warehouse.capacityUnit}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Usage:</span>
                          <span className="font-medium">{warehouse.usagePercent}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Temperature:</span>
                          <span className="font-medium">{warehouse.temperature}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Items:</span>
                          <span className="font-medium">{warehouse.itemCount}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transfers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Transfers</CardTitle>
                  <CardDescription>Track movement of inventory between locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search transfers..."
                          className="pl-8 w-[250px] sm:w-[300px]"
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
                          <DropdownMenuCheckboxItem checked>All Statuses</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>In Transit</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      New Transfer
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Transfer ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transferData.map((transfer) => (
                          <TableRow key={transfer.id}>
                            <TableCell className="font-medium">{transfer.id}</TableCell>
                            <TableCell>{transfer.date}</TableCell>
                            <TableCell>{transfer.from}</TableCell>
                            <TableCell>{transfer.to}</TableCell>
                            <TableCell>{transfer.items}</TableCell>
                            <TableCell>
                              <TransferStatusBadge status={transfer.status} />
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scanning" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Barcode & RFID Scanning</CardTitle>
                  <CardDescription>Manage scanning devices and configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Barcode Scanners</CardTitle>
                        <CardDescription>Connected devices and status</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Device ID</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Used</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">BC-001</TableCell>
                                <TableCell>Main Warehouse</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500">Online</Badge>
                                </TableCell>
                                <TableCell>Today, 10:45 AM</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">BC-002</TableCell>
                                <TableCell>Main Warehouse</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500">Online</Badge>
                                </TableCell>
                                <TableCell>Today, 11:30 AM</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">BC-003</TableCell>
                                <TableCell>Cold Storage</TableCell>
                                <TableCell>
                                  <Badge className="bg-yellow-500">Idle</Badge>
                                </TableCell>
                                <TableCell>Yesterday, 3:15 PM</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">BC-004</TableCell>
                                <TableCell>Packaging Area</TableCell>
                                <TableCell>
                                  <Badge className="bg-red-500">Offline</Badge>
                                </TableCell>
                                <TableCell>3 days ago</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            Add Scanner
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">RFID Readers</CardTitle>
                        <CardDescription>RFID tracking system status</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Device ID</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Coverage</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">RFID-001</TableCell>
                                <TableCell>Main Warehouse Entrance</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500">Online</Badge>
                                </TableCell>
                                <TableCell>100%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">RFID-002</TableCell>
                                <TableCell>Main Warehouse Exit</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500">Online</Badge>
                                </TableCell>
                                <TableCell>100%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">RFID-003</TableCell>
                                <TableCell>Cold Storage Entrance</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500">Online</Badge>
                                </TableCell>
                                <TableCell>95%</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">RFID-004</TableCell>
                                <TableCell>Shipping Area</TableCell>
                                <TableCell>
                                  <Badge className="bg-yellow-500">Maintenance</Badge>
                                </TableCell>
                                <TableCell>0%</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            Add RFID Reader
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Recent Scans</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Barcode/RFID</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Scanned By</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Today, 11:45 AM</TableCell>
                            <TableCell>Flour (All-Purpose)</TableCell>
                            <TableCell>INV001-B025</TableCell>
                            <TableCell>Main Warehouse</TableCell>
                            <TableCell>John Smith</TableCell>
                            <TableCell>Inventory Count</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Today, 11:30 AM</TableCell>
                            <TableCell>Sugar (Granulated)</TableCell>
                            <TableCell>INV002-B025</TableCell>
                            <TableCell>Main Warehouse</TableCell>
                            <TableCell>John Smith</TableCell>
                            <TableCell>Inventory Count</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Today, 10:15 AM</TableCell>
                            <TableCell>Fresh Milk</TableCell>
                            <TableCell>INV003-B025</TableCell>
                            <TableCell>Cold Storage</TableCell>
                            <TableCell>Sarah Johnson</TableCell>
                            <TableCell>Receiving</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Today, 9:45 AM</TableCell>
                            <TableCell>Chocolate Chip Cookies</TableCell>
                            <TableCell>B2025-0001-P</TableCell>
                            <TableCell>Shipping Area</TableCell>
                            <TableCell>Michael Rodriguez</TableCell>
                            <TableCell>Shipping</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Today, 9:30 AM</TableCell>
                            <TableCell>Vanilla Cupcakes</TableCell>
                            <TableCell>B2025-0002-P</TableCell>
                            <TableCell>Shipping Area</TableCell>
                            <TableCell>Michael Rodriguez</TableCell>
                            <TableCell>Shipping</TableCell>
                          </TableRow>
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

function TransferStatusBadge({ status }) {
  switch (status) {
    case "Pending":
      return <Badge className="bg-yellow-500">{status}</Badge>
    case "In Transit":
      return <Badge className="bg-blue-500">{status}</Badge>
    case "Completed":
      return <Badge className="bg-green-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const warehouseData = [
  {
    id: "WH001",
    name: "Main Warehouse",
    type: "Dry Storage",
    capacity: 5000,
    capacityUnit: "sq ft",
    usagePercent: 75,
    temperature: "Ambient",
    itemCount: 248,
  },
  {
    id: "WH002",
    name: "Cold Storage #1",
    type: "Refrigerated",
    capacity: 1000,
    capacityUnit: "sq ft",
    usagePercent: 60,
    temperature: "2-4°C",
    itemCount: 85,
  },
  {
    id: "WH003",
    name: "Cold Storage #2",
    type: "Refrigerated",
    capacity: 800,
    capacityUnit: "sq ft",
    usagePercent: 45,
    temperature: "4-7°C",
    itemCount: 62,
  },
  {
    id: "WH004",
    name: "Freezer #1",
    type: "Frozen",
    capacity: 500,
    capacityUnit: "sq ft",
    usagePercent: 80,
    temperature: "-18°C",
    itemCount: 45,
  },
  {
    id: "WH005",
    name: "Packaging Area",
    type: "Dry Storage",
    capacity: 1200,
    capacityUnit: "sq ft",
    usagePercent: 65,
    temperature: "Ambient",
    itemCount: 120,
  },
  {
    id: "WH006",
    name: "Shipping Area",
    type: "Staging",
    capacity: 800,
    capacityUnit: "sq ft",
    usagePercent: 50,
    temperature: "Ambient",
    itemCount: 35,
  },
]

const transferData = [
  {
    id: "TR001",
    date: "2025-04-01",
    from: "Main Warehouse",
    to: "Production Line 1",
    items: 12,
    status: "Completed",
  },
  {
    id: "TR002",
    date: "2025-04-01",
    from: "Cold Storage #1",
    to: "Production Line 2",
    items: 8,
    status: "Completed",
  },
  {
    id: "TR003",
    date: "2025-04-02",
    from: "Main Warehouse",
    to: "Production Line 3",
    items: 15,
    status: "In Transit",
  },
  {
    id: "TR004",
    date: "2025-04-02",
    from: "Freezer #1",
    to: "Cold Storage #2",
    items: 6,
    status: "Pending",
  },
  {
    id: "TR005",
    date: "2025-04-03",
    from: "Main Warehouse",
    to: "Shipping Area",
    items: 24,
    status: "Pending",
  },
]

