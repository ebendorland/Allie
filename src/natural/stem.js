'use strict'

var natural = require('natural'),
stemmer = natural.PorterStemmer;
// var stem = stemmer.stem('stems');
stemmer.attach();

function tokenizeAndStem(msg) {

  if (msg && /\S/.test(msg)){
    return (msg.tokenizeAndStem(true));
  }
  else {
    return (null);
  }
}
