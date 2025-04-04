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

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredRecipes = recipeData.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || recipe.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Recipe Management</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Recipe
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Production Recipes</CardTitle>
              <CardDescription>Manage your product recipes and formulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search recipes..."
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
                        checked={categoryFilter === "Cookies"}
                        onCheckedChange={() => setCategoryFilter("Cookies")}
                      >
                        Cookies
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Bread"}
                        onCheckedChange={() => setCategoryFilter("Bread")}
                      >
                        Bread
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Cakes"}
                        onCheckedChange={() => setCategoryFilter("Cakes")}
                      >
                        Cakes
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Pastries"}
                        onCheckedChange={() => setCategoryFilter("Pastries")}
                      >
                        Pastries
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={categoryFilter === "Muffins"}
                        onCheckedChange={() => setCategoryFilter("Muffins")}
                      >
                        Muffins
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
                          Recipe Name
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Ingredients</TableHead>
                      <TableHead>Allergens</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecipes.map((recipe) => (
                      <TableRow key={recipe.id}>
                        <TableCell className="font-medium">{recipe.id}</TableCell>
                        <TableCell>
                          <Link href={`/recipes/${recipe.id}`} className="text-primary hover:underline">
                            {recipe.name}
                          </Link>
                        </TableCell>
                        <TableCell>{recipe.category}</TableCell>
                        <TableCell>v{recipe.version}</TableCell>
                        <TableCell>{recipe.ingredientCount}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {recipe.allergens.map((allergen, index) => (
                              <Badge key={index} variant="outline" className="border-red-500 text-red-500 text-xs">
                                {allergen}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <RecipeStatusBadge status={recipe.status} />
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
        </div>
      </main>
    </div>
  )
}

function RecipeStatusBadge({ status }) {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-500">{status}</Badge>
    case "Draft":
      return <Badge className="bg-yellow-500">{status}</Badge>
    case "Archived":
      return <Badge className="bg-gray-500">{status}</Badge>
    case "Under Review":
      return <Badge className="bg-blue-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const recipeData = [
  {
    id: "R001",
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    version: "2.3",
    ingredientCount: 8,
    allergens: ["Wheat", "Milk", "Eggs"],
    status: "Active",
  },
  {
    id: "R002",
    name: "Vanilla Cupcakes",
    category: "Cakes",
    version: "1.5",
    ingredientCount: 10,
    allergens: ["Wheat", "Milk", "Eggs"],
    status: "Active",
  },
  {
    id: "R003",
    name: "Whole Wheat Bread",
    category: "Bread",
    version: "3.1",
    ingredientCount: 6,
    allergens: ["Wheat"],
    status: "Active",
  },
  {
    id: "R004",
    name: "Blueberry Muffins",
    category: "Muffins",
    version: "2.0",
    ingredientCount: 9,
    allergens: ["Wheat", "Milk", "Eggs"],
    status: "Active",
  },
  {
    id: "R005",
    name: "Cinnamon Rolls",
    category: "Pastries",
    version: "1.8",
    ingredientCount: 11,
    allergens: ["Wheat", "Milk", "Eggs"],
    status: "Active",
  },
  {
    id: "R006",
    name: "Sourdough Bread",
    category: "Bread",
    version: "4.2",
    ingredientCount: 4,
    allergens: ["Wheat"],
    status: "Active",
  },
  {
    id: "R007",
    name: "Chocolate Croissants",
    category: "Pastries",
    version: "2.5",
    ingredientCount: 7,
    allergens: ["Wheat", "Milk", "Soy"],
    status: "Active",
  },
  {
    id: "R008",
    name: "Oatmeal Cookies",
    category: "Cookies",
    version: "1.3",
    ingredientCount: 9,
    allergens: ["Wheat", "Milk", "Eggs"],
    status: "Active",
  },
  {
    id: "R009",
    name: "Gluten-Free Bread",
    category: "Bread",
    version: "3.0",
    ingredientCount: 8,
    allergens: ["Eggs"],
    status: "Under Review",
  },
  {
    id: "R010",
    name: "Red Velvet Cake",
    category: "Cakes",
    version: "2.1",
    ingredientCount: 12,
    allergens: ["Wheat", "Milk", "Eggs"],
    status: "Draft",
  },
  {
    id: "R011",
    name: "Pumpkin Spice Muffins",
    category: "Muffins",
    version: "1.0",
    ingredientCount: 10,
    allergens: ["Wheat", "Eggs"],
    status: "Draft",
  },
  {
    id: "R012",
    name: "Classic Baguette",
    category: "Bread",
    version: "5.3",
    ingredientCount: 5,
    allergens: ["Wheat"],
    status: "Archived",
  },
]

