import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { useImageStore } from "../store/useImageStore";
import html2canvas from "html2canvas";

export default function ImageCapture() {
  const containerRef = useRef(null);
  const p5Ref = useRef(null);
  const setFrame = useImageStore((s) => s.setFrame);
  const setCaptured = useImageStore((s) => s.setCaptured);

  const handleCapture = async () => {
      if (containerRef.current) {
        const canvas = await html2canvas(containerRef.current, { scale: 1 });
        const image = canvas.toDataURL("image/png");
        console.log(image)
        setCaptured();
        setFrame(image);                // save to Zustand
    };
  }

  useEffect(() => {
    const sketch = (s) => {
      let video;

      s.setup = () => {
        s.createCanvas(800, 600);
        video = s.createCapture(s.VIDEO);
        video.size(800, 600);
        video.hide();
      };

      s.draw = () => {
        s.background(0);
        s.image(video, 0, 0);
        s.loadPixels()
      };

      // Capture function
      s.captureFrame = () => {
        console.log("Finally")
        const snapshot = s.get();      // p5.Image
        console.log(snapshot)
        setFrame(snapshot);                // save to Zustand

        setTimeout(() => {
            setCaptured();
        }, "200");
        
      };
    };

    p5Ref.current = new p5(sketch, containerRef.current);

    return () => p5Ref.current?.remove();
  }, []);

  return (
    <div>
      <div ref={containerRef}></div>
      <button onClick={() => handleCapture()}>
        Capture Frame
      </button>
    </div>
  );
}
