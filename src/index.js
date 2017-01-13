import React from 'react';
// import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Component} from 'react';
import './index.css';
import {Router, Route, Link, browserHistory} from 'react-router'

import Home from './App';
import Chat from './Chat';

class AppRouter extends Component{
  render()
  {
    return(
      <Router history={browserHistory}>
        <Route path="home" component={Home}/>

        <Route path="chat" component={Chat}/>
      </Router>
  );
  }
}

render(<AppRouter />, window.document.getElementById('root'));
