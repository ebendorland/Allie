import React, { Component } from 'react';
import logo from './AG-Logo.png';
import './chat.css';

class Chat extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

          <div className="App-intro">
            <h1>WELCOME TO ALLY BOT</h1>
          </div>


      </div>
    );
  }
}

export default Chat;
