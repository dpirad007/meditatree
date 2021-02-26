import React, { Fragment, Suspense } from "react";

import { Canvas } from "react-three-fiber";

import { OrbitControls, Loader, useGLTF } from "@react-three/drei";

import ProgressBar from "../../components/ProgressBar/ProgressBar.";
import Navbar from "../../components/Navbar/Navbar";

import "./LeaderBoard.css";

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
    <div className="lb-main">
      <Navbar />
      <div className="leaderboard-main">
        <Canvas
          className="lb-can1"
          colorManagement
          camera={{ position: [3, 3, 3], fov: 65 }}
          style={{ height: "45vh" }}
        >
          <Lights />
          <Suspense fallback={null}>
            <group position={[0, 250, 0]}>
              <mesh
                scale={[1, 1, 1]}
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
        <div className="lb-board">
          <div className="lb-title">Top Weekly</div>
          <div className="lb-item-list">
            <div className="lb-item">
              <div className="lb-li-name">User1</div>
              <div className="lb-li-score">
                <ProgressBar value={50} total={100} />
              </div>
              <div className="lb-li-value">80</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lb-streaks-main">
        <Canvas
          className="s-canv"
          colorManagement
          camera={{ position: [3, 6, 3], fov: 65 }}
          style={{ height: "45vh" }}
        >
          <Lights />
          <Suspense fallback={null}>
            <group position={[0, 250, 0]}>
              <mesh position={[0, -250, 0]} scale={[0.05, 0.05, 0.05]}>
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

        <div className="s-text-main">
          Streak
          <br />
          10 Days
        </div>
      </div>
      <Loader />
    </div>
  );
};
export default LeaderBoard;
