import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image upload function
export const uploadImage = async (imageFile) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageFile, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);  // result mein secure_url milega
      }
    });
  });
};
