import React, { Fragment, Suspense, useRef, useEffect } from "react";

import { Canvas, extend, useFrame, useThree } from "react-three-fiber";

import { Html, useGLTF } from "@react-three/drei";

import state from "../../components/State";

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

function Model({ modelPath }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} dispose={null} />;
}

const HTMLContent = ({ domContent, positionY, modelPath }) => {
  const ref = useRef();

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container">
            <h1>Hello</h1>
            <button>yo</button>
          </div>
        </Html>
      </group>
    </Section>
  );
};

const Home = () => {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
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
          <HTMLContent
            modelPath="/armchairYellow.gltf"
            positionY={250}
            domContent={domContent}
          />
          <HTMLContent
            modelPath="/armchairGreen.gltf"
            positionY={0}
            domContent={domContent}
          />
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </Fragment>
  );
};

export default Home;
