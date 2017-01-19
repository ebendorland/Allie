import Header from '../components/Header';
import HomeInfo from '../components/HomeInfo';
import React, { Component } from 'react';

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
