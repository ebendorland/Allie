import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
import './Messaging.css';
import person from './person.png';
import Output from './Output.js';
import Input from './Input.js';

import { Row, Col} from 'react-bootstrap';

export default class ChatFrame extends Component {
  render()
  {
    return(
        <div className="ChatBox">
          <div className="row">
              <div className="col-xs-12">
                  <div className="row">
                  <div className="row">
                      <div className="col-xs-3">
                      </div>
                      <div className="col-xs-6 ally-logo">
                          <img className="" src={person}/>
                      </div>
                      <div className="col-xs-3">
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-xs-2">
                      </div>
                      <div className="col-xs-8">
                          <h1>Ask Ally Something...</h1>
                      </div>
                      <div className="col-xs-2">
                      </div>
                  </div>
                  <div>
                    <Output/>
                    <Input/>
                  </div>
                  </div>
              </div>
          </div>
        </div>
    )
  }
}
