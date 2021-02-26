import React, { Fragment, Suspense } from "react";

import { Canvas } from "react-three-fiber";

import { OrbitControls, Loader, useFBX } from "@react-three/drei";

import ProgressBar from "../../components/ProgressBar/ProgressBar.";
import Navbar from "../../components/Navbar/Navbar";

import useSWR from "swr";

import "./LeaderBoard.css";

const Lights = () => {
  return (
    <Fragment>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />
    </Fragment>
  );
};

function Model({ modelPath }) {
  const fbx = useFBX(modelPath);
  return <primitive object={fbx} dispose={null} />;
}

const LeaderBoard = () => {
  const { data } = useSWR("user/leaderboard");

  const { data: sData } = useSWR("user/streak");

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
                scale={[0.0004, 0.0004, 0.0004]}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("test");
                }}
                position={[0, -250, 0]}
              >
                <Model modelPath="/mountain.fbx" />
              </mesh>
            </group>
          </Suspense>
          <OrbitControls
            enableZoom={false}
            mixPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
        <div className="lb-board">
          <div className="lb-title">Top Weekly</div>
          <div className="lb-item-list">
            {data && data.data && data.data.length
              ? data.data.map((obj, i) =>
                  i < 4 ? (
                    <div className="lb-item" key={i}>
                      <div className="lb-li-name">User1</div>
                      <div className="lb-li-score">
                        <ProgressBar value={obj.xp} total={100} />
                      </div>
                      <div className="lb-li-value">{obj.xp}</div>
                    </div>
                  ) : null
                )
              : null}
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
              <mesh position={[0, -250, 0]} scale={[0.005, 0.005, 0.005]}>
                <Model modelPath="/sunflower.fbx" />
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
          {sData && sData.data ? (
            <Fragment>
              Streak
              <br />
              {sData.data} Days
            </Fragment>
          ) : (
            <Fragment>
              Streak
              <br />
              10 Days
            </Fragment>
          )}
        </div>
      </div>
      <Loader />
    </div>
  );
};
export default LeaderBoard;
