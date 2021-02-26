import React, { Fragment } from "react";

import "./ProgressBar.css";

const PALETTE = {
  LOW: "#5b7cf9",
  MEDIUM: "#4a6bef",
  HIGH: "#4163e9",
  ABOVE: "#375be4",
};

const STREAK = {
  LOW: "#34e65b",
  MEDIUM: "#2be654",
  HIGH: "#20e64b",
  ABOVE: "#15e642",
};

const chooseColor = (value, total, type) => {
  if (type) {
    const ratio = value / total;

    if (ratio < 0.3) return STREAK.LOW;
    if (ratio < 0.6) return STREAK.MEDIUM;
    if (ratio < 0.9) return STREAK.HIGH;
    return STREAK.ABOVE;
  } else {
    const ratio = value / total;

    if (ratio < 0.3) return PALETTE.LOW;
    if (ratio < 0.6) return PALETTE.MEDIUM;
    if (ratio < 0.9) return PALETTE.HIGH;
    return PALETTE.ABOVE;
  }
};

const ProgressBar = ({ type, value, total }) => {
  let finalBar;
  if (type === "streak") {
    finalBar = (
      <div className="progress-bar-streaks">
        <div
          style={{
            backgroundColor: chooseColor(value, total, type),
            height: "100%",
            width: `${(value / total) * 100}%`,
            borderRadius: "5px",
          }}
        />
      </div>
    );
  } else {
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
  }

  return <Fragment>{finalBar}</Fragment>;
};

export default ProgressBar;
