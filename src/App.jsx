import React from "react";
import P5Brightness from "./P5/P5Brightness";
import ImageDevelop from "./P5/ImageDevelop";
import { useAppStore } from "./store/useMainStore";
import ThreeComponent from "./threed/threecomponent";
import { useState } from "react";
import './App.css'


function App() {
  const brightness = useAppStore((state) => state.roomBrightness);
  const imageCaptured = useAppStore((state=>state.imageCaptured))
  let brightnessClass = () => "level"+brightness

  const [step, setStep] = useState("first");

  const goToSecond = () => setStep("second");

  return (
    <div className={`photoroom ${brightnessClass()}`}>
      {brightness>3?<p>Room is Bright to take images</p>:<p>Room is dark enough to develop your photos</p>}
      {/* //new to this
      <h1>The Camera</h1>
      
      <ImageDevelop/> */}
      
      {step === "first" && <ThreeComponent onDone={goToSecond} />}
      {step === "second" && <ImageDevelop/>}
      
      

      <P5Brightness />
    </div>
  );
}

export default App;
