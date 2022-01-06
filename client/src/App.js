import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Documentation from './Documentation';
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className="App">
        <header >
          Realizacja zadania nr1 w ramach laboratorium PFSwCO
          <h4>Wojciech Maj</h4>
          <h5>Menu:</h5>
          <Link to="/">Home</Link><br/>
          <Link to="/fib">Fibbonaci</Link><br/>
          <Link to="/doc">Documentation</Link><br/>
          <br/>
          <br/>
        </header>
        <div>
          <Route path="/fib" component={Fib} />
          <Route path="/doc" component={Documentation} />
        </div>
      </div>
    </Router>
  );
}

export default App;
