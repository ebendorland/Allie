import React from 'react';
import {Component} from 'react';
import MessageHistory from "./MessageHistory.js";

export default class Output extends Component{
  render(){
    return(
      <div className="row">
        <div className="col-xs-1">

        </div>
        <div className="Ally-replies col-xs-10" >
          <MessageHistory />
        </div>
        <div className="col-xs-1">

        </div>
      </div>
    )
  }
}
