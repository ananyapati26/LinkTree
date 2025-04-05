import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db"; // adjust this path based on your project
// import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { darkMode } = body;

    if (typeof darkMode !== "boolean") {
      return NextResponse.json({ error: "Invalid dark mode value" }, { status: 400 });
    }

    // Update cookie
    

    // Update Profile model in DB
    await db.profile.update({
      where: { userId: session.user.id },
      data: { mode: darkMode ? "dark" : "light" },
    });

    return NextResponse.json({ status: "success", mode: darkMode ? "dark" : "light" });
  } catch (error) {
    console.error("POST /profile/darkmode error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
      select: { mode: true },
    });

    const mode = profile?.mode || "light";

    return NextResponse.json({ mode });
  } catch (error) {
    console.error("GET /profile/darkmode error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
