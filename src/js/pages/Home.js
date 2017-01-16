import {render} from 'react-dom';
import Header from '../components/Header';
import HomeInfo from '../components/HomeInfo';
import React, { Component } from 'react';
import {Link} from "react-router";

// import {NavHeader} from '@agct/react-common/src/components/NavHeader/NavHeader';
// import NavHeaderItem from '@agct/react-common/src/components/NavHeader/NavHeaderItem';

export default class Home extends Component{
  render()
  {
    return(
      <div>
      <Header/>
        <HomeInfo/>
      </div>
    )
  }
}
