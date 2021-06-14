import React from "react";
import './ColourList.css';
import ColourItem from '../ColourItem/ColourItem';

function ColourList({colours}) {
  return <div className="colour-list-container">
    <div className="list-headings">
      <h4> </h4>
      <h4>Name</h4>
      <h4>Hex</h4>
      <h4>RGB</h4>
      <h4>HSL</h4>
    </div>

    {colours.map((colour) => (<ColourItem key={colour.id} colour={colour} />))}
  </div>;
}

export default ColourList;
