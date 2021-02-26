import React, { Fragment, Suspense, useRef } from "react";

import { Canvas, useFrame } from "react-three-fiber";

import { OrbitControls, Loader, useFBX, Html } from "@react-three/drei";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Navbar from "../../components/Navbar/Navbar";

import useSWR from "swr";

import "./LeaderBoard.css";

const boxPositions = {
  0: [0.5, 2, 0],
  1: [-0.7, 1.8, 0],
  2: [-0.2, 1.4, -1],
  3: [0.1, 1.2, 1.1],
};

const Box = (props) => {
  const mesh = useRef();

  // useFrame(() => {
  //   mesh.current.rotation.y += 0.005;
  // });
  return (
    <mesh {...props} ref={mesh} scale={[0.2, 0.2, 0.2]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#3a87fa"} />
      <Html>
        <div className="box-container">
          <div className="box-text">{props.text}</div>
        </div>
      </Html>
    </mesh>
  );
};

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
  console.log(data);

  return (
    <div className="lb-main">
      <Navbar />
      <div className="leaderboard-main">
        <Canvas
          className="lb-can1"
          colorManagement
          camera={{ position: [2, 3, 4], fov: 65 }}
          style={{ height: "90vh" }}
        >
          <Lights />
          <Suspense fallback={null}>
            {data && data.data && data.data.length ? (
              <Fragment>
                <group position={[0, 0, 2]}>
                  <mesh
                    scale={[0.0009, 0.0009, 0.0009]}
                    position={[0, 2.45, -2]}
                  >
                    <Model modelPath="/sunflower.fbx" />
                    <Html>
                      <div className="box-container">
                        <div className="box-text">{data.data[0].username}</div>
                      </div>
                    </Html>
                  </mesh>
                </group>
                {data.data.map((obj, i) =>
                  i !== 0 && i <= 4 ? (
                    <group key={i} position={boxPositions[i - 1]}>
                      <Box position={[0, 0, 0]} text={obj.username} />
                    </group>
                  ) : null
                )}

                <group position={[0, 0, 0]}>
                  <mesh scale={[0.0004, 0.0004, 0.0004]} position={[0, 0, 0]}>
                    <Model modelPath="/mountain.fbx" />
                  </mesh>
                </group>
              </Fragment>
            ) : null}
          </Suspense>
          <OrbitControls
            mixPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
        <div className="lb-board">
          <div className="lb-title">Top Weekly</div>
          <div className="lb-item-list">
            {data && data.data && data.data.length
              ? data.data.map((obj, i) =>
                  i <= 4 ? (
                    <div className="lb-item" key={i}>
                      <div className="lb-li-name">{obj.username}</div>
                      <div className="lb-li-score">
                        <ProgressBar value={obj.xp} total={100} />
                      </div>
                      <div className="lb-li-value">{obj.xp} xp</div>
                    </div>
                  ) : null
                )
              : null}
          </div>
        </div>
      </div>

      {/*<div className="lb-streaks-main">
        <Canvas
          className="s-canv"
          colorManagement
          camera={{ position: [3, 6, 3], fov: 65 }}
          style={{ height: "45vh" }}
        >
          <Lights />
          <Suspense fallback={null}>
            <group position={[0, 250, 0]}>
              <mesh>
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={"black"} />
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
          </div>*/}
      <Loader />
    </div>
  );
};
export default LeaderBoard;
