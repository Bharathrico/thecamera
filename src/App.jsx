import React from "react";
import P5Brightness from "./P5/P5Brightness";
import ImageDevelop from "./P5/ImageDevelop";
import { useAppStore } from "./store/useMainStore";
import ThreeComponent from "./threed/ThreeComponent";
import { useState } from "react";
import "./App.css";
import Intermediate from "./Components/Intermediate";

function App() {
  const brightness = useAppStore((state) => state.roomBrightness);
  const imageCaptured = useAppStore((state) => state.imageCaptured);
  let brightnessClass = () => "level" + brightness;

  const [step, setStep] = useState("first");

  const goToSection = (step) => setStep(step);

  return (
    <div className={`photoroom ${brightnessClass()}`}>
      <div style={{position:"absolute", top:"10px", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px"}}>
        <img
          style={{ height: "30px" }}
          src={brightness > 3 ? "images/Sun.png" : "images/Moon.png"}
        />
        {brightness > 3 ? (
          <p style={{ color: "#000" }}>Room is Bright</p>
        ) : (
          <p>Room is dark</p>
        )}
      </div>
      {/* //new to this
      <h1>The Camera</h1>
      
      <ImageDevelop/> */}

      {step === "first" && <ThreeComponent onDone={goToSection} />}
      {step === "second" && <Intermediate onDone={goToSection} />}
      {step === "third" && <ImageDevelop />}

      <P5Brightness />
    </div>
  );
}

export default App;
