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
      <div className="row">
          <div className="col-xs-1">

          </div>
          <div className="col-xs-10">
            <div className="row">
                  <input className="col-xs-10 Text-field" placeholder="Type message here" id="usr_input" type="text"/>
                  <input className="col-xs-1 send-button" type="submit" value="Send" id="send_button" onClick={this.userSendMessage}/>
            </div>
          </div>
        <div className="col-xs-1">

        </div>
      </div>
    )
  }
}
