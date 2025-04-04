import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

async function getUserFromSession(session) {
  return await db.user.findUnique({
    where: { email: session.user.email },
  });
}


export async function POST(req) {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }
  
    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    const { color } = await req.json(); 
    console.log("Received color:", color);
  
    const updatedProfile = await db.profile.update({
      where: { userId: user.id },
      data: { color }, 
    });
  
    return NextResponse.json({
      message: "Color updated successfully",
      color: updatedProfile.color,
    });
  }

  export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  
    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    let profile = await db.profile.findUnique({
      where: { userId: user.id },
    });
  
    // If profile doesn't exist, create with default color
    if (!profile) {
      profile = await db.profile.create({
        data: {
          userId: user.id,
          color: "gray", // Default theme color
        },
      });
    }
  
    return NextResponse.json({ color: profile.color });
  }
  