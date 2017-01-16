var natural = require('natural');
var stemmer = natural.PorterStemmer;
var classifier = new natural.LogisticRegressionClassifier();
stemmer.attach();

/*
  Read in the available responses the bot can give.
*/
var fStream = require("fs");
var responsesJSON = fStream.readFileSync("../datasets/responses.json");
responsesJSON = JSON.parse(responsesJSON);

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
          
        }
      }
    }
  }
}
