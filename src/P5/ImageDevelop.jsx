import React, { useEffect, useRef } from "react";
import p5 from "p5";
import "./ImageDev.css";
import html2canvas from "html2canvas";
import { useImageStore } from "../store/useImageStore";
import { useAppStore } from "../store/useMainStore";

const ImageDevelop = () => {
  const imageDivRef = useRef(null);
  const containerRef = useRef(null);
  const frame = useImageStore((s) => s.frame);
  const imageCaptured = useImageStore((s) => s.imageCaptured);
  const roomBrightness = useAppStore((state) => state.roomBrightness);
  let p5Instance = null;

  const handleExport = async () => {
    if (imageDivRef.current) {
      const canvas = await html2canvas(imageDivRef.current, { scale: 2 });
      const image = canvas.toDataURL("image/png");

      // Create a download link
      const link = document.createElement("a");
      link.href = image;
      link.download = "capture.png";
      link.click();
    }
  };
  useEffect(() => {
    if (imageCaptured) {
      console.log("in");
      // const imgURL = await URL.createObjectURL(frame);
      console.log(frame);
    }
    const sketch = (s) => {
      let overlay;
      let capture;
      let imageFrame;
      s.setup = async () => {
        s.createCanvas(800, 600);
        s.pixelDensity(1);

        // Webcam
        capture = s.createCapture(s.VIDEO);
        capture.size(800, 600);
        capture.hide();
        if (imageCaptured) {
          imageFrame = await s.loadImage(frame);
          console.log("hi");
        }
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
        s.pop();

        s.loadPixels();

        let brightest = { x: 0, y: 0, brightness: 0 };
        let step = 5;

        for (let y = 0; y < s.height; y += step) {
          for (let x = 0; x < s.width; x += step) {
            let i = (y * s.width + x) * 4;
            let r = s.pixels[i];
            let g = s.pixels[i + 1];
            let b = s.pixels[i + 2];
            let lum = 0.299 * r + 0.587 * g + 0.114 * b;
            lum = s.int(s.map(lum, 0, 255, 0, 255));
            if (lum >=250 ) {
              brightest = { x, y, brightness: lum };
            }
          }
        }
        if (imageCaptured) {
          s.image(imageFrame, 0, 0, s.width, s.height);
          console.log("loaded mamae");
        }
        // erase overlay where the brightest pixel is

        if (brightest.brightness != 0) {
          overlay.push();
          overlay.erase();
          overlay.noStroke();

          overlay.drawingContext.shadowBlur = 130;
          overlay.drawingContext.shadowColor = "rgba(0, 0, 0, 100)";

          // decide what color to paint based on webcam pixel
          let col = s.color(0); // soft RGB reveal
          overlay.fill(col);

          overlay.ellipse(brightest.x, brightest.y, 250, 250);
          overlay.noErase();
          overlay.pop();
          s.fill(s.color(255, 150, 0));
          s.stroke(255);
          s.strokeWeight(2);
          s.circle(brightest.x, brightest.y, 30);
        }

        // draw overlay on top
        s.image(overlay, 0, 0);
      };

      s.findPixel = () => {
        s.loadPixels();
        let step = 5;
        for (let y = 0; y < s.height; y += step) {
          for (let x = 0; x < s.width; x += step) {
            let i = (y * s.width + x) * 4;
            let r = s.pixels[i];
            let g = s.pixels[i + 1];
            let b = s.pixels[i + 2];
            let lum = 0.299 * r + 0.587 * g + 0.114 * b;
            lum = s.int(s.map(lum, 0, 255, 1, 20));
            if (lum == 20) {
              return [x,y];
            } else {
              return null;
            }
          }
        }
      };
    };

    if (containerRef.current) {
      p5Instance = new p5(sketch, containerRef.current);
    }

    return () => p5Instance?.remove();
  }, [frame, imageCaptured]);

  return (
    <div
      onClick={() => handleExport()}
      ref={imageDivRef}
      className="imageFrame"
    >
      {/* <img className="captureImage" src={frame} alt="" /> */}
      <div className="filmLayer" ref={containerRef}></div>
    </div>
  );
};

export default ImageDevelop;
