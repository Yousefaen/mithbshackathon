"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredInventory = inventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Manage your ingredients and supplies inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search items..."
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
                        checked={categoryFilter === "all"}
                        onCheckedChange={() => setCategoryFilter("all")}
                      >
                        All Categories
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Flour"}
                        onCheckedChange={() => setCategoryFilter("Flour")}
                      >
                        Flour
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Sugar"}
                        onCheckedChange={() => setCategoryFilter("Sugar")}
                      >
                        Sugar
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Dairy"}
                        onCheckedChange={() => setCategoryFilter("Dairy")}
                      >
                        Dairy
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Fruits"}
                        onCheckedChange={() => setCategoryFilter("Fruits")}
                      >
                        Fruits
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Nuts"}
                        onCheckedChange={() => setCategoryFilter("Nuts")}
                      >
                        Nuts
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Chocolate"}
                        onCheckedChange={() => setCategoryFilter("Chocolate")}
                      >
                        Chocolate
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Baking"}
                        onCheckedChange={() => setCategoryFilter("Baking")}
                      >
                        Baking
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="10">
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredInventory.length} of {inventoryItems.length} items
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Name
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Unit</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right">Expiry Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{item.unit}</TableCell>
                        <TableCell className="text-right">
                          <StockStatusBadge status={item.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          {item.expiryDate}
                          {isExpiringSoon(item.expiryDate) && <span className="ml-2 text-red-500">!</span>}
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
              <div className="mt-4 flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function StockStatusBadge({ status }) {
  if (status === "In Stock") {
    return <Badge className="bg-green-500">{status}</Badge>
  } else if (status === "Low Stock") {
    return <Badge className="bg-yellow-500">{status}</Badge>
  } else {
    return <Badge className="bg-red-500">{status}</Badge>
  }
}

function isExpiringSoon(dateString) {
  const expiryDate = new Date(dateString)
  const today = new Date()
  const diffTime = expiryDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7 && diffDays >= 0
}

const inventoryItems = [
  {
    id: "INV001",
    name: "Flour (All-Purpose)",
    category: "Flour",
    quantity: 75,
    unit: "kg",
    status: "Low Stock",
    expiryDate: "2025-06-15",
  },
  {
    id: "INV002",
    name: "Sugar (Granulated)",
    category: "Sugar",
    quantity: 80,
    unit: "kg",
    status: "Low Stock",
    expiryDate: "2025-08-20",
  },
  {
    id: "INV003",
    name: "Fresh Milk",
    category: "Dairy",
    quantity: 25,
    unit: "L",
    status: "In Stock",
    expiryDate: "2025-04-03",
  },
  {
    id: "INV004",
    name: "Cream Cheese",
    category: "Dairy",
    quantity: 15,
    unit: "kg",
    status: "In Stock",
    expiryDate: "2025-04-04",
  },
  {
    id: "INV005",
    name: "Strawberries",
    category: "Fruits",
    quantity: 10,
    unit: "kg",
    status: "Low Stock",
    expiryDate: "2025-04-06",
  },
  {
    id: "INV006",
    name: "Almonds",
    category: "Nuts",
    quantity: 30,
    unit: "kg",
    status: "In Stock",
    expiryDate: "2025-07-15",
  },
  {
    id: "INV007",
    name: "Cocoa Powder",
    category: "Chocolate",
    quantity: 25,
    unit: "kg",
    status: "Low Stock",
    expiryDate: "2025-05-30",
  },
  {
    id: "INV008",
    name: "Vanilla Extract",
    category: "Baking",
    quantity: 5,
    unit: "L",
    status: "Low Stock",
    expiryDate: "2025-09-10",
  },
  {
    id: "INV009",
    name: "Baking Powder",
    category: "Baking",
    quantity: 8,
    unit: "kg",
    status: "Low Stock",
    expiryDate: "2025-10-15",
  },
  {
    id: "INV010",
    name: "Fresh Eggs",
    category: "Dairy",
    quantity: 200,
    unit: "pcs",
    status: "In Stock",
    expiryDate: "2025-04-06",
  },
  {
    id: "INV011",
    name: "Fresh Yeast",
    category: "Baking",
    quantity: 3,
    unit: "kg",
    status: "Low Stock",
    expiryDate: "2025-04-07",
  },
  {
    id: "INV012",
    name: "Dark Chocolate",
    category: "Chocolate",
    quantity: 40,
    unit: "kg",
    status: "In Stock",
    expiryDate: "2025-08-25",
  },
]

