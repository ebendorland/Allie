import React from 'react';
import {Component} from 'react';
import './Home.css';
import {Link} from 'react-router';
import menu from './menu.png';
import { Button,MenuItem,DropdownButton, ButtonToolbar,Glyphicon,Dropdown } from 'react-bootstrap';

export default class Header extends Component{

myFunction()
{

}


render()
{
  return(
<div>
    <div>

        <div className="navigation_bar">
        </div>

        <div className="App-header">
          <ul className="newnav">
              <Link to="/"><li className="firstitem"><img src="https://www.allangray.co.za/static/images/AG-Logo.png" className="App-logo" alt="logo" /></li></Link>
              <li><a >WHAT WE OFFER</a></li>
              <li><a>NEWS & INSIGHTS</a></li>
              <li><a>ABOUT US</a></li>
              <li className="right lastitem"> <div className="invest_now"> INVEST NOW</div></li>
              <li className="right"> <div className="log_in"> LOG IN</div></li>
          </ul>

            <div>
                    <ButtonToolbar>
                        <Dropdown id="dropdown-custom-1">
                          <Dropdown.Toggle>
                            <Glyphicon glyph="menu-hamburger"/>
                          </Dropdown.Toggle>
                          <Dropdown.Menu >
                            <MenuItem><li><a>WHAT WE OFFER</a></li></MenuItem>
                            <MenuItem><li><a>NEWS & INSIGHTS</a></li></MenuItem>
                            <MenuItem><li><a>ABOUT US</a></li></MenuItem>
                            <MenuItem divider />
                            <MenuItem><div className="log_in"> LOG IN</div></MenuItem>
                            <MenuItem><div className="invest_now"> INVEST NOW</div></MenuItem>
                          </Dropdown.Menu>
                        </Dropdown>
                    </ButtonToolbar>
</div>


        </div>
    </div>



  </div>


)
}}
