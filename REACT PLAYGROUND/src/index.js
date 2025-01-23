import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'; // Global styles
import Header from './components/Header'; // Header component
import InputSection from './components/InputSection'; // Input section component
import SuggestionsList from './components/SuggestionsList'; // Suggestions list component
import Footer from './components/Footer'; // Footer component

// The App component should be the main wrapper
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
