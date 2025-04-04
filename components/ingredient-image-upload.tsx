"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X } from "lucide-react"

interface IngredientImageUploadProps {
  ingredientId: string
  existingImageUrl?: string
  existingImageDescription?: string
  onUploadComplete: (imageFile: File | null, imageDescription: string) => void
}

export function IngredientImageUpload({
  ingredientId,
  existingImageUrl,
  existingImageDescription = "",
  onUploadComplete,
}: IngredientImageUploadProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageDescription, setImageDescription] = useState(existingImageDescription)
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl || null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)

    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreviewUrl(existingImageUrl || null)
    }
  }

  const clearImage = () => {
    setImageFile(null)
    setPreviewUrl(null)
  }

  const handleSubmit = () => {
    // Pass the file and description to the parent component
    onUploadComplete(imageFile, imageDescription)

    toast({
      title: "Image ready",
      description: "The image is ready to be saved with the ingredient",
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ingredient-image">Ingredient Image</Label>
        <div className="flex items-center gap-2">
          <Input id="ingredient-image" type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <Button variant="outline" size="icon" onClick={clearImage} type="button">
              <X className="h-4 w-4" />
              <span className="sr-only">Clear image</span>
            </Button>
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md border">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Ingredient preview"
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="image-description">Image Description</Label>
        <Textarea
          id="image-description"
          placeholder="Describe the visual characteristics of this ingredient for specification purposes..."
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <Button onClick={handleSubmit} className="w-full sm:w-auto" type="button">
        <Upload className="mr-2 h-4 w-4" />
        {existingImageUrl ? "Update Image" : "Prepare Image"}
      </Button>
    </div>
  )
}

