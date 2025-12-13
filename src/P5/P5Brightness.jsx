import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { useAppStore } from "../store/useMainStore";

const P5Brightness = () => {
  const containerRef = useRef(null);
  let p5Instance = null;
  let brightnessValue = 0;

  const setBrightness = useAppStore((state) => state.setBrightness);

  useEffect(() => {
    const sketch = (s) => {
      let overlay;
      let brightnessCapture;
      s.setup = () => {
        s.createCanvas(128, 96);
        s.pixelDensity(1);

        brightnessCapture = s.createCapture(s.VIDEO);
        brightnessCapture.size(128, 96);
        brightnessCapture.hide();

        // White overlay
        overlay = s.createGraphics(s.width, s.height);
        overlay.background(255);
      };

      s.draw = () => {
        s.background(0);
        s.image(brightnessCapture, 0, 0, 128, 96);

        //brightnesscapture

        s.loadPixels();
        let total = 0;
        let count = 0;

        // scan every x pixels to improve performance
        let step = 4;

        for (let y = 0; y < s.height; y += step) {
          for (let x = 0; x < s.width; x += step) {
            let i = (y * s.width + x) * 4;

            let r = s.pixels[i];
            let g = s.pixels[i + 1];
            let b = s.pixels[i + 2];

            // standard luminance formula
            let lum = 0.299 * r + 0.587 * g + 0.114 * b;

            total += lum;
            count++;
          }
        }

        brightnessValue = total / count; // final brightness 0–255
        brightnessValue = s.int(s.map(brightnessValue,0,180,1,5))
        setBrightness(brightnessValue)


        s.fill(255);
        s.textSize(20);
        s.text("Brightness: " + brightnessValue.toFixed(1), 10, s.height - 20);
      };

    };

    if (containerRef.current) {
      p5Instance = new p5(sketch, containerRef.current);
    }

    return () => p5Instance?.remove();
  }, []);

 

  return (
  <div style={{visibility:"hidden", display: "none"}}>
    <div ref={containerRef}></div>
  </div>)
};

export default P5Brightness;
