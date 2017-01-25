import React from 'react';
import './Messaging.css';
import {socket} from "./Input.js";

var FundList = React.createClass ({

  showDataChoices(account_name) {
    let message = {
      id: socket.id,
      message: "data_list",
      account_choice: account_name
    };

    socket.emit("client-to-self", message);
  },

  render()
  {
    return (
      <div id="extra-info">
        <h5>Get Fund Info For:</h5>
        <ul>
          <li className="list-options" onClick={() => this.showDataChoices("Allan Gray Equity Fund")}><a>Allan Gray Equity Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Cadiz Mastermind Fund")}><a>Cadiz Mastermind Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Investec Value Fund")}><a>Investec Value Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Old Mutual Top 40 Fund")}><a>Old Mutual Top 40 Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Old Mutual Industrial Fund")}><a>Old Mutual Industrial Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Sanlam Investment Management Resources Fund")}><a>Sanlam Investment Management Resources Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Oasis Crescent Equity Fund")}><a>Oasis Crescent Equity Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Sygnia Value Fund")}><a>Sygnia Value Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Momentum Multifocus Fund of Funds")}><a>Momentum Multifocus Fund of Funds</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Grindrod Equity Income Growth Fund")}><a>Grindrod Equity Income Growth Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Counterpoint MET Value Fund")}><a>Counterpoint MET Value Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Coronation Top 20 Fund")}><a>Coronation Top 20 Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Absa Smart Alpha Equity Fund")}><a>Absa Smart Alpha Equity Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Nedgroup Inv Rainmaker Fund")}><a>Nedgroup Inv Rainmaker Fund</a></li>
          <li className="list-options" onClick={() => this.showDataChoices("Sanlam Investment Management Value Fund")}><a>Sanlam Investment Management Value Fund</a></li>
        </ul>
      </div>
    );
  }
});

  export default FundList;
