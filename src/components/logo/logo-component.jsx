import React from "react";
import "./logo-styles.css";
import brain from "./brain.jpg";

import Tilt from "react-parallax-tilt";

const Logo = () => {
  return (
    <div className="logo-container">
      <Tilt className="tilt-wrapper">
        <img alt="brain logo" src={brain} className="tilt-image" />
      </Tilt>
    </div>
  );
};

export default Logo;
