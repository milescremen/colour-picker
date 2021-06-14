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
      <p>{colour.rgb}</p>
      <p>{colour.hsl}</p>
    </div>
  );
}

export default ColourItem;
