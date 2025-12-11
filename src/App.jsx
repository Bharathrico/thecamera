import React from "react";
import P5Brightness from "./P5/P5Brightness";
import ImageDevelop from "./P5/ImageDevelop";
import { useAppStore } from "./store/useMainStore";
import ImageCapture from './P5/ImageCapture'
import './App.css'


function App() {
  const brightness = useAppStore((state) => state.roomBrightness);
  const imageCaptured = useAppStore((state=>state.imageCaptured))
  let brightnessClass = () => "level"+brightness

  return (
    <div className={`photoroom ${brightnessClass()}`}>
      //new to this
      <h1>The Camera</h1>
      <ImageCapture/>
      <ImageDevelop/>
      <P5Brightness />
    </div>
  );
}

export default App;
