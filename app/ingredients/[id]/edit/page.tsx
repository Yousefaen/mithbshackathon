"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { IngredientImageUpload } from "@/components/ingredient-image-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { uploadImage, deleteImage } from "@/lib/image-upload"

// This is a simplified example - you would have more fields for editing an ingredient
export default function EditIngredientPage({ params }: { params: { id: string } }) {
  const [ingredient, setIngredient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageDescription, setImageDescription] = useState<string>("")
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
        setImageUrl(data.image_url)
        setImageDescription(data.image_description || "")
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

  const handleImageUploadComplete = (file: File | null, description: string) => {
    setImageFile(file)
    setImageDescription(description)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      let finalImageUrl = imageUrl

      // If there's a new image file, upload it
      if (imageFile) {
        // If there's an existing image, delete it first
        if (imageUrl) {
          await deleteImage(imageUrl)
        }

        // Upload the new image
        finalImageUrl = await uploadImage(imageFile, `ingredients/${params.id}`)
      }

      // Update the ingredient with the new image URL and description
      const response = await fetch(`/api/ingredients/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...ingredient,
          image_url: finalImageUrl,
          image_description: imageDescription,
        }),
      })

      if (!response.ok) throw new Error("Failed to update ingredient")

      toast({
        title: "Success",
        description: "Ingredient updated successfully",
      })
      router.push("/ingredients")
    } catch (error) {
      console.error("Error updating ingredient:", error)
      toast({
        title: "Error",
        description: "Failed to update ingredient",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

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
        <CardHeader>
          <CardTitle>Edit Ingredient: {ingredient?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Other ingredient form fields would go here */}

          <IngredientImageUpload
            ingredientId={params.id}
            existingImageUrl={imageUrl || undefined}
            existingImageDescription={imageDescription}
            onUploadComplete={handleImageUploadComplete}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

