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

// Zustand store for managing links
const useLinksStore = create((set) => ({
  links: [],
  addLink: (newLink) =>
    set((state) => ({
      links: [...state.links, { ...newLink, icon: newLink.icon || faPlus }], // Ensure default icon is set
    })),
  updateLink: (updatedLink) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === updatedLink.id ? { ...link, icon: updatedLink.icon || faPlus } : link
      ),
    })),
  deleteLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),
}));

export default useLinksStore;
