import React, { Component } from 'react';
// import logo from './AG-Logo.png';
// import flag from './flag.png';
// import './App.css';
import Header from '../components/Header';
import {Link} from "react-router";
import Input from '../components/Input';
import Output from '../components/Output';
import '/home/hlnsib005/Documents/projects/Ally/src/App.css';



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











//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//
//               <div className="App-intro">
//                 <h1>ALLY IS NOT HERE FOR YOU.</h1>
//               </div>
//               <div className="buttons_box">
//                 <Link to="/chat">    <div className="start_button"> Ask Ally Something...</div></Link>
//               </div>
//
//       </div>
//     );
//   }
// }
//
// export default App;
