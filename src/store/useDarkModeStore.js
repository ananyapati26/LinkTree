
// import { create } from 'zustand';
// const useDarkModeStore = create((set) => ({
//   darkMode: false,
//   setDarkMode: (value) => set({ darkMode: value }),
// }));
// export default useDarkModeStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useDarkModeStore = create(
  persist(
    (set) => ({
      darkMode: false,
      setDarkMode: (value) => set({ darkMode: value }),
    }),
    {
      name: 'dark-mode-storage', 
    }
  )
);

export default useDarkModeStore;
