import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/MainComponent';
    
function App() {
    return (
      <Router>
       <Main />
      </Router>
    );
}

export default App;