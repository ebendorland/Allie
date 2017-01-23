import React from 'react';
import {Component} from 'react';
import timer from './Time.js'

export default class Message extends Component {

  generateClass() {
    if (this.props.message.from === "server") {

      return ("ally_message");
    }
    else {
      return ("user_message");
    }
  }


  render() {

    return(
      <div>
          <div className={this.props.message.from}></div>
          <div className="surrounding_div">
            <div className={this.generateClass()}>
              <div className="message">{this.props.message.message}</div>
                <div className="chaTime">{this.props.message.time}</div>

            </div>
          </div>
      </div>
    );
  }


}
