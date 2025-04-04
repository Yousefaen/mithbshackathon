import { type NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import { join } from "path"

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    // Extract the file path from the URL
    // The URL format should be /uploads/path/filename
    const filePath = join(process.cwd(), "public", url)

    // Delete the file
    await unlink(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 })
  }
}

