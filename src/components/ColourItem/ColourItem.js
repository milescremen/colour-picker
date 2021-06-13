import React from "react";
import "./ColourItem.css";

function ColourItem({colour}) {
  return (
    <div className="colour-item-container">
      <p>{colour.color}</p>
      <p>#acc2d9</p>
      <p>172, 194, 217</p>
      <p>211, 37, 76</p>
    </div>
  );
}

export default ColourItem;
