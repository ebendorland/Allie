import React, { Component } from 'react';
import logo from './AG-Logo.png';
import './App.css';
import {Link} from "react-router"

class App extends Component {
  render() {
    return (
      <div className="App">

      <div className="navigation_bar">
      <ul>
          <li>SOUTH AFRICA</li>
          <li>CAREERS</li>
          <li>INSTITUTIONAL INVESTORS</li>
          <li>FINANCIAL ADVISORS</li>
          <li>EXISTING CLIENTS</li>
          <li>NEW CLIENTS</li>
      </ul>

      </div>
        <div className="App-header">

        <div className="navigation_bar_two">

          <ul>
          <li><img src={logo} className="App-logo" alt="logo" /></li>
            <li className="nav_individual">WHAT WE OFFER</li>
            <li className="nav_individual">NEWS & INSIGHTS</li>
            <li className="about_button">ABOUT US</li>

            <li> <div className="log_in"> LOG IN</div></li>
            <li> <div className="invest_now"> INVEST NOW</div></li>
            <li> </li>
          </ul>

        </div>




        </div>
          <div className="App-intro">
            <h1>ALLY IS HERE FOR YOU.</h1>
          </div>
          <div className="buttons_box">
                  <Link to="/chat">    <div className="start_button"> Ask Ally Something...</div></Link>
          </div>

      </div>
    );
  }
}

export default App;
