import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { SearchIcon, XIcon } from '@heroicons/react/solid';

function SearchBar({ onSearch, onClear }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue) {
      debouncedFetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const debouncedFetchSuggestions = debounce(async (searchWord) => {
    try {
      const response = await axios.get(`https://api.datamuse.com/sug?s=${searchWord}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  }, 300);

  const handleSearch = (word) => {
    setInputValue(word);
    onSearch(word);
    clearSuggestions();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue('');
    clearSuggestions();
    onClear(); // Notify parent component to clear results
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-full p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12 pr-12 shadow-md transition-transform transform hover:scale-105"
          placeholder="Search for a word..."
        />
        <SearchIcon className="h-6 w-6 text-gray-500 absolute top-1/2 transform -translate-y-1/2 left-3" />
        {inputValue && (
          <XIcon
            onClick={clearInput}
            className="h-6 w-6 text-gray-500 absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
          />
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSearch(suggestion.word)}
              className="cursor-pointer p-4 hover:bg-gray-100 transition-colors"
            >
              {suggestion.word}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => handleSearch(inputValue)}
        className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-full shadow-md w-full transform transition-transform hover:scale-105"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
