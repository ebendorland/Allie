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
  Read in trainers to be used when determining classifications
*/
var fund_name_trainer = fStream.readFileSync("src/trainers/fund_name_trainer.json");
fund_name_trainer = JSON.parse(fund_name_trainer);
var fund_data_trainer = fStream.readFileSync("src/trainers/fund_data_trainer.json");
fund_data_trainer = JSON.parse(fund_data_trainer);

/*
  Check if an array contains a specific string.
*/
function arrayContains(arr, str)
{
  for (var i = 0; i < arr.length; i++)
  {
    if (arr[i] == str)
    {
      return (true);
    }
  }
  return (false);
}

/*
  Get the similarity ratio between two arrays. (I.e: how similar the two arrays
  are to one another)
*/
function  getSimilarityCount(arr1, arr2)
{
  var simCount = 0;
  var len1 = arr1.length;
  var len2 = arr2.length;

  for (var i = 0; i < len1; i++)
  {
    for (var j = 0; j < len2; j++)
    {
      if (natural.JaroWinklerDistance(arr1[i], arr2[j]) > 0.95)
      {
        simCount++;
        break;
      }
    }
  }

  return (simCount);
}

/*
  Return the name of the fund name that the msg_stem refers to.
*/
function getFundName(msg_stem)
{
  var best_index = -1;
  var best_similarity = 0;

  for (var i = 0; i < fund_name_trainer.length; i++)
  {
    var similarity = getSimilarityCount(fund_name_trainer[i].example.tokenizeAndStem(true), msg_stem);

    if (similarity > best_similarity)
    {
      best_similarity = similarity;
      best_index = i;
    }
  }

  if (best_index == -1)
  {
    return (null);
  }
  else
  {
    return (fund_name_trainer[best_index].type);
  }
}

/*
  Return the data identifier that the user is asking for.
*/
function getFundData(msg_stem)
{
  var best_index = -1;
  var best_similarity = 0;

  for (var i = 0; i < fund_data_trainer.length; i++)
  {
    var similarity = getSimilarityCount(fund_data_trainer[i].example.tokenizeAndStem(true), msg_stem);

    if (similarity > best_similarity)
    {
      best_similarity = similarity;
      best_index = i;
    }
  }

  if (best_index == -1)
  {
    return (null);
  }
  else
  {
    return (fund_data_trainer[best_index].type);
  }
}

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

module.exports = {
  processMessage: function(message) {
    console.log("||| Start of \"processMessage()\" in",
        "\"/src/natural/server.nlp.js\" |||");
    console.log("");
    console.log("");

    console.log("@@@ Parameter received @@@");
    console.log("Parameter name:message");
    console.log("Parameter values:", message);
    console.log("");
    console.log("");

    console.log("Tokenizing and stemming message:", message.message);
    console.log("...");
    var msg = message.message;
    var msg_stem = msg.tokenizeAndStem(true);
    console.log("Message tokenized and stemmed to:", msg_stem);
    console.log("");
    console.log("");

    var fund_name_classification = getFundName(msg_stem);
    console.log("Message refers to account:" + fund_name_classification);
    var fund_data_classification = getFundData(msg_stem);
    console.log("Message refers to data:" + fund_data_classification);

    /*
      If an account name and data identifier is found, query JSON server for
      relevant data.
    */
    // Store data retrived from JSON server here
    var data_response = null;
    if(fund_name_classification && fund_data_classification)
    {
      console.log("Fund classifiers are OK.");
      console.log("");
      console.log("");

      console.log("___ Calling \"JSON.request()\" from",
          "\"/src/natural/server.nlp.js\" ___");
      console.log("");
      console.log("");

      var sync = true;
      request({
          url:"http://localhost:3002/funds?fundReportingDescription="+fund_name_classification,
          method:"GET",
          json:true,
          async:false,
        },
        function (error,response,body,data)
        {
          console.log("Response received from JSON server request.");
          if(error)
          {
            console.log("Error received:", error);
            data_response = "Sorry, something is going wrong with the system" +
                " on my end. Just give me a moment to sort this out please.";
            sync = false;
          }
          else
          {
            console.log("Data received:", body[0][fund_data_classification]);
            data_response = body[0][fund_data_classification];
            sync = false;
          }
          console.log("");
          console.log("");
      });
      while(sync)
      {
        require("deasync").sleep(100);
      }
    }
    console.log("___ Returned call of \"JSON.request()\" to",
        "\"/src/natural/server.nlp.js\" with response:", data_response, "___");
    console.log("");
    console.log("");


    /*// Var to store the response to the user
    var final_response = null;

    // Loop through responses and find corresponding response
    console.log("====")
    console.log("Searching through responses for matching response.");
    console.log("====")
    console.log("");
    for (var i = 0, len = responsesJSON.length; i < len; i++)
    {
      console.log("Checking response number {" + i + "} with type:",
          responsesJSON[i].type);
      console.log("");

      // If a response is found with a type matching the user message's classification
      if (responsesJSON[i].type == classification)
      {
        console.log("Response found at {" + i + "} with type:",
            responsesJSON[i].type);
        console.log("");

        console.log("Getting example used to train classifier for",
            "message type of:", responsesJSON[i].type);

        console.log("___ Calling \"getClassifiedExample()\" from",
            "\"/src/natural/server.nlp.js\" ___");
        console.log("");
        console.log("");
        var classified_example = getClassifiedExample(trainerJSON,
            responsesJSON[i].type);
        console.log("___ Returned call of \"getClassifiedExample()\" to",
            "\"/src/natural/server.nlp.js\" with response:", classified_example, "___");
        console.log("");
        console.log("");
        console.log("..");
        console.log("Training example:", classified_example);

        // Check that such example does indeed exist
        if (classified_example != null)
        {
          console.log("Training example exists for type:",
              responsesJSON[i].type);
          console.log("");

          console.log("Calculating similarity ratio between user",
              "input and training example.");
          console.log("Message:", msg_stem);
          console.log("Training example:", classified_example);
          console.log("");
          console.log("");

          console.log("___ Calling \"getSimilarityRatio()\" from",
              "\"/src/natural/server.nlp.js\" ___");
          console.log("");
          console.log("");
          var similarity = getSimilarityRatio(msg_stem, classified_example);
          console.log("___ Returned call of \"getSimilarityRatio()\" to",
              "\"/src/natural/server.nlp.js\" with response:", similarity, "___");
          console.log("");
          console.log("");

          console.log("User message and training example have",
              "similarity ratio of: ", similarity);
          console.log("");

          // If user message and example are similar enough, copy the response
          if (similarity > 0.3)
          {
            console.log("Similarity ratio is high enough for response",
                "to be used.");
            console.log("");

            final_response = responsesJSON[i].response;
            console.log("Using response: ", final_response);
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
    console.log("JSON Data:", data_response);
    console.log("Message Response:", final_response);
    console.log("");
    console.log("");

    // Check if there is any JSON data AND response data to return
    if (data_response && final_response)
    {
      console.log("Data response exists... now compiling final response",
          "with data:");
      console.log("Data response:", data_response);
      console.log("Message response:", final_response);
      console.log("...");
      final_response.replace("{value}", data_response);
      console.log("Final response compiled...");
      console.log("Final Response:", final_response);
      console.log("");
      console.log("");
    }
    // Check if there is a response that requires data, but there is no response
    else if (!data_response && final_response &&
        final_response.includes("{value}"))
    {
      console.log("Data response does not exists... now compiling final ",
          "response with data:");
      console.log("Data response:", data_response);
      console.log("Message response:", final_response);
      console.log("...");
      final_response = "Sorry, I was unable to find the exact " +
          "info you're looking for. I think that's some sensitive info" +
          " that I'm not allowed to access. Try calling the CSC maybe?";
      console.log("Final response compiled...");
      console.log("Final Response:", final_response);
      console.log("");
      console.log("");
    }
    //Check if there's data but no response
    else if (data_response && !final_response)
    {
      console.log("There is no response to add the data to... now compiling",
          "a simple response.");
      console.log("Data response:", data_response);
      console.log("Message response:", final_response);
      final_response = "Here you go: " + data_response +
          "\n\nI believe that's what you're looking for?";
      console.log("Final response compiled...");
      console.log("Final Response:", final_response);
      console.log("");
      console.log("");
    }
    // Check that there is a basic, value-less, response to use
    else if (final_response)
    {
      console.log("There is no extra data to be added to the final",
          "response.");
      console.log("Data response:", data_response);
      console.log("Message response:", final_response);
      console.log("Final Response:", final_response);
      console.log("");
      console.log("");
    }
    // There is no possible response. So ask for clarification
    else
    {
      console.log("Unable to compile a complete response...",
          "Compiling a simple response for clarification.");
      console.log("Data response:", data_response);
      console.log("Message response:", final_response);
      final_response = "Sorry, I don't quite get what you mean. " +
          "Could please be a bit more specific?";
      console.log("Final Response:", final_response);
      console.log("");
      console.log("");
    }

    // Return final response to server emit
    console.log("Returning final response:", final_response);
    console.log("");
    console.log("");

    console.log("||| End of \"socket.on('user_message')\" in",
        "\"/src/socket/server.socket.js\" |||");
    console.log("");
    console.log("");*/

    return (data_response);
  }
}
