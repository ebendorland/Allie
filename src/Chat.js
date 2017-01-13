import React, { Component } from 'react';
import logo from './AG-Logo.png';
import flag from './flag.png';
import './chat.css';

class Chat extends Component {
  render() {
    return (


      <div className="App">

      <div className="Ally-replies"></div>

        <div className="Text-field">
                 <input type="text" id="usr_input"></input>
                 <input type="submit" id="send_button" onclick="return userSendMessage()"></input>
        </div>




      </div>
    );
  }
}

export default Chat;
