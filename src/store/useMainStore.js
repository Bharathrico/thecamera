import { create } from "zustand";
import photoframes from '../assets/frames.json'
const framekeys = photoframes.map(item=>item.id);
console.log(framekeys)

export const useAppStore = create(

    (set) => ({
      // ---------- STATE ----------
      roomBrightness: 5,
      currentId:framekeys[0],

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
