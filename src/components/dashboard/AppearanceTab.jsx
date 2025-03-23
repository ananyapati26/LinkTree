import { useState } from "react";
import ProfileTab from "./ProfileTab";
import ThemeTab from "./ThemeTab";

export default function AppearanceTabs() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          className={`py-2 px-4 text-lg font-medium ${
            activeTab === "profile" ? "border-b-2 border-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`py-2 px-4 text-lg font-medium ${
            activeTab === "theme" ? "border-b-2 border-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("theme")}
        >
          Theme
        </button>
      </div>

      {/* Show the active tab content */}
      <div className="mt-4">{activeTab === "profile" ? <ProfileTab /> : <ThemeTab />}</div>
    </div>
  );
}
