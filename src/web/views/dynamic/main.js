import React from 'react';
import ReactDOM from 'react-dom';

// Dynamic Components
import Graphs from './Home/Graphs.jsx';

module.exports = data => {
  // views/home.jsx
  const homeGraphsContainer = document.getElementById('home-graphs');
  ReactDOM.hydrate(<Graphs {...data} />, homeGraphsContainer);
};
