import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
import './index.css';
import {Router, Route, browserHistory} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Home from './js/pages/Home';
import Chat from './js/pages/Messaging';


class AppRouter extends Component{
  render()
  {
    return(
      <Router history={browserHistory}>
        <Route path={"/"} component={Home}></Route>
        <Route path={"chat"} component={Chat}></Route>
      </Router>
  );
  }
}

render(<AppRouter />, window.document.getElementById('root'));
