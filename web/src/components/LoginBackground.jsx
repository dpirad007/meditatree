import React, { Suspense } from 'react';

import { Canvas } from 'react-three-fiber';
import { OrbitControls, useFBX } from '@react-three/drei';

import { PUBLIC } from '../utils/constants';

function Model({ modelPath }) {
  const fbx = useFBX(modelPath);
  return <primitive object={fbx} dispose={null} />;
}

const LoginBackground = () => (
  <Canvas
    shadowMap
    colorManagement
    camera={{ position: [3, 3, 3], fov: 65 }}
    style={{ height: '100vh' }}
  >
    <ambientLight intensity={0.2} />
    <directionalLight castShadow position={[5, 2, 8]} intensity={0.2} />
    <Suspense fallback={null}>
      <group
        position={[0, 0, 0]}
        onClick={e => {
          console.log(e);
        }}
      >
        <mesh
          position={[0, 0, 0]}
          scale={[0.001, 0.001, 0.001]}
          castShadow
          receiveShadow
        >
          <Model modelPath={`${PUBLIC}/models/forest.fbx`} />
        </mesh>
      </group>
    </Suspense>
    <OrbitControls autoRotate />
  </Canvas>
);

export default LoginBackground;
