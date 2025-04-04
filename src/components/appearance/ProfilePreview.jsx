"use client";
import React from "react";
import useThemeStore from "@/store/useThemeStore";
import useProfileStore from "@/store/useProfileStore";
import useLinksStore from "@/store/useLinksStore";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faYoutube,
  faLinkedin,
  faFacebook,
  faTiktok,
  faPinterest,
  faSnapchat,
  faSpotify,
  faDiscord,
  faTwitch,
  faXTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";

const iconMap = {
  faInstagram: faInstagram,
  faTwitter: faTwitter,
  faYoutube: faYoutube,
  faLinkedin: faLinkedin,
  faFacebook: faFacebook,
  faTiktok: faTiktok,
  faPinterest: faPinterest,
  faSnapchat: faSnapchat,
  faSpotify: faSpotify,
  faDiscord: faDiscord,
  faTwitch: faTwitch,
  faXTwitter: faXTwitter,
  faWhatsapp: faWhatsapp,
  faPlus: faPlus,
};

const normalizeIconName = (iconName) => {
  const iconMapping = {
    instagram: "faInstagram",
    twitter: "faTwitter",
    youtube: "faYoutube",
    linkedin: "faLinkedin",
    facebook: "faFacebook",
    tiktok: "faTiktok",
    pinterest: "faPinterest",
    snapchat: "faSnapchat",
    spotify: "faSpotify",
    discord: "faDiscord",
    twitch: "faTwitch",
    xtwitter: "faXTwitter",
    whatsapp: "faWhatsapp",
    custom: "faPlus",
    faInstagram: "faInstagram",
    faTwitter: "faTwitter",
    faYoutube: "faYoutube",
    faLinkedin: "faLinkedin",
    faFacebook: "faFacebook",
    faTiktok: "faTiktok",
    faPinterest: "faPinterest",
    faSnapchat: "faSnapchat",
    faSpotify: "faSpotify",
    faDiscord: "faDiscord",
    faTwitch: "faTwitch",
    faXTwitter: "faXTwitter",
    faWhatsapp: "faWhatsapp",
    faPlus: "faPlus",
  };
  return iconMapping[iconName?.toLowerCase()] || "faPlus";
};

const ProfilePreview = () => {
  const { name, bio, profileImage } = useProfileStore();
  const { links } = useLinksStore();
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

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("/api/profile");
      const { name, bio, avatar } = response.data;
      // Update Zustand store with fetched data
      useProfileStore.setState({ name, bio, profileImage: avatar });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []); // Fetch profile data on component mount

  const gradients = {
    blue: "bg-blue-100 text-blue-900 border-blue-400",
    green: "bg-green-100 text-green-900 border-green-400",
    purple: "bg-purple-100 text-purple-900 border-purple-400",
    pink: "bg-pink-100 text-pink-900 border-pink-400",
    orange: "bg-orange-100 text-orange-900 border-orange-400",
    red: "bg-red-100 text-red-900 border-red-400",
    black: "bg-gray-800 text-gray-100 border-gray-600",
  };

  const selectedTheme = gradients[themeColor] || gradients.blue;

  return (
    <div className="p-4 rounded-lg bg-white shadow-md w-96 mx-auto">
      <h3 className="text-lg font-semibold mb-2">Preview</h3>
      <p className="text-gray-500 text-sm mb-4">See how your profile looks.</p>

      {/* <div className="flex gap-3">
        {themeColors.map((theme) => (
          <button
            key={theme.name}
            className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all"
            onClick={() => setThemeColor(theme.name)}
            aria-label={`${theme.name} theme`}
          >
            
            <span
              className="w-8 h-8 rounded-full block"
              style={{ backgroundColor: theme.color }}
            ></span>

            
            {themeColor === theme.name && (
              <span className="absolute w-12 h-12 rounded-full border-2 border-gray-500/60 animate-pulse"></span>
            )}
          </button>
        ))}
      </div> */}

      {/* Mobile Frame */}
      <div
      className={`p-8 rounded-[30px] shadow-lg text-center  border ${selectedTheme}`}
    >
      {/* Profile Image */}
      <div className="w-28 h-28 mx-auto mb-4 border-2 rounded-full overflow-hidden shadow-md border-gray-400">
        <Image src={profileImage} width={112} height={112} className="rounded-full" alt="Profile" />
      </div>

      <p className="text-2xl font-serif font-bold">{name}</p>
      <p className="text-sm italic">{bio}</p>

      {/* Links */}
      <div className="mt-6 space-y-4">
        {links.filter((link) => link.isActive).map((link) => {
          const normalizedIconName = normalizeIconName(link.icon);
          const iconObject = iconMap[normalizedIconName] || faPlus;
          return (
            <div
              key={link.id}
              className="bg-white border border-gray-300 rounded-full px-6 py-3 text-sm shadow-sm flex items-center gap-3 transition-transform transform hover:scale-105 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={iconObject} size="lg" className="text-gray-700 w-5 h-5" />
              <div>
                <p className="font-medium text-gray-900">{link.title}</p>
                <p className="text-xs text-gray-600">{link.description}</p>
              </div>
            </div>
          );
        })}
      </div>

{/*       
      <div className="flex justify-center gap-4 mt-6">
        <FontAwesomeIcon icon={iconMap.facebook} size="lg" className="text-gray-600" />
        <FontAwesomeIcon icon={iconMap.twitter} size="lg" className="text-gray-600" />
        <FontAwesomeIcon icon={iconMap.instagram} size="lg" className="text-gray-600" />
      </div> */}

      <p className="text-xs mt-6">© 2025 GhibliFolio</p>
    </div>
    </div>
  );
};

export default ProfilePreview;
