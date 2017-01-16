var natural = require("natural");
var classifier = new natural.LogisticRegressionClassifier();

// Read file from classifier data to train the classifier
var fs = require('fs');
var classifierTrainer = "";

function onFileRead(err, data) {
  if (err) {
    console.log("ERROR: failed to read classifier trainer file.");
    console.log(">> " + err);
    classifierTrainer = null;
  }
  else {
    classifierTrainer = JSON.parse(data);
  }
}

//method to train the classifier using the BayesClassifier
module.exports =
{
  trainClassifier: function()
  {
    fs.readFile('../datasets/trainedClassifier.json', 'utf8', onFileRead);
    var i = 0;
    for (i = 0, len = classifierTrainer.length; i < len; i++)
    {
      classifier.addDocument((classifierTrainer[i].example),
      classifierTrainer[i].type);
      console.log((classifierTrainer[i].example), classifierTrainer[i].type);
    }

    classifier.train();
    classifier.save("../datasets/classifier.json", function(err, classifier) {
      console.log("Classifier trained. " + i + " examples used.");
    });
  }
}
