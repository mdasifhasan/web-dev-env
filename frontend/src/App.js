import React from 'react';
import logo from './logo.svg';
import './App.css';
import SampleMsg from './components/SampleMsg'
import Counter from './components/Counter'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          simple-web-app
        </p>
        <SampleMsg/>
        <Counter/>
      </header>
    </div>
  );
}

export default App;
