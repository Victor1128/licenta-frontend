import React from "react";

const PercentRectangle = ({ percent }) => {
  return (
    <div className="percentage">
      <p className="percent-text">{percent}%</p>
      <div className="rectangle-container">
        <div style={{ width: `${percent}%` }} className="rectangle"></div>
      </div>
    </div>
  );
};

export default PercentRectangle;
