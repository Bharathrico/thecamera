import React, { useEffect, useRef } from "react";
import p5 from "p5";

const P5Canvas = () => {
  const containerRef = useRef(null);
  let p5Instance = null;

  let video;

  useEffect(() => {
    const sketch = (s) => {
      s.setup = () => {
        s.createCanvas(640, 480);

        video = s.createCapture(s.VIDEO);
        video.size(640,480)
        video.hide()

      };

      s.draw = () => {
        s.image(video, 0,0)
        
      };
    };

    if (containerRef.current) {
      p5Instance = new p5(sketch, containerRef.current);
    }

    return () => {
      p5Instance?.remove(); // Clean up on unmount
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default P5Canvas;
