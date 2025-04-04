import { create } from "zustand";

const useThemeStore = create((set) => ({
  themeColor: "blue", // Default color
  setThemeColor: (color) => set({ themeColor: color }),
}));

export default useThemeStore;
