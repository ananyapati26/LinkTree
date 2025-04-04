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

    const profile = await db.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ color: profile.color });

  }