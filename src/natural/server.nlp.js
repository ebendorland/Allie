"use strict";

var natural = require('natural');
var fStream = require("fs");


var req = require('./serverCalls');
var sleep = require('sleep');



var stemmer = natural.PorterStemmer;
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

/*
  Read in already trained classifier to be used when categorising
  the user's messages.
*/
var classifier = fStream.readFileSync("src/trainers/trainedClassifier.json");
classifier = JSON.parse(classifier);

classifier = natural.LogisticRegressionClassifier.restore(classifier);

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
  v// To add to window
if (!window.Promise) {
  window.Promise = Promise;
} var similarity = 0;
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


        if (i == len - 1)
        {
            console.log("server_message", "Sorry, I don't quite " + "get what you're talking about. Could you please be" +" more specific?");
            return ("server_message", "Sorry, I don't quite " + "get what you're talking about. Could you please be" +" more specific?");
        }


      }
    }
    //return ("server_message", "Sorry, I don't quite " + "get what you're talking about. Could you please be" + " more specific???");
    if(httpRequests(msg)!="none")
    {
      var answer=httpRequests(msg);


      return httpRequests(msg);

    }
    else
    {
      console.log("server_message", "Sorry, I don't quite " + "get what you're talking about. Could you please be" +" more specific?");
      return ("server_message", "Sorry, I don't quite " + "get what you're talking about. Could you please be" +" more specific?");
    }
  }
}


var dictionary=function(statement)
{
    var searchkeys=statement.split(" ");
    var key1="";
    var key2="";

    var fundDescDict = {
     allan: "Allan Gray Equity Fund",
     sanlam: "Sanlam Investment Management Resources Fund",
     investec:"Investec Value Fund",
     cadiz: "Cadiz Mastermind Fund",
     oasis:"Oasis Crescent Equity Fund",
     sygnia:"Sygnia Value Fund",
     mutual:"Old Mutual Top 40 Fund",
     "mutual industrial":"Old Mutual Industrial Fund"
   };

    var keysDict={
      "balance": "StartUnitBalance",
      "price":"StartUnitPrice",
      "ratio":"StartRatio",
      "market":"StartMarketValue"

    };

    for(var i=0;i<searchkeys.length;i++)
    {


       if((fundDescDict[searchkeys[i].toLowerCase()])!=undefined)
       {

          key1+=fundDescDict[searchkeys[i].toLowerCase()]+",";
       }
       if((keysDict[searchkeys[i].toLowerCase()])!=undefined )
       {
         key2+=keysDict[searchkeys[i].toLowerCase()];
       }
    }
    return key1+""+key2;

}










var httpRequests= function(msg) {

          var mssg=dictionary(msg);
          console.log(mssg);
          // var options = {
          //
          //       url:"http://localhost:3000/funds?fundReportingDescription="+mssg.split(",")[0],
          //
          //       headers: {
          //           method:"GET",
          //           json:true,
          //       }
          // };
          //
          //
          // request.get(options).then(function(body) {
          //     //var json = JSON.parse(body);
          //     //console.log("tt: "+(body[0][mssg.split(",")[1]]))
          //     return((body[0][mssg.split(",")[1]]));
          // });



         if(mssg.split(",")[1]!=undefined)
         {
           request({
               url:"http://localhost:3000/funds?fundReportingDescription="+mssg.split(",")[0],
               method:"GET",
               json:true,


             }, function (error,response,body,data)
                {
                     if(error)
                     {
                       console.log("Error");
                       return error;
                     }
                     else
                     {
                       console.log(body[0][mssg.split(",")[1]]);
                      return((body[0][mssg.split(",")[1]]));
                      }
                  });
            }

            else {
              return "none";
            }

};
