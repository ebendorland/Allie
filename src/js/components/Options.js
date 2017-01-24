import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
import './Messaging.css';
import ReactDOM from "react-dom";
import MessageHistory from "./MessageHistory.js";

var Options = React.createClass ({

   fundClick() {
   document.getElementById("extra-info").style.display = "inline-block";
 }, giveMeClick() {
   document.getElementById("deepInfo").style.display = "inline-block";
 },

  render() {
    return(
        <div id="hide" id="container">
           <div id="thumbs">
              <li className="list-options"><a onClick={this.fundClick}>Fund Info</a></li>
              <li className="list-options"><a href="https://www.allangray.co.za/what-we-offer/investing-with-us/">Product Info</a></li>
              <li className="list-options"><a href="https://www.google.co.za/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#safe=active&q=allan+gray+location&rflfq=1&rlha=0&rllag=-33922312,18416057,1727&tbm=lcl&tbs=lf_msr:-1,lf_od:-1,lf_oh:-1,lf_pqs:EAE,lf:1,lf_ui:2">Location</a></li>
              <li className="list-options"><a href="https://www.allangray.co.za/faq/#1">FAQ</a></li>
           </div>


            <div id="extra-info">
              <h4>Get Fund Info For:</h4>

              <ul>
                                   <li onClick={this.giveMeClick}>Allan Gray Equity Fund</li>
                                    <li onClick={this.giveMeClick}>Cadiz Mastermind Fund</li>
                                    <li onClick={this.giveMeClick}>Investec Value Fund</li>
                                    <li onClick={this.giveMeClick}>Old Mutual Top 40 Fund</li>
                                    <li onClick={this.giveMeClick}>Old Mutual Industrial Fund</li>
                                    <li onClick={this.giveMeClick}>Sanlam Investment Management Resources Fund</li>
                                    <li onClick={this.giveMeClick}>Oasis Crescent Equity Fund</li>
                                    <li onClick={this.giveMeClick}>Sygnia Value Fund</li>
                                    <li onClick={this.giveMeClick}>Momentum Multifocus Fund of Funds</li>
                                    <li onClick={this.giveMeClick}>Grindrod Equity Income Growth Fund</li>
                                    <li onClick={this.giveMeClick}>Counterpoint MET Value Fund</li>
                                    <li onClick={this.giveMeClick}>Coronation Top 20 Fund</li>
                                    <li onClick={this.giveMeClick}>Absa Smart Alpha Equity Fund</li>
                                    <li onClick={this.giveMeClick}>Nedgroup Inv Rainmaker Fund</li>
                                    <li onClick={this.giveMeClick}>Sanlam Investment Management Value Fund</li>
                                  


              </ul>
              <div id="deepInfo">
              <h5>Give Me:</h5>
              <ul>
              <li>Start Unit Balance</li>
              <li>Start Unit Price</li> 
              <li>Start Market Value</li> 
              <li>Start Ratio</li> 
              <li>Total Start Market Value</li> 
              <li>Start Unallotted Market Value</li> 
              <li>Total Start Market Value Incl Unallotted</li> 
              <li>End Unit Balance</li> 
              <li>End Unit Price </li>
              <li>End Market Value</li>
              <li>End Ratio</li>
              <li>Total End Market Value</li>
              <li>End Unallotted Market Value</li>
              <li>Total End Market Value Incl Unallotted</li>
              <li>currency Symbol</li>
              <li>currency Name</li>
              <li>Account number</li>
              <li>Start Net Market Value</li>
              <li>End Net Market Value</li>
              </ul>
              </div>


            
            </div>
      </div>
    )
  }
});

export default Options;
