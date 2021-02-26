import React, { Fragment } from "react";

import "./ProgressBar.css";

const PALETTE = {
  LOW: "#5b7cf9",
  MEDIUM: "#4a6bef",
  HIGH: "#4163e9",
  ABOVE: "#375be4",
};

const chooseColor = (value, total) => {
  const ratio = value / total;

  if (ratio < 0.3) return PALETTE.LOW;
  if (ratio < 0.6) return PALETTE.MEDIUM;
  if (ratio < 0.9) return PALETTE.HIGH;
  return PALETTE.ABOVE;
};

const ProgressBar = ({ type, value, total }) => {
  let finalBar;

  finalBar = (
    <div className="progress-bar-streaks">
      <div
        style={{
          backgroundColor: chooseColor(value, total),
          height: "100%",
          width: `${(value / total) * 100}%`,
          borderRadius: "5px",
        }}
      />
    </div>
  );

  return <Fragment>{finalBar}</Fragment>;
};

export default ProgressBar;
