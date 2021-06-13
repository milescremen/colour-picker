import React, { useState } from "react";
import './SearchInput.css';

function SearchInput({ searchData}) {
  const [text, setText] = useState('');

  const search = (e) => {
    e.preventDefault();

    setText('');

    searchData(text);

  }

  return <div className="search-input-container">
	  <h1 className="title">Colour Searcher</h1>

    <form onSubmit={search} className="colour-input">
      <p>Colour</p>
      <input type="text" placeholder="Enter Colour" value={text} onChange={(e) => {setText(e.target.value)}} /> 
      <button className="form-button"></button>
    </form> 
  </div>
}

export default SearchInput;
