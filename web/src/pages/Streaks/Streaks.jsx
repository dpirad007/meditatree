import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

import useSWR from "swr";

import "./Streaks.css";

const Streaks = () => {
  const { data: sData } = useSWR("user/streak");
  const { data: xpData } = useSWR("user/xp");
  return (
    <div className="streaks-main">
      <Navbar />
      <div className="sb-streaks-main">
        <div className="ss-canv">
          {xpData && xpData.data ? (
            <Fragment>
              <ProgressBar val={xpData.data} total={100} type="streak" />
              {xpData.data} XP
            </Fragment>
          ) : null}
        </div>

        <div className="ss-text-main">
          {sData && sData.data ? (
            <Fragment>
              Streak
              <br />
              {sData.data} Days
            </Fragment>
          ) : (
            <Fragment>
              Streak
              <br />
              10 Days
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Streaks;
