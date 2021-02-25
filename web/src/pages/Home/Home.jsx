import React, { Fragment, Suspense, useRef, useEffect } from "react";

import { Canvas, useFrame } from "react-three-fiber";

import { Html, useGLTF, OrbitControls } from "@react-three/drei";

import state from "../../components/State";

import { Section } from "../../components/Section";

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

// const HTMLContent = ({ domContent, positionY, modelPath, flower }) => {
//   const ref = useRef();

//   useFrame(() => (ref.current.rotation.y += 0.001));

//   return (
//     <Section factor={1.5} offset={1}>
//       <group position={[0, positionY, 0]}>
//         <mesh
//           ref={ref}
//           position={[0, -35, 0]}
//           scale={flower ? [10, 10, 10] : [1, 1, 1]}
//         >
//           <Model modelPath="/flower_white.gltf" />
//         </mesh>
//         <Html portal={domContent} fullscreen>
//           <div className="container">
//             <h1>Hello</h1>
//             <button>yo</button>
//           </div>
//         </Html>
//       </group>
//     </Section>
//   );
// };

const Home = () => {
  return (
    <Fragment>
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
        style={{ height: "100vh" }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 250, 0]}>
            <mesh position={[0, -280, 0]} scale={[1, 1, 1]}>
              <Model modelPath="/armchairGreen.gltf" />
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
        style={{ height: "100vh" }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 250, 0]}>
            <mesh position={[0, -280, 0]} scale={[1, 1, 1]}>
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
    </Fragment>
  );
};

export default Home;
