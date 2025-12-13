import React, { forwardRef,useEffect, useRef, useImperativeHandle } from "react";
import p5 from "p5";
import { useImageStore } from "../store/useImageStore";
import html2canvas from "html2canvas";

const ImageCapture = forwardRef((props,ref)=> {
  const containerRef = useRef(null);
  const p5Ref = useRef(null);
  const setFrame = useImageStore((s) => s.setFrame);
  const setCaptured = useImageStore((s) => s.setCaptured);

  const handleCapture = async () => {
      if (containerRef.current) {
        const canvas = await html2canvas(containerRef.current, { scale: 1 });
        const image = canvas.toDataURL("image/png");
        
        setCaptured();
        setFrame(image);
    };

  }
   useImperativeHandle(ref, () => ({
    runFunction: handleCapture,
  }));


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

    };

    p5Ref.current = new p5(sketch, containerRef.current);

    return () => p5Ref.current?.remove();
  }, []);

  return (
    <div style={{position:"absolute",left:"110vw"}}>
      <div ref={containerRef}></div>
    </div>
  );
})

export default ImageCapture;