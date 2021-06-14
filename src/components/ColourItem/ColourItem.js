import React, {useEffect} from "react";
import "./ColourItem.css";

function ColourItem({colour}) {

  return (
    <div className="colour-item-container">
      <svg viewBox="0 0 220 100">
        <rect fill={colour.hex} width="100" height="100" />
      </svg>

      <p>{colour.color}</p>
      <p>{colour.hex}</p>
      <p>{colour.rgb[0]}, {colour.rgb[1]}, {colour.rgb[2]}</p>
      <p>{colour.hsl[0]}, {Math.floor(colour.hsl[1])}, {Math.floor(colour.hsl[2])}</p>
    </div>
  );
}

export default ColourItem;
