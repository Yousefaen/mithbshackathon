"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { MainNav } from "@/components/main-nav"

export default function AddInventoryPage() {
  const [expiryDate, setExpiryDate] = useState(null)

  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 overflow-auto pl-64">
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-2">
            <Link href="/inventory">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Add Inventory Item</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Enter the details of the new inventory item</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Item Name</Label>
                  <Input id="name" placeholder="Enter item name" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flour">Flour</SelectItem>
                        <SelectItem value="sugar">Sugar</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="nuts">Nuts</SelectItem>
                        <SelectItem value="chocolate">Chocolate</SelectItem>
                        <SelectItem value="baking">Baking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="sku">SKU / Item Code</Label>
                    <Input id="sku" placeholder="Enter SKU or item code" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="0" min="0" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="unit">Unit</Label>
                    <Select>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="l">Liters (L)</SelectItem>
                        <SelectItem value="ml">Milliliters (mL)</SelectItem>
                        <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                        <SelectItem value="box">Boxes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="min-quantity">Minimum Quantity</Label>
                    <Input id="min-quantity" type="number" placeholder="0" min="0" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="location">Storage Location</Label>
                    <Input id="location" placeholder="Enter storage location" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input id="supplier" placeholder="Enter supplier name" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="cost">Cost per Unit ($)</Label>
                    <Input id="cost" type="number" placeholder="0.00" min="0" step="0.01" />
                  </div>
                  <div className="grid gap-3">
                    <Label>Expiry Date</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <DatePicker selected={expiryDate} onSelect={setExpiryDate} placeholder="Select date" />
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter any additional notes about this item" />
                </div>
                <div className="flex justify-end gap-2">
                  <Link href="/inventory">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button>Add Item</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

