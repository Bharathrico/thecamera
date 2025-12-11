import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import P5Viewfinder from "../P5/P5Viewfinder";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import ImageCapture from '../P5/ImageCapture'
import './threeComponent.css'
import gsap from "gsap";

function CameraModel({ webcamCanvas }) {
  const { scene } = useGLTF("models/Camera.glb");
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    if (!webcamCanvas) return;

    const tex = new THREE.CanvasTexture(webcamCanvas);
    tex.needsUpdate = true;
    setTexture(tex);
  }, [webcamCanvas]);

  // continuously update texture each frame
  useEffect(() => {
    let id;
    function update() {
      if (texture) texture.needsUpdate = true;
      id = requestAnimationFrame(update);
    }
    update();
    return () => cancelAnimationFrame(id);
  }, [texture]);

  useEffect(() => {
    if (texture) {
      const mesh = scene.getObjectByName("viewfinder"); // put your mesh name here
      if (mesh) mesh.material.map = texture;
    }
  }, [texture]);

  return (<primitive object={scene} />);
}

const ThreeComponent = ({ onDone }) => {
  const { scene } = useGLTF("models/Trigger.glb");
   const captureRef = useRef();
   const threeRef = useRef();

  const [webcamCanvas, setWebcamCanvas] = useState(null);

  // const captureImage = () => {
    
  //   onDone()
  // };

  useEffect(() => {
    const el = threeRef.current;

    // Animate IN when component mounts
    gsap.fromTo(el, {
      opacity: 0,
      x: 50,
      // scale: 0.4
    },{
      opacity: 1,
      x: 0,
      // scale:1,
      duration: 0.6,
      delay:1.5,
      ease: "power2.out"
    });
  }, []);

  const exitAndKill = () => {
    captureRef.current?.runFunction();
    gsap.to(threeRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.5,
      ease: "power2.in",
      onComplete: onDone, // Unmount after animation
    });
  };

  return (
    <div ref={threeRef} className="threeWrapper">
      <P5Viewfinder onCanvasReady={(c) => setWebcamCanvas(c)} />
      <ImageCapture ref={captureRef} />
      <Canvas  camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[0, 20, 0]} intensity={1} />
        <directionalLight position={[20, 20, 0]} intensity={1} />
        <directionalLight position={[-20, 20, 0]} intensity={1} />
        <OrbitControls
          enableZoom={false}
          enableDamping
          minPolarAngle={Math.PI * 0.4} // 40% down from top
          maxPolarAngle={Math.PI * 0.6} // 60% down -> locks vertical tilt
          minAzimuthAngle={-Math.PI * 0.25} // -45°
          maxAzimuthAngle={Math.PI * 0.25} // 45°
          dampingFactor={0.1}
        />
        {webcamCanvas && <CameraModel webcamCanvas={webcamCanvas} />}
        <primitive onmo object={scene} onClick={()=>exitAndKill()}/>
      </Canvas>
    </div>
  );
}

export default ThreeComponent;