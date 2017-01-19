var natural = require('natural');
var fStream = require("fs");
var request = require('request');
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var stemmer = natural.PorterStemmer;
var trainClassifier = require("./ClassifierTrainer.js");
stemmer.attach();
/*
  Read in the available responses the bot can give.
*/
var responsesJSON = fStream.readFileSync("src/datasets/responses.json");
responsesJSON = JSON.parse(responsesJSON);
/*
 trainerJSON is used to test the user input against the database to
 ensure that what the user said is indeed related to what the
 classifier categorised the user's message as.
*/
var trainerJSON = fStream.readFileSync("src/trainers/classifier.json");
trainerJSON = JSON.parse(trainerJSON);


trainClassifier.TrainClassifier();


/*
  Read in already trained classifier to be used when categorising
  the user's messages.
*/
var classifier = fStream.readFileSync("src/trainers/trainedClassifier.json");
classifier = JSON.parse(classifier);
classifier = natural.BayesClassifier.restore(classifier);
function  getClassifiedExample(trainerList, type) {
  for (var i = 0, len = trainerList.length; i < len; i++) {
    if (trainerList[i].type == type) {
      return (trainerList[i].example.tokenizeAndStem(true));
    }
  }
  return (null);
}
function  getSimilarityRatio(arr1, arr2)
{
  var simCount = 0;
  var similarity = 0;
  var len1 = arr1.length;
  var len2 = arr2.length;
  for (var i = 0; i < len1; i++) {
    for (var j = 0; j < len2; j++) {
      if (natural.JaroWinklerDistance(arr1[i], arr2[j]) > 0.8)  {
        simCount++;
        break;
      }
    }
  }
  if (len1 < len2) {
    similarity = simCount / len1;
  }
  else {
    similarity = simCount / len2;
  }
  return similarity;
}
module.exports = {
  processMessage: function(msg) {
    var msg_stem = msg.tokenizeAndStem(true);
    var classification = classifier.classify(msg_stem);
    console.log("Classified as: " + classification);
    for (var i = 0, len = responsesJSON.length; i < len; i++) {
      console.log("Checking response number: " + i);
      if (responsesJSON[i].type == classification) {
        var classified_example = getClassifiedExample(trainerJSON,
            responsesJSON[i].type);
        if (classified_example != null) {
          console.log("Found response at response[" + i + "]: " + classified_example);
          var similarity = getSimilarityRatio(msg_stem, classified_example);
          console.log("User message has similarity ratio of: " + similarity);
          if (similarity > 0.3) {
            if (classification == "greeting hello" || classification == "greeting" +
                " how are you" || classification == "greeting help me") {
              console.log("New message from server: " + responsesJSON[i].response);
              return (responsesJSON[i].response);
            }
          }
        }
        if (i == len - 1) {
              console.log("server_message", "Sorry, I don't quite " +
                  "get what you're talking about. Could you please be" +
                  " more specific?");
              return ("server_message", "Sorry, I don't quite " +
                  "get what you're talking about. Could you please be" +
                  " more specific?");
        }
      }
    }
    var mssg = classification;
    mssg = mssg.replace("[","");
    mssg = mssg.replace("]","");
    mssg = mssg.replace("'","");
    mssg = mssg.replace("'","");
    mssg = mssg.replace("'","");
    mssg = mssg.replace("'","");
    //console.log(mssg);
    var descr = mssg.split(",");
    console.log(descr[0]);
    console.log(descr[1]);
    //.classification = classification.replace("[","");
    //classification = classification.replace("]","");
    if(descr)
    {
    request({
        url:"http://localhost:3000/funds?fundReportingDescription="+descr[0],
        method:"GET",
        json:true,
      }, function (error,response,body,data)
         {
              if(error)
              {
                console.log("Error");
                return error;
              }
              else if(classifier.length != 1)
              {
                console.log(body[0][descr[1]]);
                io.on("connection", function(socket) {
                  socket.emit("server_message", body[0][descr[1]]);
                });
                return "hey";
               }
               else{
                 return "Hello to you too";
               }
           });
     }
  }
}
