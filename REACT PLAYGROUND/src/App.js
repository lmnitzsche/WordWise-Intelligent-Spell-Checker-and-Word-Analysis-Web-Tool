import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import InputSection from './components/InputSection';
import SuggestionsList from './components/SuggestionsList';
import Footer from './components/Footer';

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [dictionary, setDictionary] = useState([]);

  // Load dictionary from dictionary.txt file
  useEffect(() => {
    fetch('/dictionary.txt')
      .then((response) => response.text())
      .then((data) => {
        const words = data.split('\n').map((word) => word.trim().toLowerCase());
        setDictionary(words);
      })
      .catch((err) => console.error('Error loading dictionary:', err));
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkWord = () => {
    if (!userInput) return;

    const lowerInput = userInput.trim().toLowerCase();
    let newSuggestions = [];

    if (dictionary.includes(lowerInput)) {
      // Exact match in dictionary
      newSuggestions = [lowerInput];
    } else {
      // No exact match, get suggestions from dictionary
      newSuggestions = getSuggestions(lowerInput);
    }

    setSuggestions(newSuggestions);
  };

  const getSuggestions = (word) => {
    const distances = dictionary.map((dictWord) => {
      const penalty = calculateAlignmentPenalty(word, dictWord);
      return { word: dictWord, penalty };
    });

    distances.sort((a, b) => a.penalty - b.penalty);

    return distances.slice(0, 10).map((item) => item.word);
  };

  const calculateAlignmentPenalty = (a, b) => {
    // Use a simple Levenshtein Distance (edit distance) or similar approach
    const lenA = a.length;
    const lenB = b.length;
    const dp = Array(lenA + 1).fill().map(() => Array(lenB + 1).fill(0));

    for (let i = 0; i <= lenA; i++) dp[i][0] = i;
    for (let j = 0; j <= lenB; j++) dp[0][j] = j;

    for (let i = 1; i <= lenA; i++) {
      for (let j = 1; j <= lenB; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + cost,
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1
        );
      }
    }

    return dp[lenA][lenB];
  };

  return (
    <div className="App">
      <Header />
      <InputSection
        userInput={userInput}
        onInputChange={handleInputChange}
        onCheck={checkWord}
      />
      <SuggestionsList suggestions={suggestions} />
      <Footer />
    </div>
  );
}

export default App;
