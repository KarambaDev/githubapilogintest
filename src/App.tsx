import React from 'react';
import './App.css';
import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import Search from './components/search'
import SearchResult from './components/searchResult'

function App() {
  return (
    <div className="App">
      <Search>
        <SearchResult />
      </Search>
    </div>
  );
}

export default App;

