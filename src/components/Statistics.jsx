import React from "react";
import PercentRectangle from "./PercentRectangle";

const Statistics = ({text, percent}) => {
  return (
    <div className="statistics">
      <h3>{text}</h3>
      <PercentRectangle percent={percent} />
    </div>
  );
};

export default Statistics;
