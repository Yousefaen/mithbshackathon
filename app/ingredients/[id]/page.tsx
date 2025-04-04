"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Loader2 } from "lucide-react"

export default function IngredientDetailsPage({ params }: { params: { id: string } }) {
  const [ingredient, setIngredient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        // Replace with your data fetching logic
        const response = await fetch(`/api/ingredients/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch ingredient")

        const data = await response.json()
        setIngredient(data)
      } catch (error) {
        console.error("Error fetching ingredient:", error)
        toast({
          title: "Error",
          description: "Failed to load ingredient details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchIngredient()
  }, [params.id, toast])

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center pl-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container py-6 pl-64">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ingredient: {ingredient?.name}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => router.push(`/ingredients/${params.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">SKU</h3>
                <p>{ingredient?.sku || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                <p>{ingredient?.category?.name || "Uncategorized"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Unit</h3>
                <p>
                  {ingredient?.unit?.name} ({ingredient?.unit?.abbreviation})
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Cost Per Unit</h3>
                <p>${ingredient?.cost_per_unit.toFixed(2)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Preferred Supplier</h3>
                <p>{ingredient?.supplier?.name || "None"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p>{ingredient?.description || "No description available"}</p>
              </div>
            </div>

            <div className="space-y-4">
              {ingredient?.image_url ? (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Visual Specification</h3>
                  <div className="overflow-hidden rounded-md border">
                    <img
                      src={ingredient.image_url || "/placeholder.svg"}
                      alt={ingredient.image_description || ingredient.name}
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                  {ingredient.image_description && (
                    <p className="text-sm text-muted-foreground">{ingredient.image_description}</p>
                  )}
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-md border bg-muted/50">
                  <p className="text-sm text-muted-foreground">No image available</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Storage Instructions</h3>
                <p>{ingredient?.storage_instructions || "No special storage instructions"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Allergen</h3>
                <p>{ingredient?.is_allergen ? "Yes" : "No"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Shelf Life</h3>
                <p>{ingredient?.shelf_life_days ? `${ingredient.shelf_life_days} days` : "Not specified"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

