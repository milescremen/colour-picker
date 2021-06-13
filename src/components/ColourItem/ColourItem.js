import React from "react";
import "./ColourItem.css";

function ColourItem({colour}) {
  return (
    <div className="colour-item-container">
      <p>{colour.color}</p>
      <p>{colour.hex}</p>
      <p>{colour.rgb}</p>
      <p>{colour.hsl}</p>
    </div>
  );
}

export default ColourItem;
