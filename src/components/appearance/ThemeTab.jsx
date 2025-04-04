import React, { useState } from "react";
import useThemeStore from "../../store/useThemeStore"; // Import Zustand store

export default function ThemeTab() {
  const [darkMode, setDarkMode] = useState(false);
  const [buttonStyle, setButtonStyle] = useState("filled");
  const { themeColor, setThemeColor } = useThemeStore();

  const themeColors = [
    { name: "blue", color: "#3B82F6" },
    { name: "green", color: "#10B981" },
    { name: "purple", color: "#8B5CF6" },
    { name: "pink", color: "#EC4899" },
    { name: "orange", color: "#F59E0B" },
    { name: "red", color: "#EF4444" },
    { name: "black", color: "#1F2937" },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Appearance</h2>

      {/* Theme Color Section */}
      <div className="flex gap-3">
        {themeColors.map((theme) => (
          <button
            key={theme.name}
            className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all"
            onClick={() => setThemeColor(theme.name)}
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
        <h3 className="text-sm font-medium mb-2">Dark Mode</h3>
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
  );
}
