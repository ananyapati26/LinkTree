import { uploadImage } from "../../../lib/cloudinary";
import { db } from "../../../lib/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, imageFile } = body;

    if (!userId || !imageFile) {
      return new Response(JSON.stringify({ error: "Missing userId or imageFile" }), { status: 400 });
    }

    // 👇 Upload to Cloudinary
    const result = await uploadImage(imageFile);
    console.log("✅ Cloudinary Upload Success:", result);

    // 👇 Convert userId to MongoDB ObjectId
    const updated = await db.profile.update({
      where: { userId: new ObjectId(userId) },
      data: { avatar: result.secure_url },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error("🔥 Real Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
