import React from "react";
import P5Canvas from "./P5Canvas";
import { useAppStore } from "./store/useMainStore";
import './App.css'


function App() {
  const brightness = useAppStore((state) => state.roomBrightness);
  let brightnessClass = () => "level"+brightness

  return (
    <div className={`photoroom ${brightnessClass()}`}>
      <h1>React + p5 (JS)</h1>
      <P5Canvas />
    </div>
  );
}

export default App;
