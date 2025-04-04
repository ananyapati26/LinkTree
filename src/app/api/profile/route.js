// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../lib/auth";
// import { db } from "@/lib/db";
// import fs from "fs/promises";
// import path from "path";

// // POST: Create or Update Profile
// export async function POST(req) {
//   try {
//     // Session check
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     // Request body se data extract
//     const { name, bio, avatar } = await req.json();

//     // Validation
//     if (!name) {
//       return NextResponse.json({ error: "Name is required" }, { status: 400 });
//     }

//     // Get existing profile to check for avatar changes
//     const existingProfile = await db.profile.findUnique({
//       where: { userId: session.user.id },
//     });

//     // If avatar was removed and there was a previous avatar, delete the old file
//     if (existingProfile?.avatar && !avatar && existingProfile.avatar !== "/default-profile.jpg") {
//       try {
//         // Extract filename from the path
//         const filename = existingProfile.avatar.split('/uploads/')[1];
        
//         if (filename) {
//           const filePath = path.join(process.cwd(), "public/uploads", filename);
          
//           // Check if file exists before attempting to delete
//           await fs.access(filePath);
//           await fs.unlink(filePath);
//           console.log(`Deleted old avatar: ${filePath}`);
//         }
//       } catch (fileError) {
//         // Just log the error but don't fail the whole operation
//         console.error("Error deleting old avatar file:", fileError);
//       }
//     }

//     // Profile update ya create
//     const profile = await db.profile.upsert({
//       where: { userId: session.user.id },
//       update: { 
//         name, 
//         bio: bio || "", 
//         avatar: avatar || null // Allow null for removed photos
//       },
//       create: { 
//         userId: session.user.id, 
//         name, 
//         bio: bio || "", 
//         avatar: avatar || null 
//       },
//     });

//     // Send back the profile with default image path if avatar is null
//     return NextResponse.json({
//       ...profile,
//       avatar: profile.avatar || "/default-profile.jpg"
//     }, { status: 200 });
//   } catch (error) {
//     console.error("Profile update error:", error);
//     return NextResponse.json(
//       { error: "Failed to update profile" }, 
//       { status: 500 }
//     );
//   }
// }

// // GET: Fetch Current User's Profile
// export async function GET(req) {
//   try {
//     // Session check
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     // Get profile from database
//     const profile = await db.profile.findUnique({
//       where: { userId: session.user.id },
//     });

//     // If no profile exists yet, return default values
//     if (!profile) {
//       return NextResponse.json({
//         name: "Kittu",
//         bio: "Digital Designer & Content Creator",
//         avatar: "/default-profile.jpg" 
//       });
//     }

//     // Return profile with default image if avatar is null
//     return NextResponse.json({
//       ...profile,
//       avatar: profile.avatar || "/default-profile.jpg"
//     });
//   } catch (error) {
//     console.error("Profile fetch error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch profile" }, 
//       { status: 500 }
//     );
//   }
// }


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
