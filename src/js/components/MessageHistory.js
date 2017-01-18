import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
import Message from "./Message.js";

export default class MessageHistory extends Component {
  render() {
    return(
      <div className="message_history" id="message_history">
        {
          this.props.messages.map(function(message, i) {
            return(
              <Message key={i} message={message}></Message>
            );
          })
        }
      </div>
    );
  }
}
