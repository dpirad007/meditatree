import React from 'react';

import Particle from '../../components/Particle/Particle';

import './Home.css';

const Home = () => {
  return (
    <div>
      <h1
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        Hello
      </h1>
      <Particle />
    </div>
  );
};

export default Home;
