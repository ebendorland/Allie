// Read file from classifier data to train the classifier
var fs = require('fs');
var classifierTrainer = null;

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
module.export =
{
  trainClassifier: function(classifier)
  {
    fs.readFile('../datasets/classifier.json', 'utf8', onFileRead);
    var i = 0;
    for (, len = file.length; i < len; i++)
    {
      classifier.addDocument((classifierTrainer[i].example),
      classifierTrainer[i].type);
      console.log((classifierTrainer[i].example), classifierTrainer[i].type);
    }
  }

  classifier.train();
  console.log("Classifier trained. " + i + " examples used.");
}
