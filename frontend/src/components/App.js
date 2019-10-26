import React from 'react';
import logo from '../logo.svg';
import './App.css';
import BarChart from './BarChart';

class App extends React.Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <BarChart  
            data={this.state.data} 
            width={this.state.width} 
            height={this.state.height}
          />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
