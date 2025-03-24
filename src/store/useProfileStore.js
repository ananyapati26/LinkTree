import { create } from "zustand";

const useProfileStore = create((set) => ({
  name: "Kittu",
  bio: "Digital Designer & Content Creator",
  profileImage: "/default-profile.jpg", // Default profile image

  // Function to update profile details
  updateProfile: (newProfile) => set(newProfile),

  // Function to remove the profile image
  removeProfileImage: () =>
    set({ profileImage: "/default-profile.jpg" }), // Reset to default image
}));

export default useProfileStore;
