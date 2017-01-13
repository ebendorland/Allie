import React, { Component } from 'react';
import logo from './AG-Logo.png';
import flag from './flag.png';
import './App.css';
import {Link} from "react-router"

class App extends Component {
  render() {
    return (
      <div className="App">

              <div className="App-intro">
                <h1>ALLY IS HERE FOR YOU.</h1>
              </div>
              <div className="buttons_box">
                <Link to="/chat">    <div className="start_button"> Ask Ally Something...</div></Link>
              </div>

      </div>
    );
  }
}

export default App;
