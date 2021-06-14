import React, { useState } from "react";
import './SearchInput.css';

function SearchInput({ searchData, isLoaded }) {
  const [text, setText] = useState('');
  const [message, setMessage] = useState("All Colors.");

  const search = (e) => {
    e.preventDefault();

    setText('');

    searchData(text);
    setMessage(`Results for "${text}".`)
  }

  return <div className="search-input-container">
	  <h1 className="title">Colour Searcher</h1>

    <form onSubmit={search} className="colour-input">
      <p>Colour</p>
      {isLoaded 
      ? <input type="text" placeholder="Enter Colour" value={text} onChange={(e) => {setText(e.target.value)}} /> 
      : <input type="text" placeholder="Enter Colour" value={text} onChange={(e) => {setText(e.target.value)}} disabled /> 
      }
      <button className="form-button"></button>
    </form> 

    <p className="result-message">{message}</p>
  </div>
}

export default SearchInput;
