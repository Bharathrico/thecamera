import { create } from "zustand";

export const useAppStore = create(

    (set) => ({
      // ---------- STATE ----------
      roomBrightness: 10,

      // ---------- ACTIONS ----------
      setBrightness: (roomBrightness) => set({ roomBrightness }),
    }),
    {
      name: "app-store", // localStorage key
    }
  
);
