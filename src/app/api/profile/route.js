
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// ✅ Utility function to get user from session
async function getUserFromSession(session) {
  return await db.user.findUnique({
    where: { email: session.user.email },
  });
}

// ✅ GET: Fetch the logged-in user's profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(user.id, "user id in profile route");
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({
        name: "Kittu",
        bio: "Digital Designer & Content Creator",
        avatar: "/default-profile.jpg",
      });
    }

    return NextResponse.json({
      ...profile,
      avatar: profile.avatar || "/default-profile.jpg",
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// ✅ POST: Create a new profile (if not exists)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    // }

    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { name, bio, avatar } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const existingProfile = await db.profile.findUnique({
      where: { userId: user.id },
    });

    if (existingProfile) {
      const profile = await db.profile.update({
        where: { userId: user.id },
        data: {
          userId: user.id,
          name,
          bio: bio || "",
          avatar: avatar || null,
        },
      });
      return NextResponse.json(profile, { status: 200 });
    }

    const profile = await db.profile.create({
      data: {
        userId: user.id,
        name,
        bio: bio || "",
        avatar: avatar || null,
      },
    });

    console.log(profile, "profile created");

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error("Profile creation error:", error);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}

// ✅ PUT: Update an existing profile
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { name, bio, avatar } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const existingProfile = await db.profile.findUnique({
      where: { userId: user.id },
    });

    if (!existingProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const updatedProfile = await db.profile.update({
      where: { userId: user.id },
      data: { name, bio, avatar },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

// ✅ DELETE: Remove a profile
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingProfile = await db.profile.findUnique({
      where: { userId: user.id },
    });

    if (!existingProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    await db.profile.delete({ where: { userId: user.id } });

    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Profile deletion error:", error);
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 });
  }
}
