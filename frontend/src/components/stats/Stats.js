import React from "react";
import "./Stats.css";
function Stats({ title, usage, free, total }) {
  return (
    <div className="stats">
      <h2>{title}</h2>
      <div className="stats__usage">
        <h1>{usage}</h1>
        <p>used</p>
      </div>
      <div className="stats__more">
        <p className="stats__more--data">
          Free: <span>{free}</span>
        </p>
        <p className="stats__more--data">
          Total: <span>{total}</span>
        </p>
      </div>
    </div>
  );
}

export default Stats;
