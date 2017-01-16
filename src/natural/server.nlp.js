var io = require("socket.io");
var natural = require('natural');
var trainClassifier = require("trainClassifier.js");
var stemmer = natural.PorterStemmer;
var classifier = new natural.LogisticRegressionClassifier();
stemmer.attach();

trainClassifier.trainClassifier(classifier);

/*
  Read in the available responses the bot can give.
*/
var fStream = require("fs");
var responsesJSON = fStream.readFileSync("../datasets/responses.json");
responsesJSON = JSON.parse(responsesJSON);

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
    for (var j = i + 1; j < len2; j++) {
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

function processMessage(msg) {
  var msg_stem = msg.tokenizeAndStem(true);
  var classification = classifier.classify(msg_stem);

  for (var i = 0, len = responsesJSON.length; i < len; i++) {
    if (responsesJSON[i].type == classification) {
      var classified_example = getClassifiedExample(trainerJSON),
          responsesJSON[i].type);

      if (classified_example != null) {
        var similarity = getSimilarityRatio(msg_stem, classified_example);

        if (similarity > 0.3) {
          if (classification == "greeting" || classification == "greeting" +
              " how are you" || classification == "greeting help me") {
            var socket = io.connect("https://localhost:3001");
            socket.emit("server_message", responsesJSON[i].response);
            break;
          }
        }
      }

      if (i == len - 1) {
        console.log("I have no idea what this human is saying...");
        socket.emit("server_message", "Sorry, I don't quite get what"
            + " you're talking about. Could you please be more specific?");
      }
    }
  }
}
