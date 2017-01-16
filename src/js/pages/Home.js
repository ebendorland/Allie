// import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import Header from '../components/Header';
import HomeInfo from '../components/HomeInfo';
import React, { Component } from 'react';
// import './App.css';
import {Link} from "react-router"
import '/home/hlnsib005/Documents/projects/Ally/src/App.css';


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
