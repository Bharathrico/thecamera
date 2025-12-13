// WebcamP5.js
import { useEffect, useRef } from "react";
import p5 from "p5";

export default function P5Viewfinder({ onCanvasReady }) {
  const wrapperRef = useRef();

  useEffect(() => {
    let sketch = (p) => {
      let cam;

      p.setup = () => {
        const c = p.createCanvas(128, 96);
        cam = p.createCapture(p.VIDEO);
        cam.size(128, 96);
        cam.hide();

        // expose canvas to parent
        if (onCanvasReady)
        {
         onCanvasReady(c.elt);}
      };

      p.draw = () => {
        
        p.translate(p.width, p.height);
        p.scale(-1, -1);
        p.image(cam, 0, 0, 128, 96);
      };
    };

    const instance = new p5(sketch, wrapperRef.current);

    return () => instance.remove();
  }, []);

  return <div ref={wrapperRef} style={{ display: "none" }} />;
}
