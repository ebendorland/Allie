import React, { Component } from 'react';
import Header from '../components/Header';
import {Link} from "react-router";
import Input from '../components/Input';
import Output from '../components/Output';


class Chat extends Component{
  render()
  {
    return(
      <div className="Chat">
        <Header/>
        <Output/>
        <Input/>
      </div>
    )
  }
}

export default Chat;
