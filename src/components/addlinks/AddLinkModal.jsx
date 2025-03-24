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

/** Social Icons List */
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

const AddLinkModal = ({ isOpen, setIsOpen, existingLink }) => {
  const addLink = useLinksStore((state) => state.addLink);

  /** Initialize state */
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(
    existingLink?.icon || faInstagram // Set a valid default icon
  );
  

  const [isActive, setIsActive] = useState(true);

  /** Populate fields if editing */
  useEffect(() => {
    if (existingLink) {
      setTitle(existingLink.title);
      setUrl(existingLink.url);
      setSelectedIcon(existingLink.icon);
      setIsActive(existingLink.isActive);
    } else {
      resetForm();
    }
  }, [existingLink]);

  /** Reset form */
  const resetForm = () => {
    setTitle("");
    setUrl("");
    setSelectedIcon(socialIcons[0].icon);
    setIsActive(true);
  };

  /** Handle form submission */
  const handleSubmit = () => {
    if (!title.trim() || !url.trim()) {
      alert("Title and URL are required!");
      return;
    }

    const newLink = {
      id: existingLink?.id || Date.now().toString(),
      title,
      url,
      icon: selectedIcon || faPlus,
      isActive,
    };
    console.log("Current links in Zustand:", useLinksStore.getState().links);


    console.log("Adding link:", newLink);



    addLink(newLink);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {existingLink ? "Edit Link" : "Add New Link"}
          </DialogTitle>
        </DialogHeader>

        {/* Title Input */}
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
