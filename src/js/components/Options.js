import React from 'react';
import './Messaging.css';
import {socket} from "./Input.js";

var Options = React.createClass ({

  showFunds() {
    let message = {
      id: socket.id,
      message: "fund_list"
    };

    socket.emit("client-to-self", message);
  },

  render() {
    return(
      <div id="container">
        <div id="thumbs">
          <ul>
            <li className="list-options" onClick={this.showFunds}><a>Fund Info</a></li>
            <li className="list-options"><a href="https://www.allangray.co.za/what-we-offer/investing-with-us/" target="_blank">Product Info</a></li>
            <li className="list-options"><a href="https://www.google.co.za/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#safe=active&q=allan+gray+location&rflfq=1&rlha=0&rllag=-33922312,18416057,1727&tbm=lcl&tbs=lf_msr:-1,lf_od:-1,lf_oh:-1,lf_pqs:EAE,lf:1,lf_ui:2" target="_blank">Location</a></li>
            <li className="list-options"><a href="https://www.allangray.co.za/faq/#1" target="_blank">FAQ</a></li>
          </ul>
        </div>
      </div>
    )
  }
});

export default Options;
