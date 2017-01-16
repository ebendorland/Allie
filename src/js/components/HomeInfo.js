import React, { Component } from 'react';

// import '/home/hlnsib005/Documents/projects/Ally/src/App.css';import '././App.css';
import {Link} from "react-router"
import '/home/hlnsib005/Documents/projects/Ally/src/App.css';

export default class Home extends Component {
  render() {
    return (
      <div className="App">

              <div className="App-intro">
                <h1>ALLY IS HERE FOR YOU.</h1>
              </div>
              <div className="buttons_box">
                <Link to="/chat">    <div className="start_button"> Ask Ally Something...</div></Link>
              </div>

      </div>
    );
  }
}
