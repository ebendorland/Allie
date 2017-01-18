import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';

export default class Message extends Component {
  generateClass() {
    if (this.props.message.from == "server") {
      return ("ally_message");
    }
    else {
      return ("user_message");
    }
  }

  render() {
    return(
        <div className={this.generateClass()}>
          <div className="message">{this.props.message.message}</div>
        </div>
    );
  }
}
