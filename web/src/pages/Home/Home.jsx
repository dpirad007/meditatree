import React, { Fragment, Suspense, useRef } from "react";

import { Canvas, extend, useFrame, useThree } from "react-three-fiber";

import { Html, useGLTF } from "@react-three/drei";

import { Section } from "../../components/Section";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./Home.css";

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
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

function Model() {
  const gltf = useGLTF("/flower_white.gltf");
  return <primitive object={gltf.scene} dispose={null} />;
}

const HTMLContent = () => {
  const ref = useRef();

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, 250, 0]}>
        <mesh ref={ref} position={[0, -35, 0]} scale={[10,10,10]}>
          <Model />
        </mesh>
        <Html fullscreen>
          <div className="container">
            <h1>Hello</h1>
          </div>
        </Html>
      </group>
    </Section>
  );
};

const Home = () => {
  return (
    <Fragment>
      <Canvas
        style={{ height: "100vh" }}
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        <CameraControls />
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent />
        </Suspense>
      </Canvas>
    </Fragment>
  );
};

export default Home;
