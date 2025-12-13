// store/useWebcamStore.js
import { create } from "zustand";

export const useImageStore = create((set) => ({
  frame: null,           // p5.Image or base64 string
  imageCaptured:false,
  filmExpose:false,
  setFrame: (img) => set({ frame: img }),
  setCaptured: () => set({imageCaptured:true}),
  setExpose:()=> set({filmExpose:true})
}));
