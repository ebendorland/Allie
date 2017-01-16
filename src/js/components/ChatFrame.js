import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
import './Messaging.css';
import person from './person.png';
import Output from './Output.js';
import Input from './Input.js';

export default class ChatFrame extends Component {
  render()
  {
    return(
        <div className="ChatBox">
          <div className="AllyBot_Logo">
            <img src={person}/>
            <div>
              <h1>Ask Ally Something...</h1>
              </div>
          </div>
          <div>
          <Output/>
          <Input/>

        </div>
        </div>
    )
  }
}
