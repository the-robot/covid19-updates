import React from 'react';
import ReactDOM from 'react-dom';

// Dynamic Components
import CasesTable from './Home/CasesTable.jsx';
import Graphs from './Home/Graphs.jsx';

module.exports = data => {
  // views/home.jsx
  const homeGraphsContainer = document.getElementById('home-graphs');
  const homeTablesContainer = document.getElementById('home-cases-tables');
  ReactDOM.hydrate(<Graphs {...data} />, homeGraphsContainer);
  ReactDOM.hydrate(<CasesTable {...data} />, homeTablesContainer);
};
