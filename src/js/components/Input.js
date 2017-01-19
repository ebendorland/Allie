import React from 'react';
import './Messaging.css';
import Message from "./Message.js";
import ReactDOM from "react-dom";

var io = require("socket.io-client");
var socket = io.connect("http://localhost:3001", {
  "force new connection": true,
  "reconnectionAttempts": "Infinity",
  "timeout": 1000,
  "transports": ["websocket"]
});
socket.on("server_message", function(msg) {
  let message = {
    message: msg,
    from: "server"
  };

  var elem = <Message message={message} />;
  ReactDOM.render(elem, document.getElementById("message_list"));
});

var Input = React.createClass ({
  getInitialState() {
    return( {inputValue: ""} );
  },
  /*onSend() {
    // Create socket and connect to socket, then emit user message
    var socket = io.connect("http://localhost:3001", {
      "force new connection": true,
      "reconnectionAttempts": "Infinity",
      "timeout": 1000,
      "transports": ["websocket"]
    });
    socket.emit("user_message", this.state.inputValue);

    // Clear user input after emitting to socket
    this.setState( {inputValue: ""} );
  },*/

  onKeyPress(event) {
    if (event.key !== "Enter") {
      return;
    }

    // Store user input in variable
    var msg = this.state.inputValue;

    // Compile message var to send then emit to server
    let message = {
      message: msg,
      from: "user",
      id: socket.id
    };
    socket.emit("user_message", message);

    // Clear user input after emitting to socket
    this.setState( {inputValue: ""} );
    var elem = <Message message={message} />;
    ReactDOM.render(elem, document.getElementById("message_list"));
  },

  handleChange(event) {
    this.setState( {inputValue: event.target.value} );
  },

  render()
  {
    return(
      <div className="row">
        <div className="col-xs-1"></div>
        <div className="col-xs-10">
          <div className="row">
                <input className="col-xs-10 Text-field"
                    placeholder="Type message..." id="usr_input"
                    type="text" value={this.state.inputValue}
                    onChange={this.handleChange} onKeyPress={this.onKeyPress}/>
                <input className="col-xs-1 send-button" type="submit"
                    value="Send" id="send_button" onClick={this.onSend}/>
          </div>
        </div>
        <div className="col-xs-1"></div>
      </div>
    )
  }
});

export default Input;
