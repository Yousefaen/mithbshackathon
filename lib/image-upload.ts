/**
 * This is a generic image upload utility that can be adapted to work with
 * any storage provider (AWS S3, Google Cloud Storage, Azure Blob Storage, etc.)
 * or even a simple server-side file system approach.
 */

// Example function to upload an image to your server
export async function uploadImage(file: File, path: string): Promise<string> {
  // Create a FormData object to send the file
  const formData = new FormData()
  formData.append("file", file)
  formData.append("path", path) // Where to store the file

  try {
    // Send the file to your API endpoint
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.url // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Example function to delete an image
export async function deleteImage(url: string): Promise<void> {
  try {
    const response = await fetch("/api/delete-image", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      throw new Error("Failed to delete image")
    }
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}

