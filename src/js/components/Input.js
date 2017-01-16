import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
import './Messaging.css';

export default class Input extends Component {
  render()
  {
    return(
        <div className="Text-field">
          <input type="text" id="usr_input"></input>
          <input type="submit" id="send_button" onclick="return userSendMessage()"></input>
      </div>
    )
  }
}
