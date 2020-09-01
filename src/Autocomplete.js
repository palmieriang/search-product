import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

const Autocomplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if(searchTerm) {
      fetchSuggestions(searchTerm).then((_suggestions) => {
        const showedSuggestions = _suggestions.slice(0, 10);
        setSuggestions(showedSuggestions);
      });
    } else {
      setSuggestions('');
    }
  }, [searchTerm]);

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={handleOnChange}
      />

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li key={suggestion.id}> {suggestion.name} </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
