import React from 'react';
// import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Component} from 'react';
import './Messaging.css';

export default class Input extends Component {
  userSendMessage() {
    window.userSendMessage();
  }

  render()
  {
    return(
      <div className="Text-field">
        <input type="text" id="usr_input"></input>
        <input type="submit" id="send_button" onClick={this.userSendMessage}></input>
      </div>
    )
  }
}
