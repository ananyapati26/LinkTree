"use client";

import { useState } from "react";
import useProfileStore from "@/store/useProfileStore"; // Import Zustand store
import ProfilePreview from "./ProfilePreview";
import axios from "axios";
import useThemeStore from "@/store/useThemeStore"; // Import Zustand store

export default function ProfileTab() {
  const { name, bio, profileImage, updateProfile } = useProfileStore();
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio] = useState(bio);
  const [tempProfileImage, setTempProfileImage] = useState(profileImage);
  const [isImageSelected, setIsImageSelected] = useState(
    profileImage !== "/default-profile.jpg"
  );
  const [darkMode, setDarkMode] = useState(false);
  const [buttonStyle, setButtonStyle] = useState("filled");
  const { themeColor, setThemeColor } = useThemeStore();

  const themeColors = [
    { name: "gray", color: "#6B7280" },
    { name: "yellow", color: "#FBBF24" },
    { name: "blue", color: "#3B82F6" },
    { name: "green", color: "#10B981" },
    { name: "purple", color: "#8B5CF6" },
    { name: "pink", color: "#EC4899" },
    { name: "orange", color: "#F59E0B" },
    { name: "red", color: "#EF4444" },
  ];

  const setColour = async (color) => {
    console.log("Selected color: ", color);
    setThemeColor(color);

    await fetch("/api/themecolor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }), // <- dynamic value
    });
  };

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
    setTempProfileImage("/default-profile.jpg"); // Reset to default image
    setIsImageSelected(false);

    // ✅ Update Zustand immediately
    updateProfile({
      name: tempName,
      bio: tempBio,
      profileImage: "/default-profile.jpg",
    });
  };

  // Save changes to Zustand store
  const handleSaveChanges = async () => {
    updateProfile({
      name: tempName,
      bio: tempBio,
      profileImage: tempProfileImage,
    });
    const res = await axios.post("/api/profile", {
      name: tempName,
      bio: tempBio,
      avatar: isImageSelected ? tempProfileImage : null, // Send null if default image is used
    });
    console.log(res);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50">

      <div className="flex flex-col sm:flex-row gap-8">
        {/* Left - Profile Form */}
        <div className="sm:w-2/3 p-6 bg-white shadow-md rounded-lg">
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
              className="w-20 h-20 rounded-full border border-blue-700 shadow-sm"
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




      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>

        {/* Theme Color Section */}
        <div className="flex gap-3">
          {themeColors.map((theme) => (
            <button
              key={theme.name}
              className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all"
              onClick={() => setColour(theme.name)}
              aria-label={`${theme.name} theme`}
            >
              {/* Inner Color Circle */}
              <span
                className="w-8 h-8 rounded-full block"
                style={{ backgroundColor: theme.color }}
              ></span>

              {/* Outer Ring (selected effect) */}
              {themeColor === theme.name && (
                <span className="absolute w-12 h-12 rounded-full border-2 border-gray-500/60 animate-pulse"></span>
              )}
            </button>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2 mt-4">Dark Mode</h3>
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <span className="text-sm text-gray-500 mr-3">
                Enable dark mode for your profile page
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div
                  className={`w-10 h-6 bg-gray-200 rounded-full transition ${
                    darkMode ? "bg-blue-600" : ""
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all ${
                    darkMode ? "transform translate-x-4" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>

        {/* Button Style */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Button Style</h3>
          <div className="inline-flex rounded-lg shadow-sm">
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-l-lg border border-gray-200 ${
                buttonStyle === "filled"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setButtonStyle("filled")}
            >
              Filled
            </button>
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium border-t border-b border-gray-200 ${
                buttonStyle === "outline"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setButtonStyle("outline")}
            >
              Outline
            </button>
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-r-lg border border-gray-200 ${
                buttonStyle === "soft"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setButtonStyle("soft")}
            >
              Soft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
