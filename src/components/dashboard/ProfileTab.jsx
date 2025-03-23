"use client";

import { useState } from "react";
import useProfileStore from "@/store/useProfileStore"; // Import Zustand store
import ProfilePreview from "./ProfilePreview";

export default function ProfileTab() {
  const { name, bio, profileImage, updateProfile, removeProfileImage } = useProfileStore();
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio] = useState(bio);
  const [tempProfileImage, setTempProfileImage] = useState(profileImage);
  const [isImageSelected, setIsImageSelected] = useState(profileImage !== "/profile.jpg");

  // Handle image upload
  // Handle image upload
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setTempProfileImage(imageURL);
      setIsImageSelected(true);
      
      // ✅ Update Zustand immediately so ProfilePreview updates instantly
      updateProfile({ name: tempName, bio: tempBio, profileImage: imageURL });
    } else {
      alert("Please upload an image file (JPG, PNG, etc.)");
    }
  };
  
  // Handle image removal
  const handleRemoveImage = () => {
    setTempProfileImage("/profile.jpg"); // Reset to default image
    setIsImageSelected(false);
    
    // ✅ Update Zustand immediately
    updateProfile({ name: tempName, bio: tempBio, profileImage: "/profile.jpg" });
  };
  

  

  // Save changes to Zustand store
  const handleSaveChanges = () => {
    updateProfile({
      name: tempName,
      bio: tempBio,
      profileImage: tempProfileImage,
    });
  };

  return (
    <div className="flex gap-8">
      {/* Left - Profile Form */}
      <div className="w-2/3 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <p className="text-gray-500 text-sm">Update your profile details</p>

        {/* Profile Picture Upload */}
        <div className="mt-4 flex flex-col items-center relative">
          {/* Remove Button (only if image is selected) */}
          {isImageSelected && (
            <button
              onClick={handleRemoveImage}
              className="absolute -top-3 -right-1 bg-red-400 text-white px-2 py-1 text-xs rounded-full"
            >
              Remove Photo
            </button>
          )}

          {/* Profile Image */}
          <img
            src={tempProfileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full border border-gray-300 shadow-sm"
          />

          {/* Upload Button (Hidden if an image is selected) */}
          {!isImageSelected && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 text-sm text-gray-600"
            />
          )}
        </div>

        {/* Name Input */}
        <label className="block mt-4 font-medium">Display Name</label>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          className="w-full border rounded-md p-2 mt-1"
        />

        {/* Bio Input */}
        <label className="block mt-4 font-medium">Bio</label>
        <textarea
          value={tempBio}
          onChange={(e) => setTempBio(e.target.value)}
          className="w-full border rounded-md p-2 mt-1"
        />

        {/* Save Button */}
        <button
          onClick={handleSaveChanges}
          className="mt-4 bg-black text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>

      {/* Right - Profile Preview (Now using Zustand store) */}
      <ProfilePreview />
    </div>
  );
}
