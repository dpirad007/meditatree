import React, { Fragment, Suspense, useState, useRef, useEffect } from 'react';

import { Canvas, useFrame } from 'react-three-fiber';
import { useFBX, OrbitControls, Loader, Html } from '@react-three/drei';

import { PUBLIC } from '../../utils/constants';

import Navbar from '../../components/Navbar/Navbar';
// import useSWR from "swr";
// import easyFetch from "../../utils/easyFetch";

import './Home.css';

const Box = props => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1, 1, 1] : [0.5, 0.5, 0.5]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#ffee93' : 'orange'} />
      <Html>
        <div className='box-container'>
          <div className='box-text'>{props.text}</div>
        </div>
      </Html>
    </mesh>
  );
};

const Lights = () => {
  return (
    <Fragment>
      <ambientLight intensity={0.3} />
      <directionalLight position={[-10, 10, 0]} intensity={0.1} />
      <directionalLight castShadow position={[0, 10, 0]} intensity={0.1} />
      <directionalLight castShadow position={[100, 10, 0]} intensity={0.1} />
    </Fragment>
  );
};

function Model({ modelPath }) {
  const fbx = useFBX(modelPath);
  return <primitive object={fbx} dispose={null} />;
}

const Home = () => {
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.volume = 0.0;
  }, []);
  // const { data, error } = useSWR("user/leaderboard");
  // console.log(data);
  // const { data, error } = useSWR('user/streak');
  // console.log(data);
  // useEffect(() => {
  //   (async () => {
  //     const { data, error } = await easyFetch("user/xp", { xp: 10 }, "PUT");
  //     console.log(data);
  //   })();
  // }, []);

  return (
    <div className='home-main'>
      <Navbar />
      {/* <Canvas
        colorManagement
        camera={{ position: [3, 3, 3], fov: 65 }}
        style={{ height: '10vh' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[-3, 0, 1]} text='Guided' />
        <Box position={[3, 0, 1]} text='Unguided' />

        <OrbitControls minAzimuthAngle={0} maxAzimuthAngle={0} />
      </Canvas> */}
      <Canvas
        colorManagement
        camera={{ position: [3, 1, 0], fov: 65 }}
        style={{ height: '100vh' }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 0, 1]} rotation={[0, (-1 * Math.PI) / 2, 0]}>
            <mesh
              scale={[0.002, 0.002, 0.002]}
              onClick={e => {
                e.stopPropagation();
                console.log('play audio');
              }}
              position={[0, 0, 0]}
            >
              <Model modelPath='/models/sunflower.fbx' />
            </mesh>
          </group>
          <group position={[0, 0, 0]}>
            <mesh
              scale={[0.001, 0.001, 0.001]}
              onClick={e => {
                e.stopPropagation();
              }}
              position={[0, 0, 0]}
            >
              <Model modelPath='/models/forest.fbx' />
            </mesh>
          </group>
        </Suspense>
        <OrbitControls
          enableDamping={true}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={(-1 * Math.PI) / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
      <Loader />
      <audio
        ref={audioRef}
        src={`${PUBLIC}/music/backsong.mp3`}
        loop
        autoPlay
      />
    </div>
  );
};

export default Home;
