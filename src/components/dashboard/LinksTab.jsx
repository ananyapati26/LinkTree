"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@/components/ui/switch";
import AddLinkModal from "@/components/dashboard/AddLinkModal";
import { Plus } from "lucide-react";
import useLinksStore, { faIcons } from "@/store/useLinksStore"; // Import Zustand store & icon mapping

const LinksTab = () => {
  const { links, addLink, updateLink, removeLink, toggleLink } = useLinksStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  // Add or Update Link
  const handleSaveLink = (link) => {
    if (selectedLink) {
      updateLink(link);
    } else {
      addLink({ ...link, id: Date.now().toString() });
    }
    setIsModalOpen(false);
    setSelectedLink(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Your Links</h2>
      <p className="text-gray-500 text-sm mb-4">Manage your links</p>

      <div className="space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md shadow-sm"
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faIcons[link.icon]} className="text-gray-700 w-6 h-6" />
              <div>
                <p className="text-sm font-medium">{link.title}</p>
                <p className="text-xs text-gray-500">{link.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => {
                  setSelectedLink(link);
                  setIsModalOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>

              <button
                className="text-gray-500 hover:text-red-500"
                onClick={() => removeLink(link.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>

              <Switch checked={link.isActive} onCheckedChange={() => toggleLink(link.id)} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setSelectedLink(null);
          setIsModalOpen(true);
        }}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-md"
      >
        <Plus size={16} /> Add New Link
      </button>

      {isModalOpen && (
        <AddLinkModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSaveLink={handleSaveLink}
          existingLink={selectedLink}
        />
      )}
    </div>
  );
};

export default LinksTab;
