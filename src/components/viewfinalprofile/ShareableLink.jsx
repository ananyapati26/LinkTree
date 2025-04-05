"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";


const ShareableLink = ({ userId }) => {
  const [copied, setCopied] = useState(false);
//   const [shareableLink, setShareableLink] = useState("hi");


  const shareableLink = `http://localhost:3000/linkbook/${userId}`;
  // const shareableLink = `https://link-folio-seven.vercel.app/linkbook/${userId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareOnSocial = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my LinkFolio`,
          text: `Here's my LinkFolio profile with all my important links!`,
          url: shareableLink,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  if (!shareableLink) {
    return (
      <div className="mt-6 flex flex-col items-center">
        <p className="text-yellow-600 text-sm mb-2">
          Loading your shareable link...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="flex w-full items-center border rounded-lg overflow-hidden mb-2">
        <input
          type="text"
          value={shareableLink}
          className="flex-1 p-2 text-sm bg-gray-50"
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className="bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
          title="Copy link"
        >
          <FontAwesomeIcon
            icon={copied ? faCheck : faCopy}
            className={copied ? "text-green-500" : "text-gray-700"}
          />
        </button>
      </div>

      <button
        onClick={shareOnSocial}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full justify-center"
      >
        <FontAwesomeIcon icon={faShareAlt} />
        Share Profile
      </button>

      <p className="text-xs text-gray-500 mt-2">
        Anyone with this link can view your profile
      </p>
    </div>
  );
};

export default ShareableLink;
