import React, { Fragment, Suspense, useRef, useState } from "react";

import { Canvas, useFrame } from "react-three-fiber";

import { useFBX, OrbitControls, Loader, useGLTF } from "@react-three/drei";

import Navbar from "../../components/Navbar/Navbar";

import "./LeaderBoard.css";

const Box = (props) => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const Lights = () => {
  return (
    <Fragment>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </Fragment>
  );
};

function Model({ modelPath }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} dispose={null} />;
}

const LeaderBoard = () => {
  return (
    <div className="leaderboard-main">
      <Navbar />
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
        style={{ height: "50vh" }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 250, 0]}>
            <mesh
              scale={[10, 10, 10]}
              onClick={(e) => {
                e.stopPropagation();
                console.log("yolo");
              }}
              position={[0, -250, 0]}
            >
              <Model modelPath="/flower_white.gltf" />
            </mesh>
          </group>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          mixPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
        style={{ height: "50vh" }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 250, 0]}>
            <mesh position={[0, -250, 0]} scale={[1, 1, 1]}>
              <Model modelPath="/armchairYellow.gltf" />
            </mesh>
          </group>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          mixPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <Loader />
    </div>
  );
};
export default LeaderBoard;
