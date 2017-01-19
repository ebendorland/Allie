import React from 'react';
import {Component} from 'react';
import './Home.css';
import {Link} from 'react-router';

export default class Header extends Component{

render()
{
  return(

    <div>

        <div className="navigation_bar">
        </div>

        <div className="App-header">
          <ul className="newnav">
              <Link to="/"><li className="firstitem"><img src="https://www.allangray.co.za/static/images/AG-Logo.png" class="App-logo" alt="logo" /></li></Link>
              <li><a >WHAT WE OFFER</a></li>
              <li><a>NEWS & INSIGHTS</a></li>
              <li><a>ABOUT US</a></li>
              <li className="right lastitem"> <div className="invest_now"> INVEST NOW</div></li>
              <li className="right"> <div className="log_in"> LOG IN</div></li>
          </ul>
        </div>
    </div>
)
}}
