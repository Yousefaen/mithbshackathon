import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { mkdir } from "fs/promises"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const path = formData.get("path") as string

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create directory structure if it doesn't exist
    const uploadDir = join(process.cwd(), "public/uploads", path)
    await mkdir(uploadDir, { recursive: true })

    // Create a unique filename
    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
    const filePath = join(uploadDir, uniqueFilename)

    // Save the file
    await writeFile(filePath, buffer)

    // Return the public URL
    const publicUrl = `/uploads/${path}/${uniqueFilename}`

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("Error handling file upload:", error)
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 })
  }
}

