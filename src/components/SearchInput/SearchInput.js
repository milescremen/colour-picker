import React from "react";
import './SearchInput.css';

function SearchInput() {
  return <div className="search-input-container">
	  <h1 className="title">Colour Searcher</h1>

    <form className="colour-input" action="submit">
      <p>Colour</p>
      <input type="text" placeholder="Enter Colour" /> 
    </form> 
  </div>
}

export default SearchInput;
