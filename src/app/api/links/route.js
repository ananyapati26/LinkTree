import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
// import { getUserFromSession } from "@/lib/user";
import { z } from "zod";

const linkSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  url: z.string().url("Invalid URL format").trim(),
  icon: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});



// Utility function to get user from session
async function getUserFromSession(session) {
  return await db.user.findUnique({
    where: { email: session.user.email },
  });
}

// ✅ GET: Fetch all links for logged-in user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const user = await getUserFromSession(session);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const links = await db.link.findMany({
    where: { userId: user.id }, // userId se fetch karenge (more efficient)
    orderBy: { order: "asc" },
  });

  return NextResponse.json(links);
}

// ✅ POST: Create a new link

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const user = await getUserFromSession(session);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    console.log("Received Body:", body); // Debugging line

    const parsedBody = linkSchema.safeParse(body);

    if (!parsedBody.success) {
      console.log("Validation Errors:", parsedBody.error.format()); // Debugging line
      return NextResponse.json(
        { error: "Invalid input", details: parsedBody.error.format() },
        { status: 400 }
      );
    }

    const { title, url, icon, order, isActive } = parsedBody.data;

    const newLink = await db.link.create({
      data: {
        title,
        url,
        icon: icon || "faPlus",
        order: order ?? (await db.link.count()) + 1, // Auto-increment order
        isActive: isActive ?? true,
        userId: user.id,
      },
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error("POST /api/links Error:", error); // Debugging line
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}


// ✅ PUT: Update an existing link (User apna link edit karega)
export async function PUT(req) {
  // Session check: User logged in hai ya nahi
  const session = await getServerSession(authOptions);
  if (!session) 
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });

  // Request body se update hone wale fields extract kar raha hai
  const { id, title, url, icon, order } = await req.json();
  
  // Validation: Agar ID nahi di toh error dega
  if (!id) 
    return NextResponse.json({ error: "ID Required" }, { status: 400 });

  // Check karo ki link exist karta hai ya nahi
  const link = await db.link.findUnique({ where: { id } });
  
  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }

  // Ensure karo ki logged-in user sirf apna link update kare
  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (link.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Database me update query chal raha hai
  const updatedLink = await db.link.update({
    where: { id }, // Kis link ko update karna hai ye specify kar raha hai
    data: { title, url, icon, order }, // Updated data pass kar raha hai
  });

  // Updated link return karega
  return NextResponse.json(updatedLink);
}


// ✅ DELETE: Remove a link (User apna link delete karega)
export async function DELETE(req) {
  // Session check: User logged in hai ya nahi
  const session = await getServerSession(authOptions);
  if (!session) 
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });

  // Request body se ID extract kar raha hai
  const { id } = await req.json();
  
  // Validation: Agar ID nahi mili toh error dega
  if (!id) 
    return NextResponse.json({ error: "ID Required" }, { status: 400 });

  // Check karo ki link exist karta hai ya nahi aur uska owner wahi hai jo logged in hai
  const link = await db.link.findUnique({ where: { id } });
  
  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }

  // Ensure karo ki logged-in user sirf apna link delete kare
  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (link.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Database se link delete karo
  await db.link.delete({ where: { id } });

  // Success response return karega
  return NextResponse.json({ message: "Deleted Successfully" });
}

