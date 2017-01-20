import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
//import './options.css';

var Options = React.createClass ({
  render() {
    return(
        <div id="hide" id="container">
           <div id="thumbs">

             <ul id="container">
                <li className="list-options"><a>Fund info</a></li>
                <li className="list-options"><a>Product Info</a></li>
                <li className="list-options"><a>Location</a></li>
                <li className="list-options"><a>FAQ</a></li>
             </ul>
           </div>
      </div>
    )
  }
});

export default Options;
