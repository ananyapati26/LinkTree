"use client";

import { useState, useEffect } from "react";
import useProfileStore from "@/store/useProfileStore";
import ProfilePreview from "./ProfilePreview";
import axios from "axios";
import useThemeStore from "@/store/useThemeStore";


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

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    
    // Apply dark mode to document if enabled
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    
    // Apply or remove dark class from document
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save dark mode preference to API/database
    saveDarkModePreference(newDarkMode);
  };

  // Save dark mode preference to API
  const saveDarkModePreference = async (isDarkMode) => {
    try {
      await fetch("/api/darkmode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ darkMode: isDarkMode }),
      });
    } catch (error) {
      console.error("Error saving dark mode preference:", error);
    }
  };

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
      body: JSON.stringify({ color }),
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setTempProfileImage(imageURL);
      setIsImageSelected(true);

      updateProfile({ name: tempName, bio: tempBio, profileImage: imageURL });
    } else {
      alert("Please upload an image file (JPG, PNG, etc.)");
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setTempProfileImage("/default-profile.jpg"); // Reset to default image
    setIsImageSelected(false);

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
      avatar: isImageSelected ? tempProfileImage : null,
    });
    console.log(res);
  };

  return (
    <div className={`flex flex-col gap-6 p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'} transition-colors duration-300`}>
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Left - Profile Form */}
        <div className={`sm:w-2/3 mx-auto p-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]`}>
          {/* Heading */}
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>
            Edit Profile
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} text-sm mb-6`}>
            Update your personal information
          </p>

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center relative">
            {isImageSelected && (
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full shadow hover:bg-red-600 transition"
              >
                ✕
              </button>
            )}

            <img
              src={tempProfileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-600 shadow-md object-cover"
            />

            {!isImageSelected && (
              <label className={`mt-4 cursor-pointer inline-block ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'} text-sm px-4 py-1.5 rounded-lg ${darkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-200'} transition`}>
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Name Input */}
          <div className="mt-6">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Display Name
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your name"
              className={`mt-2 w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' : 'bg-white border-gray-300 text-black focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2`}
            />
          </div>

          {/* Bio Input */}
          <div className="mt-5">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Bio
            </label>
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              placeholder="Tell us something about you..."
              rows={3}
              className={`mt-2 w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600' : 'bg-white border-gray-300 text-black focus:ring-blue-500'} rounded-lg focus:outline-none focus:ring-2`}
            />
          </div>

          {/* Save Button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleSaveChanges}
              className={`${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-black hover:bg-gray-900'} text-white font-medium px-6 py-2 rounded-lg transition`}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right - Profile Preview (Now using Zustand store) */}
        <ProfilePreview darkMode={darkMode} />
      </div>

      <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md rounded-lg`}>
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>

        {/* Theme Color Section */}
        <div className="flex flex-wrap gap-3">
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
              <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'} mr-3`}>
                Enable dark mode for your profile page
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <div
                  className={`w-10 h-6 rounded-full transition ${
                    darkMode ? "bg-blue-600" : "bg-gray-200"
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
              className={`py-2 px-4 text-sm font-medium rounded-l-lg border ${
                buttonStyle === "filled"
                  ? "bg-green-500 text-white"
                  : `${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'}`
              }`}
              onClick={() => setButtonStyle("filled")}
            >
              Filled
            </button>
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium border-t border-b ${
                buttonStyle === "outline"
                  ? "bg-green-500 text-white"
                  : `${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'}`
              }`}
              onClick={() => setButtonStyle("outline")}
            >
              Outline
            </button>
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-r-lg border ${
                buttonStyle === "soft"
                  ? "bg-green-500 text-white"
                  : `${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'}`
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