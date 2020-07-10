import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      message: ""
    }
  }

  componentDidMount() {
    this.getMessage();
  }

  getMessage() {
    axios.get('https://silver-screen.herokuapp.com/')
        .then(res => {
          
        this.setState({message: res.data.message})
        })
        .catch(err => {
          console.error(err);
          this.setState({message: "There was an error fetching the message."});
        })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>{this.state.message}</p>
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
