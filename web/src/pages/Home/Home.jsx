import React from "react";

import backsong from "../../music/backsong.mp3";

import Particle from "../../components/Particle/Particle";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        Hello
      </h1>
      <Particle />
      <embed src={backsong} loop={true} autostart={true} hidden={true} />
    </div>
  );
};

export default Home;
