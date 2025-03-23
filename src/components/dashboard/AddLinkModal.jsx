"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";

/** List of available social icons */
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

const AddLinkModal = ({ isOpen, setIsOpen, onAddLink, existingLink }) => {
  /** Initialize state */
  const [title, setTitle] = useState(existingLink?.title || "");
  const [url, setUrl] = useState(existingLink?.url || "");
  const [description, setDescription] = useState(existingLink?.description || "");
  const [selectedIcon, setSelectedIcon] = useState(
    existingLink?.icon || socialIcons[0].icon
  );
  const [isActive, setIsActive] = useState(existingLink?.isActive ?? true);

  /** Handle form submission */
  const handleSubmit = () => {
    if (!title.trim() || !url.trim()) {
      alert("Title and URL are required!");
      return;
    }

    const newLink = {
      id: existingLink?.id || Date.now().toString(), // Use existing ID if editing, otherwise generate new
      title,
      url,
      description,
      icon: selectedIcon,
      isActive,
    };

    onAddLink(newLink);
    resetForm();
    setIsOpen(false);
  };

  /** Reset form fields */
  const resetForm = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    setSelectedIcon(socialIcons[0].icon);
    setIsActive(true);
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

        {/* Description Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Description (optional)</label>
          <Textarea
            placeholder="A short description of this link"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Icons Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Icon</label>
          <div className="grid grid-cols-5 gap-2">
            {socialIcons.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  selectedIcon === item.icon
                    ? "border-black bg-gray-100"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedIcon(item.icon)}
              >
                <FontAwesomeIcon icon={item.icon} size="lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked)}
          />
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
