import React from "react";
import "./SuggestionsList.css";

const SuggestionsList = ({ suggestions }) => (
  <div className="suggestions">
    <h2>Suggestions:</h2>
    <ul className="suggestions-list">
      {suggestions.length === 0 ? (
        <li>No suggestions yet...</li>
      ) : (
        suggestions.map((suggestion, index) => (
          <li key={index} className="suggestion-item">
            <span className="suggestion-text">{suggestion}</span>
            <div className="suggestion-links">
              <a href={`https://www.dictionary.com/browse/${suggestion}`} target="_blank" rel="noopener noreferrer">
                Dictionary
              </a>
              <span> | </span>
              <a href={`https://www.thesaurus.com/browse/${suggestion}`} target="_blank" rel="noopener noreferrer">
                Thesaurus
              </a>
              <span> | </span>
              <a href={`https://www.rhymezone.com/r/rhyme.cgi?Word=${suggestion}&typeofrhyme=perfect`} target="_blank" rel="noopener noreferrer">
                RhymeZone
              </a>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
);

export default SuggestionsList;
