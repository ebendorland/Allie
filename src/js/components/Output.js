import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';

export default class Output extends Component{

  render(){
    return(
        <div className="Ally-replies">
          <div id="message_list"></div>
        </div>
    )
  }
}
