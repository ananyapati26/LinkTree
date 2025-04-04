import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ message: "No image found", success: false }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ message: "Invalid file type", success: false }, { status: 400 });
    }

    // Size validation (optional)
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > 5) { // 5MB limit
      return NextResponse.json({ message: "File too large (max 5MB)", success: false }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename with original extension
    const filename = `${uuidv4()}${path.extname(file.name)}`;
    
    // Set path and create directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads");
    
    // Ensure the uploads directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, filename);
    
    // Write file to disk using fs.writeFile, not the undefined writeFile function
    await fs.writeFile(filePath, buffer);

    // Return success with the URL path for the uploaded file
    return NextResponse.json({ 
      url: `/uploads/${filename}`, 
      success: true 
    });
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      message: "Failed to upload file", 
      success: false 
    }, { status: 500 });
  }
}