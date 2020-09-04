import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

const Autocomplete = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const fetch = (term) => {
    fetchSuggestions(term)
      .then((_suggestions) => {
        const showedSuggestions = _suggestions.slice(0, 10);
        setSuggestions(showedSuggestions);
      })
  }
  const debouncedFetch = useCallback(debounce(fetch, 500), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedFetch(searchTerm);
    } else {
      setSuggestions(null);
    }
  }, [debouncedFetch, searchTerm]);

  const handleOnChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, [setSearchTerm]);

  const handleOnKeyDown = useCallback((event) => {
    // User pressed the enter key, update the input and close the suggestions
    if (event.keyCode === 13) {
      if (event.target.dataset.id) {
        onSelect(event.target.dataset.id);
      } else if (suggestions) {
        onSelect(suggestions[activeSuggestion].id);
      }
      setSearchTerm('');
      setActiveSuggestion(0);
    }
    // User pressed the up arrow, decrement the index
    else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow, increment the index
    else if (event.keyCode === 40) {
      if (activeSuggestion + 1 === suggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  }, [activeSuggestion, onSelect, suggestions]);

  const handleOnMouseEnter = useCallback((event) => {
    const newIndex = parseInt(event.target.dataset.index, 10);
    setActiveSuggestion(newIndex);
  }, [setActiveSuggestion]);

  const handleChooseProduct = useCallback((event) => {
    const index = parseInt(event.target.dataset.index, 10);
    onSelect(suggestions[index].id);
    setSearchTerm('');
  }, [onSelect, suggestions]);

  return (
    <div className="search-container">
      <label htmlFor="search-box" className="visually-hidden">Search for a product or brand</label>
      <input
        id="search-box"
        type="search"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />

      {suggestions?.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => {
            let className;
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <li
                data-index={index}
                key={suggestion.id}
                className={className}
              >
                <button
                  className="suggestion-button"
                  data-index={index}
                  data-id={suggestion.id}
                  onClick={handleChooseProduct}
                  onKeyDown={handleOnKeyDown}
                  onMouseEnter={handleOnMouseEnter}
                  >
                  {suggestion.name}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}

Autocomplete.propTypes = {
  onSelect: PropTypes.func,
};

export default Autocomplete;
