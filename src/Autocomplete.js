import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

const Autocomplete = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noMatches, setNoMatches] = useState(false);
  const inputEl = useRef(null);

  const fetch = (term) => {
    setIsLoading(true);
    fetchSuggestions(term)
      .then(
        (_suggestions) => {
          if (_suggestions.length > 0) {
            const showedSuggestions = _suggestions.slice(0, 10);
            setNoMatches(false);
            setIsLoading(false);
            setSuggestions(showedSuggestions);
          } else {
            setNoMatches(true);
            setIsLoading(false);
          }
        },
        (error) => {
          setIsLoading(false);
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
    if (event.keyCode === 13) { // User pressed the enter key
      if (searchTerm && !suggestions) {
        event.preventDefault();
      }
      if (event.target.dataset.id) {
        onSelect(event.target.dataset.id);
        setSearchTerm('');
        inputEl.current.focus();
      } else if (suggestions?.length) {
        onSelect(suggestions[0].id);
        setSearchTerm('');
        inputEl.current.focus();
      }
    }
  }, [onSelect, searchTerm, suggestions]);

  const handleChooseProduct = useCallback((event) => {
    const index = parseInt(event.target.dataset.index, 10);
    onSelect(suggestions[index].id);
    setSearchTerm('');
    inputEl.current.focus();
  }, [onSelect, suggestions]);

  return (
    <div className="search-container">
      <label htmlFor="search-box" className="visually-hidden">Search for a product or brand</label>
      <input
        ref={inputEl}
        id="search-box"
        type="search"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />

      {isLoading && !suggestions && <p className="search-message">Loading...</p>}
      {noMatches && <p className="search-message">No matches</p>}
      {fetchError && <p className="error-message">Something went wrong</p>}

      {suggestions?.length > 0 && !noMatches && (
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
