"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@/components/ui/switch";
import AddLinkModal from "@/components/addlinks/AddLinkModal";
import { Plus } from "lucide-react";
import useLinksStore from "@/store/useLinksStore"; // Zustand store for state management

const LinksTab = () => {
  const { links, removeLink, toggleLink } = useLinksStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* Title */}
      <motion.h2
        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Your Links
      </motion.h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
        Manage your links efficiently
      </p>

      {/* Links List */}
      <div className="space-y-3">
        {links.map((link) => (
          <motion.div
            key={link.id}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={link.icon || faPlus}
                size="lg"
                className="text-gray-700 dark:text-gray-300 w-6 h-6"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {link.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {link.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Edit Button */}
              <button
                className="p-2 text-gray-500 dark:text-gray-300 hover:text-blue-600 transition-all"
                onClick={() => {
                  setSelectedLink(link);
                  setIsModalOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>

              {/* Delete Button */}
              <button
                className="p-2 text-gray-500 dark:text-gray-300 hover:text-red-500 transition-all"
                onClick={() => removeLink(link.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>

              {/* Toggle Switch */}
              <Switch checked={link.isActive} onCheckedChange={() => toggleLink(link.id)} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add New Link Button */}
      <button
        onClick={() => {
          setSelectedLink(null);
          setIsModalOpen(true);
        }}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-all"
      >
        <Plus size={16} /> Add New Link
      </button>

      {/* Modal */}
      {isModalOpen && (
        <AddLinkModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          existingLink={selectedLink}
        />
      )}
    </div>
  );
};

export default LinksTab;
