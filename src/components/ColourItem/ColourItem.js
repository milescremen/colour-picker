import React from "react";
import "./ColourItem.css";

function ColourItem({colour}) {
  return (
    <div className="colour-item-container">
      <p>{colour.color}</p>
      <p>{colour.hex}</p>
      <p>{colour.rgb.r}, {colour.rgb.g}, {colour.rgb.b}</p>
      <p>{colour.hsl.h}, {colour.hsl.s}, {colour.hsl.l}</p>
    </div>
  );
}

export default ColourItem;
