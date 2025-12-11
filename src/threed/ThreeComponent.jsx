import { Canvas } from "@react-three/fiber";
import { useGLTF,OrbitControls } from "@react-three/drei";
import P5Viewfinder from "../P5/P5Viewfinder";
import * as THREE from "three";
import { useState, useEffect } from "react";

function Model({ webcamCanvas }) {
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
      console.log(mesh)
      if (mesh) mesh.material.map = texture;
    }
  }, [texture]);

  return <primitive object={scene} />;
}

export default function ThreeComponent() {
  const [webcamCanvas, setWebcamCanvas] = useState(null);

  return (
    <>
      <P5Viewfinder onCanvasReady={(c) => setWebcamCanvas(c)} />

      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[0,20,0]} intensity={1}/>
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
          zoomSpeed={0.8}
          enablePan={false}
        />
        {webcamCanvas && <Model webcamCanvas={webcamCanvas} />}
        orbitCont
      </Canvas>
    </>
  );
}
