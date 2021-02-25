import React, { Fragment, Suspense } from 'react';

import { Canvas } from 'react-three-fiber';
import { useFBX, OrbitControls, Loader } from '@react-three/drei';

import Navbar from '../../components/Navbar/Navbar';

import './Home.css';

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
  // import useSWR from 'swr';
  // import easyFetch from '../../utils/easyFetch';
  // const { data } = useSWR('user/streak');
  // console.log(data);

  // useEffect(() => {
  //   (async () => {
  //     const { data, error } = await easyFetch('user/xp', { xp: 10 }, 'PUT');
  //     console.log(data);
  //   })();
  // }, []);

  return (
    <div className='home-main'>
      <Navbar />
      <Canvas
        colorManagement
        camera={{ position: [3, 3, 3], fov: 65 }}
        style={{ height: '100vh' }}
      >
        <Lights />
        <Suspense fallback={null}>
          <group position={[0, 250, 0]}>
            <mesh
              scale={[0.001, 0.001, 0.001]}
              onClick={e => {
                e.stopPropagation();
                console.log('yolo');
              }}
              position={[0, -250, 0]}
            >
              <Model modelPath='/main_level.fbx' />
            </mesh>
          </group>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          mixPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
      <Loader />
    </div>
  );
};

export default Home;
