import React, { Fragment, Suspense, useRef, useEffect, useState } from 'react';

import { Canvas } from 'react-three-fiber';
import { useFBX, OrbitControls, Loader } from '@react-three/drei';

import { API_URI } from '../../utils/constants';

import useSWR from 'swr';
import Navbar from '../../components/Navbar/Navbar';
import easyFetch from '../../utils/easyFetch';

import './Home.css';

const Lights = () => {
  return (
    <Fragment>
      <ambientLight intensity={0.3} />
      <directionalLight position={[-10, 10, 0]} intensity={0.1} />
      <directionalLight castShadow position={[10, 100, 10]} intensity={0.1} />
      <directionalLight castShadow position={[100, 10, 0]} intensity={0.1} />
    </Fragment>
  );
};

function Model({ modelPath }) {
  const fbx = useFBX(modelPath);
  return <primitive object={fbx} dispose={null} />;
}

async function logXP(xp) {
  const { data } = await easyFetch('user/xp', { xp: 10 }, 'PUT');
  console.log(data);
  return data;
}

const Home = () => {
  const audioRef = useRef();
  const playerRef = useRef();

  const [playing, setPlaying] = useState(false);
  const { data } = useSWR('user/tutorial');

  useEffect(() => {
    audioRef.current.volume = 0.5;
    console.log(playerRef.current);
  }, []);

  function toggleMeditation() {
    if (!data) return;

    audioRef.current.pause();
    if (playing) {
      playerRef.current.pause();
      setPlaying(false);
    } else {
      playerRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className='home-main'>
      <Navbar />
      <Canvas
        colorManagement
        camera={{ position: [0, 1, 3], fov: 60 }}
        style={{ height: '100vh' }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 0, 1]} rotation={[0, (-1 * Math.PI) / 2, 0]}>
            <mesh
              scale={[0.002, 0.002, 0.002]}
              onClick={e => {
                e.stopPropagation();
                toggleMeditation();
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
      <audio ref={audioRef} src='/music/backsong.mp3' loop autoPlay />
      <audio ref={playerRef} src={`${API_URI}assets/audio/${data?.data}.mp3`} />
    </div>
  );
};

export default Home;
