import React from "react";
import Particles from "react-particles-js";

const Home = () => {
  return (
    <div>
      <Particles
        params={{
          particles: {
            number: {
              value: 400,
              density: {
                enable: true,
                value_area: 1000,
              },
            },
            color: {
              value: "#61dafb",
            },
            opacity: {
              value: 0.5,
              anim: {
                enable: true,
              },
            },
            size: {
              value: 7,
              random: true,
              anim: {
                enable: true,
                speed: 3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              speed: 0.2,
            },
          },
        }}
      />
    </div>
  );
};

export default Home;
