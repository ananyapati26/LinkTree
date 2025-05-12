"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
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
import ShareableLink from "./ShareableLink"; // Import the ShareableLink component

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

const ProfilePreviewfinal = () => {
  // const { name, bio, profileImage } = useProfileStore(); // Get profile data from Zustand
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("/default-profile.jpg");
  const [themeColor, setThemeColor] = useState("gray"); // Default color
  const [userId, setUserId] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Default dark mode state
  

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      console.log("Profile Data:", data);
      setName(data.name || "No Name Provided");
      setBio(data.bio || "No Bio Provided");
      setProfileImage(data.avatar || "/default-profile.jpg");
      setUserId(data.userId || null);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const getThemeColor = async () => {
    try {
      const response = await axios.get("/api/themecolor");
      const { color } = response.data;
      console.log(color, "color from server");
      setThemeColor(color);
    } catch (error) {
      console.error("Error fetching theme color:", error);
    }
  };

  const getDarkMode = async () => {
    try {
      const response = await fetch("/api/darkmode");
      if (!response.ok) {
        throw new Error("Failed to fetch dark mode preference");
      }
      const data = await response.json();
      console.log(data, "dark mode from server");
      setDarkMode(data.mode === "dark" ? true : false); // Set dark mode state based on response
    } catch (error) {
      console.error("Error fetching dark mode preference:", error);
    }
  };

  // Fetch dark mode preference when component mounts
  useEffect(() => {
    getDarkMode();
  }
, []); // Empty dependency array means this runs once on mount

  // Fetch theme color when component mounts
  useEffect(() => { 
    getThemeColor();
  }, []); // Empty dependency array means this runs once on mount





   // Light mode gradients
   const lightGradients = {
    gray: "bg-gray-100 text-gray-900 border-gray-400",
    yellow: "bg-yellow-100 text-yellow-900 border-yellow-400",
    blue: "bg-blue-100 text-blue-900 border-blue-400",
    green: "bg-green-100 text-green-900 border-green-400",
    purple: "bg-purple-100 text-purple-900 border-purple-400",
    pink: "bg-pink-100 text-pink-900 border-pink-400",
    orange: "bg-orange-100 text-orange-900 border-orange-400",
    red: "bg-red-100 text-red-900 border-red-400",
  };

  // Dark mode gradients
const darkGradients = {
  gray: "bg-gray-800 text-gray-100 border-gray-600",
  yellow: "bg-yellow-800 text-yellow-200 border-yellow-600",
  blue: "bg-blue-800 text-blue-200 border-blue-600",
  green: "bg-green-800 text-green-200 border-green-600",
  purple: "bg-purple-800 text-purple-200 border-purple-600",
  pink: "bg-pink-800 text-pink-200 border-pink-600",
  orange: "bg-orange-800 text-orange-200 border-orange-600",
  red: "bg-red-800 text-red-200 border-red-600",
};


  const gradients = darkMode ? darkGradients : lightGradients;
  const selectedTheme = gradients[themeColor] || (darkMode ? darkGradients.blue : lightGradients.blue);

  // Fetch links when component mounts
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/links");

        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }

        const data = await response.json();
        setLinks(data);
        fetchUserData();
        getThemeColor(); // Fetch theme color on component mount
      } catch (err) {
        console.error("Error fetching links:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
   <div className={`p-4 rounded-lg mt-14 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md mx-auto w-[100%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%]`}>
         <h3 className="text-lg font-semibold mb-2">Preview</h3>
         <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} text-sm mb-4`}>See how your profile looks.</p>
   
         {/* Mobile Frame */}
         <div
           className={`p-8 rounded-[30px] shadow-lg text-center border ${selectedTheme}`}
         >
           {/* Profile Image */}
           <div className="w-28 h-28 mx-auto mb-4 border-2 rounded-full overflow-hidden shadow-md border-gray-400">
             <Image
               src={profileImage}
               width={112}
               height={112}
               className="rounded-full"
               alt="Profile"
             />
           </div>
   
           <p className="text-2xl font-serif font-bold">{name}</p>
           <p className="text-sm italic">{bio}</p>
   
           {/* Links */}
           <div className="mt-6 space-y-4">
             {links
               .filter((link) => link.isActive)
               .map((link) => {
                 const normalizedIconName = normalizeIconName(link.icon);
                 const iconObject = iconMap[normalizedIconName] || faPlus;
                 return (
                   <div
                     key={link.id}
                     className={`${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-100'} border rounded-full px-6 py-3 text-sm shadow-sm flex items-center gap-3 transition-transform transform hover:scale-105`}
                   >
                     <FontAwesomeIcon
                       icon={iconObject}
                       size="lg"
                       className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} w-5 h-5`}
                     />
                     <div>
                       <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{link.title}</p>
                       <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{link.description}</p>
                     </div>
                   </div>
                 );
               })}
           </div>

           <ShareableLink userId={userId} /> {/* Pass darkMode prop to ShareableLink */}
   
           <p className={`text-xs mt-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>© 2025 LinkFolio</p>
         </div>
       </div>
  );
};

export default ProfilePreviewfinal;
