import React, { useEffect, useRef } from "react";
import p5 from "p5";

const P5Canvas = () => {
  const containerRef = useRef(null);
  let p5Instance = null;

  useEffect(() => {
    const sketch = (s) => {
      let capture;
      let overlay;
      s.setup = () => {
        s.createCanvas(100, 100);
        s.pixelDensity(1);

        // Webcam
        capture = s.createCapture(s.VIDEO);
        capture.size(100, 100);
        capture.hide();
        // White overlay
        overlay = s.createGraphics(s.width, s.height);
        overlay.background(255);
      };

      s.draw = () => {
        s.background(0);
        s.push();
        s.translate(s.width, 0);
        s.scale(-1, 1);
        // draw webcam underneath
        s.image(capture, 0, 0, s.width, s.height);
        s.pop()

        //brightnesscapture

        s.loadPixels();
        let total = 0;
        let count = 0;

        let brightest = { x: 0, y: 0, brightness: 0 };
        let step = 5;

        for (let y = 0; y < s.height; y += step) {
          for (let x = 0; x < s.width; x += step) {
            let i = (y * s.width + x) * 4;
            let r = s.pixels[i];
            let g = s.pixels[i + 1];
            let b = s.pixels[i + 2];
            let bright = r + g + b;
            if (bright > 700) {
              brightest = { x, y, brightness: bright };
            }
          }
        }

        // erase overlay where the brightest pixel is

        if(brightest.brightness!=0)
        {
            overlay.push();
            overlay.erase();               // enables erase mode
            overlay.noStroke();

            // feather softness
            overlay.drawingContext.shadowBlur = 40;
            overlay.drawingContext.shadowColor = "rgba(0,0,0,1)";

            // the shape being erased (soft edge)
            overlay.ellipse(brightest.x, brightest.y, 120, 120);

            overlay.noErase();
            overlay.pop();
        }

        // draw overlay on top
        s.image(overlay, 0, 0);
      };
    };

    if (containerRef.current) {
      p5Instance = new p5(sketch, containerRef.current);
    }

    return () => p5Instance?.remove();
  }, []);

  return <div ref={containerRef}></div>;
};

export default P5Canvas;
