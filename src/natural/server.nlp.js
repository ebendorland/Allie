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

/*
  receive a string entered by user and classify it according to the
  specified keywords. Return a list of keywords to use to query DB
*/
var languageProccessing = function(statement)
{
  var input = classifier.classify(statement);

  input = input.replace('[','');
  input = input.replace(']','');
  input = (input.split("\'")).join('');
  input = input.split(",");

  console.log("Processed user message: " + input);
  return input;
}

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
  processMessage: function(message) {
    console.log("||| Start of \"processMessage()\" in",
        "\"/src/natural/server.nlp.js\" |||");
    console.log("");
    console.log("");

    console.log("@@@ Parameter received @@@");
    console.log("\tParameter name:\tmessage");
    console.log("\t\tParameter values:\t", message);
    console.log("");
    console.log("");

    var data_response = null;
    console.log("N.B - Variable to be used in function return",
        "is named: \t\"data_response\"");
    console.log("\tdata_response:\t", data_response);
    console.log("");
    console.log("");

    console.log("Tokenizing and stemming message:\t", message.message);
    console.log("\t\t...");
    var msg = message.message;
    var msg_stem = msg.tokenizeAndStem(true);
    console.log("Message tokenized and stemmed to:\t", msg_stem);
    console.log("");
    console.log("");

    var classification = classifier.classify(msg_stem);
    console.log("Message classified as:\t" + classification);

    // Retrieve data from server
    console.log("Preparing classification for use in JSON server request",
        "descriptor.");
    console.log("\t\t...");
    var mssg = classification;
    mssg = mssg.replace("[","");
    mssg = mssg.replace("]","");
    mssg = mssg.replace("'","");
    mssg = mssg.replace("'","");
    mssg = mssg.replace("'","");
    mssg = mssg.replace("'","");
    var descr = mssg.split(",");
    console.log("JSON server request descriptor created.");
    console.log("Descriptor:\t", descr);
    console.log("");
    console.log("");

    // If descriptor is valid, query JSON server for relevant data
    if(descr[0] && descr[1])
    {
      console.log("Descriptor is OK.");
      console.log("");
      console.log("");

      console.log("___ Calling \"JSON.request()\" from",
          "\"/src/natural/server.nlp.js\" ___");
      console.log("");
      console.log("");

      var sync = true;
      request({
          url:"http://localhost:3002/funds?fundReportingDescription="+descr[0],
          method:"GET",
          json:true,
          async:false,
        },
        function (error,response,body,data)
        {
          console.log("Response received from JSON server request.");
          if(error)
          {
            console.log("\tError received:\t", error);
            data_response = "Sorry, something is going wrong with the system" +
                " on my end. Just give me a moment to sort this out please.";
            sync = false;
          }
          else
          {
            console.log("\tData received:\t", body[0][descr[1]]);
            data_response = body[0][descr[1]];
            sync = false;
          }
          console.log("");
          console.log("");
          //No idea what the below code is
          /*else
          {
            data_response = "Hello to you too";
          }*/
      });
      while(sync)
      {
        require("deasync").sleep(100);
      }
    }
    console.log("___ Returned call of \"JSON.request()\" to",
        "\"/src/natural/server.nlp.js\" with response:\t", data_response, "___");
    console.log("");
    console.log("");


    // Var to store the response to the user
    var final_response = null;

    // Loop through responses and find corresponding response
    console.log("====")
    console.log("Searching through responses for matching response.");
    console.log("====")
    console.log("");
    for (var i = 0, len = responsesJSON.length; i < len; i++)
    {
      console.log("\t\tChecking response number {" + i + "} with type:\t",
          responsesJSON[i].type);
      console.log("");

      // If a response is found with a type matching the user message's classification
      if (responsesJSON[i].type == classification)
      {
        console.log("\t\tResponse found at {" + i + "} with type:\t",
            responsesJSON[i].type);
        console.log("");

        console.log("\t\tGetting example used to train classifier for",
            "message type of:\t", responsesJSON[i].type);

        console.log("___ Calling \"getClassifiedExample()\" from",
            "\"/src/natural/server.nlp.js\" ___");
        console.log("");
        console.log("");
        var classified_example = getClassifiedExample(trainerJSON,
            responsesJSON[i].type);
        console.log("___ Returned call of \"getClassifiedExample()\" to",
            "\"/src/natural/server.nlp.js\" with response:\t", classified_example, "___");
        console.log("");
        console.log("");
        console.log("..");
        console.log("\t\tTraining example:\t", classified_example);

        // Check that such example does indeed exist
        if (classified_example != null)
        {
          console.log("\t\tTraining example exists for type:\t",
              responsesJSON[i].type);
          console.log("");

          console.log("\t\tCalculating similarity ratio between user",
              "input and training example.");
          console.log("\t\tMessage:\t", msg_stem);
          console.log("\t\tTraining example:\t", classified_example);
          console.log("");
          console.log("");

          console.log("___ Calling \"getSimilarityRatio()\" from",
              "\"/src/natural/server.nlp.js\" ___");
          console.log("");
          console.log("");
          var similarity = getSimilarityRatio(msg_stem, classified_example);
          console.log("___ Returned call of \"getSimilarityRatio()\" to",
              "\"/src/natural/server.nlp.js\" with response:\t", similarity, "___");
          console.log("");
          console.log("");

          console.log("\t\tUser message and training example have",
              "similarity ratio of: ", similarity);
          console.log("");

          // If user message and example are similar enough, copy the response
          if (similarity > 0.3)
          {
            console.log("\t\tSimilarity ratio is high enough for response",
                "to be used.");
            console.log("");

            final_response = responsesJSON[i].response;
            console.log("\t\tUsing response: ", final_response);
            console.log("");
          }
        }
      }
      console.log("~");
      console.log("");
    }
    console.log("");
    console.log("");

    console.log("These are the values to use when compiling the response.");
    console.log("\tJSON Data:\t", data_response);
    console.log("\tMessage Response:\t", final_response);
    console.log("");
    console.log("");

    // Check if there is any JSON data AND response data to return
    if (data_response && final_response)
    {
      console.log("Data response exists... now compiling final response",
          "with data:");
      console.log("\tData response:\t", data_response);
      console.log("\tMessage response:\t", final_response);
      console.log("...");
      final_response.replace("{value}", data_response);
      console.log("Final response compiled...");
      console.log("\tFinal Response:\t", final_response);
      console.log("");
      console.log("");
    }
    // Check if there is a response that requires data, but there is no response
    else if (!data_response && final_response &&
        final_response.includes("{value}"))
    {
      console.log("Data response does not exists... now compiling final ",
          "response with data:");
      console.log("\tData response:\t", data_response);
      console.log("\tMessage response:\t", final_response);
      console.log("...");
      final_response = "Sorry, I was unable to find the exact " +
          "info you're looking for. I think that's some sensitive info" +
          " that I'm not allowed to access. Try calling the CSC maybe?";
      console.log("Final response compiled...");
      console.log("\tFinal Response:\t", final_response);
      console.log("");
      console.log("");
    }
    //Check if there's data but no response
  /*  else if (data_response && !final_response)
    {
      console.log("There is no response to add the data to... now compiling",
          "a simple response.");
      console.log("\tData response:\t", data_response);
      console.log("\tMessage response:\t", final_response);
      final_response = "Here you go: " + data_response +
          "\n\nI believe that's what you're looking for?";
      console.log("Final response compiled...");
      console.log("\tFinal Response:\t", final_response);
      console.log("");
      console.log("");
    }*/
    // Check that there is a basic, value-less, response to use
    else if (final_response)
    {
      console.log("There is no extra data to be added to the final",
          "response.");
      console.log("\tData response:\t", data_response);
      console.log("\tMessage response:\t", final_response);
      console.log("\tFinal Response:\t", final_response);
      console.log("");
      console.log("");
    }
    // There is no possible response. So ask for clarification
    else
    {
      console.log("Unable to compile a complete response...",
          "Compiling a simple response for clarification.");
      console.log("\tData response:\t", data_response);
      console.log("\tMessage response:\t", final_response);
      final_response = "unknown";
      console.log("\tFinal Response:\t", final_response);
      console.log("");
      console.log("");
    }

    // Return final response to server emit
    console.log("Returning final response:\t", final_response);
    console.log("");
    console.log("");

    console.log("||| End of \"socket.on('user_message')\" in",
        "\"/src/socket/server.socket.js\" |||");
    console.log("");
    console.log("");

    return (final_response);
  }
}
