import React from 'react';
import './Messaging.css';
import timer from './Time.js';
import {socket} from "./Input.js";

var Options = React.createClass ({

  getInitialState() {
    return ({
      account: ""
    });
  },

  showFunds() {
     document.getElementById("extra-info").style.display = "inline-block";
  },

  showDataChoices(account_name) {
    document.getElementById("deep-info").style.display = "inline-block";
    document.getElementById("extra-info").style.display = "none";
    this.setState({
      account: account_name
    });
  },

  sendDataRequest(data_choice) {
    document.getElementById("deep-info").style.display = "none";

    // Compile message var to send then emit to server
    let message = {
      message: this.state.account + " " + data_choice,
      from: "user",
      id: socket.id,
      time: timer.chaTime()
    };

    socket.emit("user_message",
      {
        message: this.state.account + " " + data_choice,
        from: "user",
        id: socket.id,
        time: timer.chaTime()
      }
    );

    this.setState({
      account: ""
    });
  },

  render() {
    return(
      <div id="hide" id="container">
        <div id="thumbs">
          <ul>
            <li className="list-options" onClick={this.showFunds}><a>Fund Info</a></li>
            <li className="list-options"><a href="https://www.allangray.co.za/what-we-offer/investing-with-us/" target="_blank">Product Info</a></li>
            <li className="list-options"><a href="https://www.google.co.za/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#safe=active&q=allan+gray+location&rflfq=1&rlha=0&rllag=-33922312,18416057,1727&tbm=lcl&tbs=lf_msr:-1,lf_od:-1,lf_oh:-1,lf_pqs:EAE,lf:1,lf_ui:2" target="_blank">Location</a></li>
            <li className="list-options"><a href="https://www.allangray.co.za/faq/#1" target="_blank">FAQ</a></li>
          </ul>
        </div>

        <div id="extra-info">
          <h5>Get Fund Info For:</h5>
          <ul>
            <li className="list-options" onClick={() => this.showDataChoices("allan gray")}><a>Allan Gray Equity Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("cadiz mastermind")}><a>Cadiz Mastermind Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("investec value")}><a>Investec Value Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("old mutual top 40")}><a>Old Mutual Top 40 Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("old mutual industrial")}><a>Old Mutual Industrial Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("sanlam investment management resources")}><a>Sanlam Investment Management Resources Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("oasis crescent equity")}><a>Oasis Crescent Equity Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("sygnia value")}><a>Sygnia Value Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("momentum multifocus")}><a>Momentum Multifocus Fund of Funds</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("grindrod equity income")}><a>Grindrod Equity Income Growth Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("counterpoint met value")}><a>Counterpoint MET Value Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("coronation top 20")}><a>Coronation Top 20 Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("absa smart alpha")}><a>Absa Smart Alpha Equity Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("nedgroup inv rainmaker")}><a>Nedgroup Inv Rainmaker Fund</a></li>
            <li className="list-options" onClick={() => this.showDataChoices("sanlam investment management value")}><a>Sanlam Investment Management Value Fund</a></li>
          </ul>
        </div>

        <div id="deep-info">
          <h5>Give Me:</h5>
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
      </div>
    )
  }
});

export default Options;
