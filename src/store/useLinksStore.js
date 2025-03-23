import { create } from "zustand";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

// Add icons to the FontAwesome library
library.add(faInstagram, faTwitter, faYoutube);

// Mapping of icon names to actual icons
export const faIcons = {
  faInstagram,
  faTwitter,
  faYoutube,
};

// Initial links (store icon names as strings)
const initialLinks = [
  {
    id: "1",
    title: "Instagram",
    description: "Follow me for daily updates",
    icon: "faInstagram", // Store icon name instead of object
    isActive: true,
  },
  {
    id: "2",
    title: "Portfolio Website",
    description: "Check out my latest work",
    icon: "faYoutube",
    isActive: true,
  },
  {
    id: "3",
    title: "Twitter",
    description: "Thoughts and industry news",
    icon: "faTwitter",
    isActive: false,
  },
];

const useLinksStore = create((set) => ({
  links: initialLinks,

  addLink: (link) => set((state) => ({ links: [...state.links, link] })),

  updateLink: (updatedLink) =>
    set((state) => ({
      links: state.links.map((link) => (link.id === updatedLink.id ? updatedLink : link)),
    })),

  removeLink: (id) =>
    set((state) => ({ links: state.links.filter((link) => link.id !== id) })),

  toggleLink: (id) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, isActive: !link.isActive } : link
      ),
    })),
}));

export default useLinksStore;
