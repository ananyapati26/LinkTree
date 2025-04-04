

"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInstagram, ..., faPlus } from "@fortawesome/free-brands-svg-icons";
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

import useLinksStore from "@/store/useLinksStore";


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

const socialIcons = [
  { name: "Instagram", icon: faInstagram },
  { name: "Twitter", icon: faTwitter },
  { name: "YouTube", icon: faYoutube },
  { name: "LinkedIn", icon: faLinkedin },
  { name: "Facebook", icon: faFacebook },
  { name: "TikTok", icon: faTiktok },
  { name: "Pinterest", icon: faPinterest },
  { name: "Snapchat", icon: faSnapchat },
  { name: "Spotify", icon: faSpotify },
  { name: "Discord", icon: faDiscord },
  { name: "Twitch", icon: faTwitch },
  { name: "X (Twitter)", icon: faXTwitter },
  { name: "WhatsApp", icon: faWhatsapp },
  { name: "Custom", icon: faPlus },
];

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

const validateUrl = (url) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // Protocol
      "((([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})+(:([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})+)?@)?)?" + // Authentication
      "(([a-zA-Z0-9.-]*)\\.([a-zA-Z]{2,})|(([0-9]{1,3}\\.){3}[0-9]{1,3}))" + // Domain name or IP
      "(:[0-9]{1,5})?" + // Port
      "(\\/[a-zA-Z0-9$_.+!*'(),;:@&=-]*)*" + // Path
      "(\\?[a-zA-Z0-9$_.+!*'(),;:@&=-]*)?" + // Query string
      "(#[-a-zA-Z0-9_]*)?$",
    "i"
  );
  return urlPattern.test(url);
};

const AddLinkModal = ({ isOpen, setIsOpen, existingLink }) => {
  const { addLink, updateLink } = useLinksStore(); // Added updateLink
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(faInstagram); // Default valid icon
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (existingLink) {
      console.log("Existing Link Icon:", existingLink.icon);
      setTitle(existingLink.title);
      setUrl(existingLink.url);
      const normalizedIconName = normalizeIconName(existingLink.icon);
      const iconObject = iconMap[normalizedIconName] || faPlus;
      console.log("Normalized Icon Name:", normalizedIconName);
      console.log("Mapped Icon Object:", iconObject);
      setSelectedIcon(iconObject);
      setIsActive(existingLink.isActive);
    } else {
      resetForm();
    }
  }, [existingLink]);

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setSelectedIcon(socialIcons[0].icon);
    setIsActive(true);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !url.trim()) {
      alert("Title and URL are required!");
      return;
    }
    if (!validateUrl(url)) {
      alert("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    const newLink = {
      id: existingLink?.id || Date.now().toString(),
      title,
      url,
      icon: selectedIcon.iconName || "faPlus",
      isActive,
    };

    try {
      const method = existingLink ? "PUT" : "POST";
      const endpoint = "/api/links";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(existingLink 
          ? { ...newLink, id: existingLink.id }  // Include ID for updates
          : newLink
        ),
      });
      if (!response.ok) throw new Error("Request failed");

      const linkData = await response.json();
      existingLink ? updateLink(linkData) : addLink(linkData);
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  // console.log("Current selectedIcon:", selectedIcon);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {existingLink ? "Edit Link" : "Add New Link"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            placeholder="e.g. Instagram"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* URL Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">URL</label>
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {/* Icons Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Icon</label>
          <div className="grid grid-cols-5 gap-2">
            {socialIcons.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  selectedIcon === item.icon
                    ? "border-blue-600 bg-gray-100"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  console.log("Selected Icon:", item.icon);
                  setSelectedIcon(item.icon);
                }}
              >
                <FontAwesomeIcon icon={item.icon} size="lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox checked={isActive} onCheckedChange={setIsActive} />
          <label className="text-sm">Display this link on your page</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={resetForm}>
            Reset
          </Button>
          <Button className="bg-black text-white" onClick={handleSubmit}>
            {existingLink ? "Update Link" : "Add Link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkModal;
