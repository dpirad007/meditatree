import React, { Fragment, Suspense } from "react";

import { Canvas } from "react-three-fiber";

import { useFBX, OrbitControls } from "@react-three/drei";

import Navbar from "../../components/Navbar/Navbar";

// const Forest =  require("../../../public/main_level.fbx")

import "./Home.css";

const Lights = () => {
  return (
    <Fragment>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={0.7}
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
  const fbx = useFBX(modelPath);
  return <primitive object={fbx} dispose={null} />;
}

const Home = () => {
  return (
    <div className="home-main">
      <Navbar />
      <Canvas
        colorManagement
        camera={{ position: [0, 100, 0], fov: 70 }}
        style={{ height: "100vh" }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 250, 0]}>
            <mesh
              scale={[0.01, 0.01, 0.01]}
              onClick={(e) => {
                e.stopPropagation();
                console.log("yolo");
              }}
              position={[0, -250, 0]}
            >
              <Model modelPath="/main_level.fbx" />
            </mesh>
          </group>
        </Suspense>
        <OrbitControls
          mixPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
};

export default Home;
