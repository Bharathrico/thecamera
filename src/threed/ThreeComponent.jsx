
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import Model from "./Model";

const Loader = () => (
  <Html center>
    <div style={{ color: "white" }}>Loading...</div>
  </Html>
);

export default function ThreeComponent() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <OrbitControls />
        <Environment preset="sunset" background />
      </Canvas>
    </div>
  );
}

