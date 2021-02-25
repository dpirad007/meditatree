import React, { Fragment, Suspense, useState } from "react";

import { Canvas } from "react-three-fiber";

import { useGLTF, OrbitControls } from "@react-three/drei";

import { Section } from "../../components/Section";

import Navbar from "../../components/Navbar/Navbar";

import "./Home.css";

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

const Home = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className="home-main">
      <Navbar />
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
        style={{ height: "100vh" }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 250, 0]}>
            <mesh
              scale={hover ? [11, 11, 11] : [10, 10, 10]}
              onPointerOver={(e) => setHover(true)}
              onPointerOut={(e) => setHover(false)}
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
          <Section factor={1.5} offset={1}>
            <group position={[0, 250, 0]}>
              <mesh position={[0, -280, 0]} scale={[1, 1, 1]}>
                <Model modelPath="/armchairYellow.gltf" />
              </mesh>
            </group>
          </Section>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          mixPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Home;
