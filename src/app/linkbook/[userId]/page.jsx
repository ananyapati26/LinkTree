"use client";

import { useEffect, useState } from "react";
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
import { faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
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
  faPlus,
};

const normalizeIconName = (iconName) => {
  const mapping = {
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
  };
  return mapping[iconName?.toLowerCase()] || "faPlus";
};

const gradients = {
  gray: "bg-gray-100 text-gray-900 border-gray-400",
  yellow: "bg-yellow-100 text-yellow-900 border-yellow-400",
  blue: "bg-blue-100 text-blue-900 border-blue-400",
  green: "bg-green-100 text-green-900 border-green-400",
  purple: "bg-purple-100 text-purple-900 border-purple-400",
  pink: "bg-pink-100 text-pink-900 border-pink-400",
  orange: "bg-orange-100 text-orange-900 border-orange-400",
  red: "bg-red-100 text-red-900 border-red-400",
  black: "bg-gray-800 text-white border-gray-600",
};

export default function UserPage({ params }) {
  const userId = params?.userId;
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeColor, setThemeColor] = useState("blue");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      try {
        const [profileRes, linksRes, themeRes] = await Promise.all([
          fetch(`/api/profile/${userId}`),
          fetch(`/api/links/${userId}`),
          fetch(`/api/themecolor/${userId}`),
        ]);

        if (!profileRes.ok || !linksRes.ok) {
          setError(true);
          return;
        }

        const [profileData, linksData, themeData] = await Promise.all([
          profileRes.json(),
          linksRes.json(),
          themeRes.json(),
        ]);

        setProfile(profileData);
        setLinks(linksData || []);
        setThemeColor(themeData?.color || "blue");
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  const selectedTheme = gradients[themeColor] || gradients.blue;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">User Not Found</h1>
        <p className="mt-4">
          We couldn't find the user profile you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 ${selectedTheme} mt-12 items-center flex flex-col`}
    >
      <div className="p-8 text-center">
        {/* Profile Image */}
        <div className="w-28 h-28 mx-auto mb-4 border-2 rounded-full overflow-hidden shadow-md border-gray-400">
          <Image
            src={profile.avatar || "/default-profile.jpg"}
            width={112}
            height={112}
            className="rounded-full"
            alt="Profile"
          />
        </div>

        <p className="text-2xl font-serif font-bold">
          {profile.name || "No Name"}
        </p>
        <p className="text-sm italic">{profile.bio || "No bio provided."}</p>

        {/* Links */}
        <div className="mt-4 space-y-2">
          {links
            .filter((link) => link.isActive)
            .map((link) => {
              const normalizedIconName = normalizeIconName(link.icon);
              const iconObject = iconMap[normalizedIconName] || faPlus;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-5 rounded-full border border-black bg-transparent hover:bg-white hover:text-black transition-all duration-200 group md:w-[550px] w-[300px] shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={iconObject}
                      className="text-black group-hover:text-black w-6 h-6"
                    />
                  </div>
                  <span className="font-semibold text-black text-lg">
                    {link.title}
                  </span>

                  <FontAwesomeIcon icon={faEllipsisV} className="text-black" />
                </a>
              );
            })}
        </div>

        <p className="text-xs text-gray-400 mt-6">© 2025 LinkFolio</p>
      </div>
    </div>
  );
}
