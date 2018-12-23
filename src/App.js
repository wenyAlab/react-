import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import './config'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }
  componentDidMount(){
    axios.get('/data').then(res => {
      if(res.status === 200) {
        this.setState({
          data: res.data,
        })
      }
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.data && this.state.data.user}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
