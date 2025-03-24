"use client";

import useProfileStore from "@/store/useProfileStore"; // Import Zustand store
import useLinksStore from "@/store/useLinksStore";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const ProfilePreview = () => {
  const { name, bio, profileImage } = useProfileStore(); // Get profile data from Zustand
  const { links } = useLinksStore(); // Get links from Zustand
 

  return (
    <div className="p-4 rounded-lg bg-white shadow-md w-96 mx-auto">
      <h3 className="text-lg font-semibold mb-2">Preview</h3>
      <p className="text-gray-500 text-sm mb-4">See how your profile looks.</p>

      {/* Mobile Frame */}
      <div className="p-4 bg-gray-50 rounded-lg border shadow-md text-center">
        {/* Profile Image */}
        <div className="w-20 h-20 mx-auto mb-2 border rounded-full overflow-hidden border-blue-600">
          <Image
            src={profileImage}
            width={80}
            height={80}
            className="rounded-full"
            alt="Profile"
          />
        </div>

        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-500">{bio}</p>

        {/* Links */}
        <div className="mt-3 space-y-2">
          {links
            .filter((link) => link.isActive)
            .map((link) => (
              <div
                key={link.id}
                className="bg-white border rounded-lg p-2 text-sm shadow-sm flex items-center gap-2"
              >
                <FontAwesomeIcon
                  icon={link.icon || faPlus}
                  size="lg"
                  className="text-gray-700 w-5 h-5"
                />
                <div>
                  <p className="font-medium">{link.title}</p>
                  <p className="text-xs text-gray-500">{link.description}</p>
                </div>
              </div>
            ))}
        </div>

        <p className="text-xs text-gray-400 mt-4">© 2025 LinkFolio</p>
      </div>
    </div>
  );
};

export default ProfilePreview;
