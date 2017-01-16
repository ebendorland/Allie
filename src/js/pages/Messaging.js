import React, { Component } from 'react';
import Header from '../components/Header';
import {Link} from "react-router";
import Input from '../components/Input';
import Output from '../components/Output';
import ChatFrame from '../components/ChatFrame';


class Chat extends Component{
  render()
  {
    return(
      <div className="Chat">
        <Header/>
        <div className="wallpaper">
          <ChatFrame>
          </ChatFrame>

        </div>
      </div>
    )
  }
}

export default Chat;
