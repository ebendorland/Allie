import React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';
import './index.css';
import {Router, Route, IndexRoute, Link, hashHistory,browserHistory} from 'react-router';

// import Input
// import Input from './Chat';

// import Home from './App';
// import Chat from './Chat';

import Home from './js/pages/Home';
// import Home from './js/pages/Home';
import Chat from './js/pages/Messaging' ;




class AppRouter extends Component{
  render()
  {
    return(
      <Router history={browserHistory}>
        <Route path={"home"} component={Home}></Route>
        <Route path={"chat"} component={Chat}></Route>
      </Router>
  );
  }
}


// class AppRouter extends Component{
//   render()
//   {
//     return(
//       <Router history={browserHistory}>
//         <Route path="home" component={Layout}>
//           <IndexRoute component={Home}></IndexRoute>
//           <Route path="chat" component={Chat}></Route>
//         </Route>
//
//       </Router>
//   );
//   }
// }

render(<AppRouter />, window.document.getElementById('root'));
