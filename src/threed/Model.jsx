// Model.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

const Model = () => {
  const gltf = useGLTF("/models/Camera.glb"); // path to your GLTF file

  return (
    <primitive object={gltf.scene} scale={1} position={[0, 0, 0]} />
  );
};

export default Model;
