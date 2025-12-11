import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      // ---------- STATE ----------
      roomBrightness: 10,
      

      // ---------- ACTIONS ----------
      setBrightness: (roomBrightness) => set({ roomBrightness }),

      // ---------- SELECTOR HELPERS ----------
      getBrightness: () => get().roomBrightness,
    }),
    {
      name: "app-store", // localStorage key
    }
  )
);
