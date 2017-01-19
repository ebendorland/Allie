import React, { Component } from 'react';
import Header from '../components/Header';
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
