import { uploadImage } from "../../../lib/cloudinary";
import { db } from "../../../lib/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, imageFile } = body;

    console.log("Received ID while upload:", id);
    console.log("ID type:", typeof id);

    if (!id || !imageFile) {
      return new Response(
        JSON.stringify({ error: "Missing id or imageFile" }),
        { status: 400 }
      );
    }

    // Check if the ID actually exists in the database (try both ways)
    try {
      console.log("Checking if ID exists as profile ID...");
      const profileById = await db.profile.findUnique({
        where: { id },
        select: { id: true, userId: true }
      });

      console.log("Profile by ID lookup result:", profileById);

      console.log("Checking if ID exists as user ID...");
    const profileByUserId = await db.profile.findUnique({
  where: { userId: new ObjectId(id) },
  select: { id: true, userId: true }
});


      console.log("Profile by userId lookup result:", profileByUserId);

      // Determine the correct ID to use
      let targetProfileId = null;
      let lookupMethod = null;

      if (profileById) {
        targetProfileId = profileById.id;
        lookupMethod = "direct-id";
        console.log("Will use direct profile ID for update");
      } else if (profileByUserId) {
        targetProfileId = profileByUserId.id;
        lookupMethod = "user-id";
        console.log("Will use profile found via userId for update");
      } else {
        console.log("No profile found with either method!");
        return new Response(
          JSON.stringify({
            error: "Profile not found with either ID method",
            profileIdLookup: "failed",
            userIdLookup: "failed"
          }),
          { status: 404 }
        );
      }

      // Upload to Cloudinary
      console.log("Uploading image to Cloudinary...");
      const result = await uploadImage(imageFile);
      console.log("Cloudinary upload result:", result);

      // Check if Cloudinary upload returned a secure URL
      if (!result || !result.secure_url) {
        console.error("Cloudinary upload failed, no secure URL returned.");
        return new Response(
          JSON.stringify({ error: "Cloudinary upload failed" }),
          { status: 500 }
        );
      }

      // Update using the correct ID and method
      console.log(`Updating profile with ${lookupMethod} approach...`);
      let updated;

      if (lookupMethod === "direct-id") {
        updated = await db.profile.update({
          where: { id: targetProfileId },
          data: { avatar: result.secure_url }
        });
      } else {
        updated = await db.profile.update({
          where: { userId: id },
          data: { avatar: result.secure_url }
        });
      }

      console.log("✅ Profile update successful");
      return new Response(JSON.stringify(updated), { status: 200 });
    } catch (dbError) {
      // Detailed database error logging
      console.error("Database operation error details:");
      console.error("Error name:", dbError.name);
      console.error("Error message:", dbError.message);
      console.error("Error code:", dbError.code);
      
      if (dbError.meta) {
        console.error("Error metadata:", JSON.stringify(dbError.meta));
      }

      // Return all available error details
      return new Response(
        JSON.stringify({
          error: dbError.message || "Unknown database error",
          name: dbError.name || "UnknownError",
          code: dbError.code || "UnknownCode",
          meta: dbError.meta || {},
          stack: dbError.stack?.split("\n").slice(0, 3)
        }),
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("🔥 General error:", err);
    // Return detailed general error
    return new Response(
      JSON.stringify({
        error: err.message,
        name: err.name,
        stack: err.stack?.split("\n").slice(0, 3)
      }),
      { status: 500 }
    );
  }
}
