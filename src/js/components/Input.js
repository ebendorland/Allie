import React from 'react';
import './Messaging.css';
import ReactDOM from "react-dom";
import MessageHistory from "./MessageHistory.js";
import timer from './Time.js';
import Options from "./Options.js";
import mic from './microphone-black-shape.svg';

var io = require("socket.io-client");

var socket = io.connect("http://localhost:3001", {
  "force new connection": true,
  "reconnectionAttempts": "Infinity",
  "timeout": 1000,
  "transports": ["websocket"]
});

var Input = React.createClass ({

  getInitialState() {
    return( {inputValue: "", messages: []} );
  },

  componentDidMount() {
    socket.on("server_message", (msg) => {
      let message = {
        message: msg,
        from: "server",
        time: timer.chaTime()
      };

      if (message.message === "unknown")
      {
        let extra_message = {
          message: "Sorry, but I'm not sure what you're asking for. " +
            "Please choose one of the options below for more info :)",
          from: "server",
          time: timer.chaTime()
        };
        this.state.messages.push(extra_message);
        message.message = <Options />;
      }
      this.state.messages.push(message);
      var elem = <MessageHistory messages={this.state.messages} />;
      ReactDOM.render(elem, document.getElementById("message_box"));
    });
  },

  onSend() {
    // Call onKeyPress to make life simple
    let event = {
      key: "Enter"
    }
    this.onKeyPress(event);
  },

  onKeyPress(event) {
    if (event.key !== "Enter") {
      return;
    }

    if (!(/\S/.test(this.state.inputValue)))
    {
      return;
    }

    // Store user input in variable
    var msg = this.state.inputValue;

    // Compile message var to send then emit to server
    let message = {
      message: msg,
      from: "user",
      id: socket.id,
      time: timer.chaTime()
    };
    socket.emit("user_message", message);

    // Clear user input after emitting to socket
    this.setState( {inputValue: ""} );
    this.state.messages.push(message);
    var elem = <MessageHistory messages={this.state.messages} />;
    ReactDOM.render(elem, document.getElementById("message_box"));
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
          <div className="input-box">
                <input className=" Text-field"
                    placeholder="Type message..." id="usr_input"
                    type="text" value={this.state.inputValue}
                    onChange={this.handleChange} onKeyPress={this.onKeyPress}/>
                <button className="mic-button" onClick={this.onSend}><img src={mic}/></button>
          </div>
        </div>

      </div>
    )
  }
});

export default Input;
