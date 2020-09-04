import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

const Autocomplete = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  const fetch = (term) => {
    fetchSuggestions(term)
      .then(
        (_suggestions) => {
          const showedSuggestions = _suggestions.slice(0, 10);
          setSuggestions(showedSuggestions);
        },
        (error) => {
          setFetchError(true);
        }
      )
  }
  const debouncedFetch = useCallback(debounce(fetch, 500), []);

  useEffect(() => {
    if (searchTerm) {
      if (fetchError) {
        setFetchError(false);
      }
      debouncedFetch(searchTerm);
    } else {
      setSuggestions(null);
    }
  }, [debouncedFetch, fetchError, searchTerm]);

  const handleOnChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, [setSearchTerm]);

  const handleOnKeyDown = useCallback((event) => {
    // User pressed the enter key
    if (event.keyCode === 13) {
      if (event.target.dataset.id) {
        onSelect(event.target.dataset.id);
      } else if (suggestions?.length) {
        onSelect(suggestions[0].id);
      }
      // setSearchTerm('');
    }
  }, [onSelect, searchTerm, suggestions]);

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
      {fetchError && <p style={{color: 'red'}}>Something went wrong</p>}

      {suggestions?.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => {

            return (
              <li
                data-index={index}
                key={suggestion.id}
              >
                <button
                  className="suggestion-button"
                  data-index={index}
                  data-id={suggestion.id}
                  onClick={handleChooseProduct}
                  onKeyDown={handleOnKeyDown}
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
