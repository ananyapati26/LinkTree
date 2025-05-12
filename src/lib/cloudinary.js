import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image upload function
export const uploadImage = async (imageFile) => {
  console.log("Image file received for upload:", imageFile?.slice?.(0, 100)); // limit log size
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageFile, (error, result) => {
      if (error) {
        console.error("❌ Cloudinary Upload Error:", error);
        reject(error);
      } else {
        console.log("✅ Cloudinary Upload Success:", result);
        resolve(result);
      }
    });
  });
};
