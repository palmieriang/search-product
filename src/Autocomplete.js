import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

const Autocomplete = ({ handleProductId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  useEffect(() => {
    if(searchTerm.length > 1) {
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

  const handleOnKeyDown = (event) => {
    // User pressed the enter key, update the input and close the suggestions
    if (event.keyCode === 13) {
      handleProductId(suggestions[activeSuggestion].id);
      setSearchTerm('');
      setActiveSuggestion(0);
    }
    // User pressed the up arrow, decrement the index
    else if (event.keyCode === 38 || (event.shiftKey && event.keyCode === 9)) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow or tab, increment the index
    else if (event.keyCode === 40 || event.keyCode === 9) {
      if (activeSuggestion + 1 === suggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const handleMouse = (event) => {
    const newIndex = parseInt(event.target.dataset.index, 10);
    setActiveSuggestion(newIndex);
  };

  const handleChooseProduct = (event) => {
    const index = parseInt(event.target.dataset.index, 10);
    handleProductId(suggestions[index].id);
    setSearchTerm('');
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => {
            let className;
            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li
                key={suggestion.id}
                className={className}
                data-index={index}
                onClick={handleChooseProduct}
                onMouseEnter={handleMouse}
              >
                {suggestion.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
