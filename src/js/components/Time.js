//import React from 'react';
//import {Component} from 'react';
//import '/message.css';

module.exports = {
  chaTime: function(){
  var d = new Date();
  // var numDay = d.getDate();
  // var numMonth = ('0' + (d.getMonth() + 1)).slice(-2);
  // var numYear = d.getFullYear();
  var numHours = ('0' + (d.getHours())).slice(-2);
  var numMins = ('0' + (d.getMinutes())).slice(-2);

  // var timestamp = chaTime.insertAdjacentHTML('afterbegin', numYear + '-' + numMonth + '-' + numDay + 'T' + numHours + ':' + numMins);
   return (numHours+":"+numMins);
  }
}
