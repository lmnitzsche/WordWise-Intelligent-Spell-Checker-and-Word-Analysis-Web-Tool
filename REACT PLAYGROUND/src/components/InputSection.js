import React from 'react';
import './InputSection.css';

const InputSection = ({ userInput, onInputChange, onCheck }) => {
  return (
    <div className="input-container">
      <h4 className="input-label">Enter Word: </h4>
      <input
        type="text"
        id="input-word"
        placeholder="Type a word"
        value={userInput}
        onChange={onInputChange}
      />
      <button onClick={onCheck} className="check-button">
        Check
      </button>
    </div>
  );
};

export default InputSection;
