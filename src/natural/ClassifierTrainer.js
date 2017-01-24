var natural = require("natural");
var stemmer = natural.PorterStemmer;

stemmer.attach();

var fStream = require("fs");

/*
  Prepare the fund name classifier.
*/
var fund_name_trainer = fStream.readFileSync("src/trainers/fund_name_trainer.json");
fund_name_trainer = JSON.parse(fund_name_trainer);
var fund_name_classifier = new natural.BayesClassifier();

/*
  Prepare the fund data classifier.
*/
var fund_data_trainer = fStream.readFileSync("src/trainers/fund_data_trainer.json");
fund_data_trainer = JSON.parse(fund_data_trainer);
var fund_data_classifier = new natural.BayesClassifier();

module.exports = {
  TrainClassifier: function()
  {
    /*
      Train and serialize fund name classifier.
    */
    for (var i = 0, len = fund_name_trainer.length; i < len; i++)
    {
      fund_name_classifier.addDocument(fund_name_trainer[i].example.tokenizeAndStem(true),
      fund_name_trainer[i].type);
    }
    fund_name_classifier.train();
    var fund_name_classifierJSON = JSON.stringify(fund_name_classifier);
    fStream.writeFileSync("src/natural/classifiers/fund_name_classifier.json", fund_name_classifierJSON);

    /*
      Train and serialize fund data classifier.
    */
    for (var i = 0, len = fund_data_trainer.length; i < len; i++)
    {
      fund_data_classifier.addDocument(fund_data_trainer[i].example.tokenizeAndStem(true),
      fund_data_trainer[i].type);
    }
    fund_data_classifier.train();
    var fund_data_classifierJSON = JSON.stringify(fund_data_classifier);
    fStream.writeFileSync("src/natural/classifiers/fund_data_classifier.json", fund_data_classifierJSON);
  }
}
/*
** User Input Promt ---------------------------
*/

/*
var fs      = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf8');

var util = require('util');

process.stdin.on('data', function (text)
{
  //console.log('received data:', util.inspect(text));

  console.log('received data:', text);
  if (text === 'quit\n' || text === 'q\n' || text === 'Q\n')
  {
    global.USR_input = text;
    console.log(global.USR_input);
    done();
  }

  var stem = global.USR_input.tokenizeAndStem(true);

 });

 function done()
 {
   console.log('Process Finished.');
   process.exit();
 }
 */

 /*
var stem = msg.tokenizeAndStem(true);
var classification = classifier.classify(stem);

 if (global.USR_input == classification)
 {
       console.log(responsesJSON[i].response);
       socket.emit("message", responsesJSON[i].response);
 }
*/


//<><><><><><><><><><><><><><><><><>
/*

var classification = classifier.classify(stem);

for (var i = 0, len = responsesJSON.length; i < len; i++) {
  if (responsesJSON[i].type == classification)
  {
        console.log(responsesJSON[i].response);
        socket.emit("message", responsesJSON[i].response);
        break;
//          }
 }*/



/*
1
//var app = require("express")();
//var http = require("http").Server(app);
//var io = require("socket.io")(http);

2
//var phonetic = natural.Metaphone;
//phonetic.attach();

3
//var responsesJSON = fStream.readFileSync("responses.json");

4
responsesJSON = JSON.parse(responsesJSON);


*/
