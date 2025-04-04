import { create } from "zustand";
import { library } from "@fortawesome/fontawesome-svg-core";
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
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Import faPlus from free-solid-svg-icons

// Add icons to FontAwesome library
library.add(
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
  faPlus // Add faPlus to the library
);

// // Zustand store for managing links
// const useLinksStore = create((set) => ({
//   links: [],
//   addLink: (newLink) =>
//     set((state) => ({
//       links: [...state.links, { ...newLink, icon: newLink.icon || faPlus, isActive: true }], // Added default isActive value
//     })),
//   updateLink: (updatedLink) =>
//     set((state) => ({
//       links: state.links.map((link) =>
//         link.id === updatedLink.id ? { ...updatedLink, icon: updatedLink.icon || faPlus } : link
//       ),
//     })),
//   removeLink: (id) => // Changed from deleteLink to removeLink to match what's used in the component
//     set((state) => ({
//       links: state.links.filter((link) => link.id !== id),
//     })),
//   toggleLink: (id) => // Added the missing toggleLink function
//     set((state) => ({
//       links: state.links.map((link) =>
//         link.id === id ? { ...link, isActive: !link.isActive } : link
//       ),
//     })),
// }));

// export default useLinksStore;



const useLinksStore = create((set) => ({
  links: [],
  setLinks: (links) => set({ links }), // Added to set all links at once
  addLink: (newLink) =>
    set((state) => ({
      links: [...state.links, { ...newLink, icon: newLink.icon || faPlus }],
    })),
    updateLink: async (updatedLink) => {
      try {
        const response = await fetch(`/api/links`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLink),
        });
    
        if (!response.ok) throw new Error("Failed to update link");
    
        const data = await response.json();
        
        // Update the local state after successful API call
        set((state) => ({
          links: state.links.map((link) =>
            link.id === updatedLink.id ? { ...data, icon: data.icon || faPlus } : link
          ),
        }));
        
        return data;
      } catch (error) {
        console.error("Error updating link:", error);
      }
    },

    
    removeLink: async (id) => {
      try {
        const response = await fetch(`/api/links`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        
        if (!response.ok) throw new Error("Failed to delete link");
        
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        }));
      } catch (error) {
        console.error("Error deleting link:", error);
      }
    },
  toggleLink: async (id) => {
    try {
      const link = useLinksStore.getState().links.find((l) => l.id === id);
      const response = await fetch(`/api/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...link, isActive: !link.isActive }),
      });
      if (!response.ok) throw new Error("Failed to toggle link");
      const updatedLink = await response.json();
      set((state) => ({
        links: state.links.map((l) =>
          l.id === id ? { ...updatedLink, icon: updatedLink.icon || faPlus } : l
        ),
      }));
    } catch (error) {
      console.error("Error toggling link:", error);
    }
  },
}));

export default useLinksStore;
