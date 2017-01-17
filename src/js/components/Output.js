import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
import { Row, Col} from 'react-bootstrap';
export default class Output extends Component{

  render(){
    return(
      <div className="row">
        <div className="col-xs-1">

        </div>
        <div className="Ally-replies col-xs-10" >
          <div id="message_list"></div>
        </div>
        <div className="col-xs-1">

        </div>
      </div>
    )
  }
}
