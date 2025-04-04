"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, Download, Filter, Plus, Search, Star } from "lucide-react"

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

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredSuppliers = supplierData.filter((supplier) => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || supplier.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Supplier Management</h1>
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
                  Add Supplier
                </a>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>Manage your ingredient and packaging suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search suppliers..."
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
                        checked={categoryFilter === "Chocolate"}
                        onCheckedChange={() => setCategoryFilter("Chocolate")}
                      >
                        Chocolate
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Packaging"}
                        onCheckedChange={() => setCategoryFilter("Packaging")}
                      >
                        Packaging
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Flavors"}
                        onCheckedChange={() => setCategoryFilter("Flavors")}
                      >
                        Flavors
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Supplier Name
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Lead Time</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => {
                      // Parse contact information
                      const contactParts = supplier.contact.split(" | ")
                      const name = contactParts[0]
                      const email = contactParts[1]
                      const phone = contactParts[2]

                      return (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">{supplier.id}</TableCell>
                          <TableCell>
                            <Link href={`/suppliers/${supplier.id}`} className="text-primary hover:underline">
                              {supplier.name}
                            </Link>
                          </TableCell>
                          <TableCell>{supplier.category}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{name}</span>
                              <span className="text-sm text-muted-foreground">{email}</span>
                              <span className="text-sm text-muted-foreground">{phone}</span>
                            </div>
                          </TableCell>
                          <TableCell>{supplier.leadTime} days</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < supplier.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <SupplierStatusBadge status={supplier.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <a href={`/suppliers/${supplier.id}`}>
                                <span>View</span>
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function SupplierStatusBadge({ status }) {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-500">{status}</Badge>
    case "On Hold":
      return <Badge className="bg-yellow-500">{status}</Badge>
    case "Inactive":
      return <Badge className="bg-gray-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const supplierData = [
  {
    id: "S001",
    name: "Premium Flour Mills",
    category: "Flour",
    contact: "John Smith | john@premiumflour.com | (555) 123-4567",
    leadTime: 3,
    rating: 4,
    status: "Active",
  },
  {
    id: "S002",
    name: "Sweet Supplies Inc.",
    category: "Sugar",
    contact: "Maria Garcia | maria@sweetsupplies.com | (555) 234-5678",
    leadTime: 3,
    rating: 5,
    status: "Active",
  },
  {
    id: "S003",
    name: "Dairy Fresh",
    category: "Dairy",
    contact: "Robert Johnson | robert@dairyfresh.com | (555) 345-6789",
    leadTime: 2,
    rating: 4,
    status: "Active",
  },
  {
    id: "S004",
    name: "Farm Fresh Eggs",
    category: "Dairy",
    contact: "Sarah Williams | sarah@farmfresheggs.com | (555) 456-7890",
    leadTime: 1,
    rating: 5,
    status: "Active",
  },
  {
    id: "S005",
    name: "Cocoa Delights",
    category: "Chocolate",
    contact: "David Brown | david@cocoadelights.com | (555) 567-8901",
    leadTime: 5,
    rating: 3,
    status: "Active",
  },
  {
    id: "S006",
    name: "Flavor Essentials",
    category: "Flavors",
    contact: "Jennifer Davis | jennifer@flavoressentials.com | (555) 678-9012",
    leadTime: 5,
    rating: 4,
    status: "Active",
  },
  {
    id: "S007",
    name: "Packaging Pro",
    category: "Packaging",
    contact: "Michael Wilson | michael@packagingpro.com | (555) 789-0123",
    leadTime: 7,
    rating: 3,
    status: "Active",
  },
  {
    id: "S008",
    name: "Organic Flour Co.",
    category: "Flour",
    contact: "Lisa Martinez | lisa@organicflour.com | (555) 890-1234",
    leadTime: 4,
    rating: 4,
    status: "Active",
  },
  {
    id: "S009",
    name: "Premium Chocolate Imports",
    category: "Chocolate",
    contact: "James Anderson | james@premiumchocolate.com | (555) 901-2345",
    leadTime: 10,
    rating: 5,
    status: "Active",
  },
  {
    id: "S010",
    name: "Natural Sweeteners",
    category: "Sugar",
    contact: "Patricia Thomas | patricia@naturalsweeteners.com | (555) 012-3456",
    leadTime: 4,
    rating: 3,
    status: "On Hold",
  },
  {
    id: "S011",
    name: "Eco-Friendly Packaging",
    category: "Packaging",
    contact: "Christopher Jackson | chris@ecofriendly.com | (555) 123-4567",
    leadTime: 8,
    rating: 4,
    status: "Active",
  },
  {
    id: "S012",
    name: "Artisan Flavors",
    category: "Flavors",
    contact: "Elizabeth White | elizabeth@artisanflavors.com | (555) 234-5678",
    leadTime: 6,
    rating: 5,
    status: "Active",
  },
  {
    id: "S013",
    name: "Budget Supplies Co.",
    category: "Packaging",
    contact: "Daniel Harris | daniel@budgetsupplies.com | (555) 345-6789",
    leadTime: 5,
    rating: 2,
    status: "Inactive",
  },
]

