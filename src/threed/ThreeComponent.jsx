import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import P5Viewfinder from "../P5/P5Viewfinder";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import ImageCapture from '../P5/ImageCapture'
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
      console.log(mesh);
      if (mesh) mesh.material.map = texture;
    }
  }, [texture]);

  return (<primitive object={scene} />);
}

const ThreeComponent = ({ onDone }) => {
  const { scene } = useGLTF("models/Trigger.glb");
   const captureRef = useRef();

  const [webcamCanvas, setWebcamCanvas] = useState(null);

  const captureImage = () => {
    captureRef.current?.runFunction();
    onDone()
  };

  return (
    <>
      <P5Viewfinder onCanvasReady={(c) => setWebcamCanvas(c)} />
      <ImageCapture ref={captureRef} />
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[0, 20, 0]} intensity={1} />
        <directionalLight position={[20, 20, 0]} intensity={1} />
        <directionalLight position={[-20, 20, 0]} intensity={1} />
        <OrbitControls
          enableDamping
          minPolarAngle={Math.PI * 0.4} // 40% down from top
          maxPolarAngle={Math.PI * 0.6} // 60% down -> locks vertical tilt
          minAzimuthAngle={-Math.PI * 0.25} // -45°
          maxAzimuthAngle={Math.PI * 0.25} // 45°
          dampingFactor={0.1}
        />
        {webcamCanvas && <CameraModel webcamCanvas={webcamCanvas} />}
        <primitive object={scene} onClick={()=>captureImage()}/>
      </Canvas>
    </>
  );
}

export default ThreeComponent;