import React from "react";

function Rank({ rank, name }) {
  return (
    <div>
      <div className="white f3">{`${name} your rank is....`}</div>
      <div className="white f1">{rank}</div>
    </div>
  );
}

export default Rank;
