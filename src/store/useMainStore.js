import { create } from "zustand";
import photoframes from '../assets/frames.json'
//Random frame based on JSON data
const framekeys = Math.floor(Math.random()*20);

export const useAppStore = create(

    (set) => ({
      // ---------- STATE ----------
      roomBrightness: 5,
      currentId:framekeys,

      // ---------- ACTIONS ----------
      setBrightness: (roomBrightness) => {
        if(roomBrightness>5)
        {
        set({ roomBrightness:5 })
        }
        else
        {
          set({ roomBrightness })
        }
      },

      setKeyvalue: (currentId) => set({currentId})
    }),
    {
      name: "app-store", // localStorage key
    }
  
);
