import React from 'react';
import './Messaging.css';
import timer from './Time.js';
import {socket} from "./Input.js";

var DataList = React.createClass ({

  sendDataRequest(data_choice)
  {
    socket.emit("user_message",
      {
        message: this.props.account + " " + data_choice,
        from: "user",
        id: socket.id,
        time: timer.chaTime()
      }
    );
  },

  render()
  {
    return (
      <div id="deep-info">
        <h5>In Account: {this.props.account}</h5>
        <h6>Give Me:</h6>
        <ul>
          <li className="list-options" onClick={() => this.sendDataRequest("start unit balance")}><a>Start Unit Balance</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("start unit price")}><a>Start Unit Price</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("start market value")}><a>Start Market Value</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("start ratio")}><a>Start Ratio</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("total start market value")}><a>Total Start Market Value</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("start unallotted market value")}><a>Start Unallotted Market Value</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("total start market value incl unallotted")}><a>Total Start Market Value Incl Unallotted</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("end unit balance")}><a>End Unit Balance</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("end unit price")}><a>End Unit Price </a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("end market value")}><a>End Market Value</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("end ratio")}><a>End Ratio</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("total end market value")}><a>Total End Market Value</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("end unallotted market value")}><a>End Unallotted Market Value</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("total end market value incl unallotted")}><a>Total End Market Value Incl Unallotted</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("currency symbol")}><a>Currency Symbol</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("currency name")}><a>Currency Name</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("account number")}><a>Account number</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("start net market value")}><a>Start Net Market Value</a></li>
          <li className="list-options" onClick={() => this.sendDataRequest("end net market value")}><a>End Net Market Value</a></li>
        </ul>
      </div>
    );
  }
});

  export default DataList;
