
import { create } from 'zustand';
const useDarkModeStore = create((set) => ({
  darkMode: false,
  setDarkMode: (value) => set({ darkMode: value }),
}));
export default useDarkModeStore;