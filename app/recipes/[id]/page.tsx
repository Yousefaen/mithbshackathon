"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator, ChevronDown, Download, Edit, Package, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RecipeDetailPage({ params }) {
  const recipeId = params.id
  const recipe = getRecipeById(recipeId)
  const [batchSize, setBatchSize] = useState(recipe.defaultBatchSize)

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  const calculateIngredientAmount = (amount) => {
    return ((amount / recipe.defaultBatchSize) * batchSize).toFixed(2)
  }

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-2">
            <Link href="/recipes">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{recipe.name}</h1>
            <Badge className="ml-2">v{recipe.version}</Badge>
            <RecipeStatusBadge status={recipe.status} />
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Recipe
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Category</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{recipe.category}</div>
                <p className="text-xs text-muted-foreground">Product Type: {recipe.productType}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingredients</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{recipe.ingredients.length}</div>
                <p className="text-xs text-muted-foreground">Total ingredients in recipe</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yield</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{recipe.yield}</div>
                <p className="text-xs text-muted-foreground">Per standard batch</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Created</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{recipe.createdDate}</div>
                <p className="text-xs text-muted-foreground">By: {recipe.createdBy}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="ingredients" className="space-y-4">
            <TabsList>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="allergens">Allergen Info</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="history">Version History</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div>
                    <CardTitle>Recipe Ingredients</CardTitle>
                    <CardDescription>Ingredients and quantities for this recipe</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="grid w-[180px] items-center gap-1.5">
                      <Label htmlFor="batch-size">Batch Size</Label>
                      <div className="flex items-center">
                        <Input
                          id="batch-size"
                          type="number"
                          value={batchSize}
                          onChange={(e) => setBatchSize(Number(e.target.value))}
                          className="w-24"
                        />
                        <span className="ml-2">{recipe.batchUnit}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ingredient</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Inventory Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recipe.ingredients.map((ingredient) => (
                        <TableRow key={ingredient.name}>
                          <TableCell className="font-medium">{ingredient.name}</TableCell>
                          <TableCell>{calculateIngredientAmount(ingredient.amount)}</TableCell>
                          <TableCell>{ingredient.unit}</TableCell>
                          <TableCell>
                            ${(ingredient.costPerUnit * calculateIngredientAmount(ingredient.amount)).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <InventoryStatusBadge status={ingredient.inventoryStatus} />
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
                  <div className="mt-4 flex justify-between">
                    <div>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Ingredient
                      </Button>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">
                        Total Cost: $
                        {recipe.ingredients
                          .reduce((total, ingredient) => {
                            return total + ingredient.costPerUnit * calculateIngredientAmount(ingredient.amount)
                          }, 0)
                          .toFixed(2)}
                      </div>
                      <div className="text-muted-foreground">
                        Cost per unit: $
                        {(
                          recipe.ingredients.reduce((total, ingredient) => {
                            return total + ingredient.costPerUnit * calculateIngredientAmount(ingredient.amount)
                          }, 0) / recipe.yield
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="instructions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preparation Instructions</CardTitle>
                  <CardDescription>Step-by-step instructions for this recipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className="h-6 w-6 rounded-full text-center p-0 flex items-center justify-center">
                            {index + 1}
                          </Badge>
                          <h3 className="text-lg font-medium">{instruction.title}</h3>
                        </div>
                        <Separator className="my-2" />
                        <p className="text-sm">{instruction.description}</p>
                        {instruction.parameters && (
                          <div className="mt-2 rounded-md border p-3 bg-muted/50">
                            <h4 className="text-sm font-medium mb-2">Parameters:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              {Object.entries(instruction.parameters).map(([key, value]) => (
                                <li key={key} className="flex items-center justify-between">
                                  <span className="text-muted-foreground">{key}:</span>
                                  <span className="font-medium">{value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="allergens" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Allergen Information</CardTitle>
                  <CardDescription>Allergen profile for this recipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Contains</h3>
                      <Separator className="my-2" />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {recipe.allergens.contains.map((allergen) => (
                          <Badge key={allergen} variant="outline" className="border-red-500 text-red-500">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">May Contain (Cross-Contamination)</h3>
                      <Separator className="my-2" />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {recipe.allergens.mayContain.map((allergen) => (
                          <Badge key={allergen} variant="outline" className="border-yellow-500 text-yellow-500">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Allergen Source Ingredients</h3>
                      <Separator className="my-2" />
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ingredient</TableHead>
                            <TableHead>Allergens</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recipe.allergens.sourceIngredients.map((item) => (
                            <TableRow key={item.ingredient}>
                              <TableCell className="font-medium">{item.ingredient}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {item.allergens.map((allergen, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="border-red-500 text-red-500 text-xs"
                                    >
                                      {allergen}
                                    </Badge>
                                  ))}
                                </div>
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
            <TabsContent value="nutrition" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Information</CardTitle>
                  <CardDescription>Nutritional values per serving</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Macronutrients</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nutrient</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>% Daily Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recipe.nutrition.macronutrients.map((nutrient) => (
                            <TableRow key={nutrient.name}>
                              <TableCell className="font-medium">{nutrient.name}</TableCell>
                              <TableCell>
                                {nutrient.amount} {nutrient.unit}
                              </TableCell>
                              <TableCell>{nutrient.dailyValue}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Micronutrients</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nutrient</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>% Daily Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recipe.nutrition.micronutrients.map((nutrient) => (
                            <TableRow key={nutrient.name}>
                              <TableCell className="font-medium">{nutrient.name}</TableCell>
                              <TableCell>
                                {nutrient.amount} {nutrient.unit}
                              </TableCell>
                              <TableCell>{nutrient.dailyValue}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Serving Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-md">
                        <div className="text-sm text-muted-foreground">Serving Size</div>
                        <div className="text-xl font-bold">{recipe.nutrition.servingSize}</div>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="text-sm text-muted-foreground">Servings Per Batch</div>
                        <div className="text-xl font-bold">{recipe.nutrition.servingsPerBatch}</div>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="text-sm text-muted-foreground">Calories Per Serving</div>
                        <div className="text-xl font-bold">{recipe.nutrition.caloriesPerServing} kcal</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Version History</CardTitle>
                  <CardDescription>Changes made to this recipe over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Version</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Changed By</TableHead>
                        <TableHead>Changes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recipe.versionHistory.map((version) => (
                        <TableRow key={version.version}>
                          <TableCell className="font-medium">v{version.version}</TableCell>
                          <TableCell>{version.date}</TableCell>
                          <TableCell>{version.changedBy}</TableCell>
                          <TableCell>
                            <ul className="list-disc pl-5 text-sm">
                              {version.changes.map((change, index) => (
                                <li key={index}>{change}</li>
                              ))}
                            </ul>
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

function InventoryStatusBadge({ status }) {
  switch (status) {
    case "In Stock":
      return <Badge className="bg-green-500">{status}</Badge>
    case "Low Stock":
      return <Badge className="bg-yellow-500">{status}</Badge>
    case "Out of Stock":
      return <Badge className="bg-red-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

function getRecipeById(id) {
  // This would normally fetch from an API or database
  const recipe = {
    id: "R001",
    name: "Chocolate Chip Cookies",
    category: "Cookies",
    productType: "Baked Goods",
    version: "2.3",
    status: "Active",
    yield: "100 cookies",
    defaultBatchSize: 100,
    batchUnit: "cookies",
    createdDate: "2024-12-15",
    createdBy: "Chef Maria Rodriguez",
    ingredients: [
      {
        name: "Flour (All-Purpose)",
        amount: 2.5,
        unit: "kg",
        costPerUnit: 1.2,
        inventoryStatus: "In Stock",
      },
      {
        name: "Sugar (Granulated)",
        amount: 1.8,
        unit: "kg",
        costPerUnit: 0.9,
        inventoryStatus: "In Stock",
      },
      {
        name: "Brown Sugar",
        amount: 1.5,
        unit: "kg",
        costPerUnit: 1.1,
        inventoryStatus: "In Stock",
      },
      {
        name: "Butter",
        amount: 1.8,
        unit: "kg",
        costPerUnit: 4.5,
        inventoryStatus: "Low Stock",
      },
      {
        name: "Eggs",
        amount: 30,
        unit: "pcs",
        costPerUnit: 0.2,
        inventoryStatus: "In Stock",
      },
      {
        name: "Vanilla Extract",
        amount: 45,
        unit: "ml",
        costPerUnit: 0.3,
        inventoryStatus: "Low Stock",
      },
      {
        name: "Baking Soda",
        amount: 30,
        unit: "g",
        costPerUnit: 0.05,
        inventoryStatus: "In Stock",
      },
      {
        name: "Salt",
        amount: 15,
        unit: "g",
        costPerUnit: 0.02,
        inventoryStatus: "In Stock",
      },
      {
        name: "Chocolate Chips",
        amount: 1.2,
        unit: "kg",
        costPerUnit: 6.5,
        inventoryStatus: "In Stock",
      },
    ],
    instructions: [
      {
        title: "Prepare Ingredients",
        description: "Measure all ingredients and bring butter and eggs to room temperature.",
        parameters: null,
      },
      {
        title: "Mix Dry Ingredients",
        description: "In a medium bowl, whisk together flour, baking soda, and salt.",
        parameters: null,
      },
      {
        title: "Cream Butter and Sugars",
        description:
          "In a large mixing bowl, cream together butter, granulated sugar, and brown sugar until light and fluffy.",
        parameters: {
          "Mixing Speed": "Medium-High",
          "Mixing Time": "3-4 minutes",
        },
      },
      {
        title: "Add Eggs and Vanilla",
        description: "Add eggs one at a time, mixing well after each addition. Stir in vanilla extract.",
        parameters: {
          "Mixing Speed": "Medium",
        },
      },
      {
        title: "Combine Mixtures",
        description: "Gradually add the dry ingredients to the wet ingredients, mixing until just combined.",
        parameters: {
          "Mixing Speed": "Low",
          "Mixing Time": "Until just combined",
        },
      },
      {
        title: "Add Chocolate Chips",
        description: "Fold in chocolate chips until evenly distributed throughout the dough.",
        parameters: null,
      },
      {
        title: "Portion Dough",
        description:
          "Using a cookie scoop, portion dough onto parchment-lined baking sheets, spacing cookies about 2 inches apart.",
        parameters: {
          "Portion Size": "50g per cookie",
        },
      },
      {
        title: "Bake",
        description: "Bake in preheated oven until edges are golden but centers are still soft.",
        parameters: {
          "Oven Temperature": "175°C (350°F)",
          "Baking Time": "10-12 minutes",
          Rotation: "Halfway through baking",
        },
      },
      {
        title: "Cool",
        description:
          "Allow cookies to cool on baking sheets for 5 minutes, then transfer to wire racks to cool completely.",
        parameters: null,
      },
    ],
    allergens: {
      contains: ["Wheat", "Milk", "Eggs"],
      mayContain: ["Nuts", "Soy"],
      sourceIngredients: [
        {
          ingredient: "Flour (All-Purpose)",
          allergens: ["Wheat"],
        },
        {
          ingredient: "Butter",
          allergens: ["Milk"],
        },
        {
          ingredient: "Eggs",
          allergens: ["Eggs"],
        },
        {
          ingredient: "Chocolate Chips",
          allergens: ["Milk", "Soy"],
        },
      ],
    },
    nutrition: {
      servingSize: "1 cookie (50g)",
      servingsPerBatch: 100,
      caloriesPerServing: 240,
      macronutrients: [
        {
          name: "Total Fat",
          amount: 12,
          unit: "g",
          dailyValue: 15,
        },
        {
          name: "Saturated Fat",
          amount: 7,
          unit: "g",
          dailyValue: 35,
        },
        {
          name: "Trans Fat",
          amount: 0,
          unit: "g",
          dailyValue: 0,
        },
        {
          name: "Cholesterol",
          amount: 35,
          unit: "mg",
          dailyValue: 12,
        },
        {
          name: "Sodium",
          amount: 150,
          unit: "mg",
          dailyValue: 7,
        },
        {
          name: "Total Carbohydrate",
          amount: 31,
          unit: "g",
          dailyValue: 11,
        },
        {
          name: "Dietary Fiber",
          amount: 1,
          unit: "g",
          dailyValue: 4,
        },
        {
          name: "Total Sugars",
          amount: 18,
          unit: "g",
          dailyValue: 0,
        },
        {
          name: "Protein",
          amount: 3,
          unit: "g",
          dailyValue: 6,
        },
      ],
      micronutrients: [
        {
          name: "Vitamin D",
          amount: 0,
          unit: "mcg",
          dailyValue: 0,
        },
        {
          name: "Calcium",
          amount: 20,
          unit: "mg",
          dailyValue: 2,
        },
        {
          name: "Iron",
          amount: 1.8,
          unit: "mg",
          dailyValue: 10,
        },
        {
          name: "Potassium",
          amount: 85,
          unit: "mg",
          dailyValue: 2,
        },
      ],
    },
    versionHistory: [
      {
        version: "2.3",
        date: "2025-01-10",
        changedBy: "Chef Maria Rodriguez",
        changes: [
          "Adjusted chocolate chip amount from 1.0kg to 1.2kg for better distribution",
          "Updated baking temperature from 180°C to 175°C for more consistent results",
        ],
      },
      {
        version: "2.2",
        date: "2024-11-05",
        changedBy: "Chef Maria Rodriguez",
        changes: ["Reduced salt from 20g to 15g based on customer feedback", "Added rotation step during baking"],
      },
      {
        version: "2.1",
        date: "2024-08-15",
        changedBy: "Chef David Kim",
        changes: ["Increased vanilla extract from 30ml to 45ml for enhanced flavor", "Updated nutritional information"],
      },
      {
        version: "2.0",
        date: "2024-05-20",
        changedBy: "Chef Maria Rodriguez",
        changes: [
          "Major recipe reformulation for improved texture and shelf life",
          "Changed butter:sugar ratio",
          "Updated mixing instructions",
        ],
      },
      {
        version: "1.0",
        date: "2023-12-15",
        changedBy: "Chef David Kim",
        changes: ["Initial recipe creation"],
      },
    ],
  }

  return recipe
}

