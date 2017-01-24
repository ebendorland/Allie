var natural = require('natural');
var fStream = require("fs");
var request = require('request');
var stemmer = natural.PorterStemmer;
var trainClassifier = require("./ClassifierTrainer.js");
stemmer.attach();

/*
  Read in responses to be used when searching for valid responses to return
  to the user.
*/
var responsesJSON = fStream.readFileSync("src/datasets/responses.json");
responsesJSON = JSON.parse(responsesJSON);

/*
  Read in trainers to be used when determining classifications and greetings
*/
var fund_name_trainer = fStream.readFileSync("src/trainers/fund_name_trainer.json");
fund_name_trainer = JSON.parse(fund_name_trainer);
var fund_data_trainer = fStream.readFileSync("src/trainers/fund_data_trainer.json");
fund_data_trainer = JSON.parse(fund_data_trainer);
var message_type_trainer = fStream.readFileSync("src/trainers/greeting_trainer.json");
message_type_trainer = JSON.parse(message_type_trainer);

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
  Get the type of greeting the user is using
*/
function getGreetingType(msg_stem)
{
  var best_index = -1;
  var best_similarity = 0;

  for (var i = 0; i < message_type_trainer.length; i++)
  {
    var similarity = getSimilarityCount(message_type_trainer[i].example.tokenizeAndStem(true), msg_stem);

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
    return (message_type_trainer[best_index].type);
  }
}

/*
  Returns the correct response to use based on the parameter given
*/
function getResponse(type)
{
  for (var i = 0; i < responsesJSON.length; i++)
  {
    if (responsesJSON[i].type == type)
    {
      return (responsesJSON[i].response);
    }
  }

  var type_split = type.split(/(?=[A-Z])/);
  var generic_response = "The " + type_split.join(" ") + " for your {account} "
    + " is currently sitting at {value}. Please let me know if there's " +
    "anything you'd like me to assist with :)";
  return (generic_response);
}

/*
  Return a greeting based on the type of greeting user gave
*/
function getGreeting(type)
{
  for (var i = 0; i < responsesJSON.length; i++)
  {
    if (responsesJSON[i].type == type)
    {
      return (responsesJSON[i].response);
    }
  }
}

function politeRequest(msg_stem)
{
  var requests = "can i please have my give me you get tell";
  requests = requests.tokenizeAndStem(true);

  var sim_count = getSimilarityCount(msg_stem, requests);

  if (sim_count >= 3)
  {
    return (true);
  }
  else
  {
    return (false);
  }
}

/*
  Returns a response based on the type of request made.
*/
function handleRequest(msg_stem)
{
  if (politeRequest(msg_stem))
  {
    return (" Sure thing, let me get that for you.");
  }
  return ("");
}

/*
  processMessage() takes in the user input and returns the data best fit
  for the request, else it returns a message asking for clarification.
*/
module.exports = {
  processMessage: function(message) {

    // Where the final response to the user will be stored
    var final_response = "";

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

    var message_type_classification = getGreetingType(msg_stem);
    console.log("Message has a greeting type:", message_type_classification);
    var fund_name_classification = getFundName(msg_stem);
    console.log("Message refers to account:" + fund_name_classification);
    var fund_data_classification = getFundData(msg_stem);
    console.log("Message refers to data:" + fund_data_classification);

    /*
      If user message contains a greeting, add a greeting to the final_response
    */
    if (message_type_classification)
    {
      final_response = getGreeting(message_type_classification);
    }

    /*
      If an account name and data identifier is found, query JSON server for
      relevant data.
    */
    // Store data retrived from JSON server here
    var data_response = null;

    /*
      If user hasn't specified which account to use, then assume
      that the Allan Gray account is requested. Also add a message to
      final_response stating that the user should be more specific.
    */
    if (!fund_name_classification && fund_data_classification)
    {
      final_response = "I'm assuming you're referring to your Allan Gray " +
        "Equity Fund? In that case here you go! ";
      fund_name_classification = "Allan Gray Equity Fund";
    }
    if(fund_name_classification && fund_data_classification)
    {
      /*
        If request says please, then add "sure thing".
      */
      final_response += handleRequest(msg_stem);
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
    // If user specified which account to draw info from but not which DATA
    else if (fund_name_classification && !fund_data_classification)
    {
      final_response += "I'm not quite sure what information you're asking" +
        " for. Could you please also mention what you're looking for in your " +
        fund_name_classification + "?";
    }
    // If a user hasn't asked for anything but made sense
    else if (!fund_name_classification && !fund_data_classification && message_type_classification)
    {
      final_response += " What would you like me to assist you with?";
    }
    // If a user hasn't asked for anything and made no sense
    else if (!fund_name_classification && !fund_data_classification && !message_type_classification)
    {
      final_response = "unknown";
    }

    // Search for a response if a response was provided from the JSON server
    if (data_response)
    {
      final_response += getResponse(fund_data_classification);
      final_response = final_response.replace(/\{account\}/g, fund_name_classification);
      final_response = final_response.replace(/\{value\}/g, data_response);
    }
    // Fail gracefully if no data is returned
    else if (!data_response && fund_name_classification && fund_data_classification)
    {
      final_response += "I don't think that's something I can provide." +
        " Try contacting one of our consultants at 0860 000 654 for further"
        + " assistance";
    }

    console.log("___ Returned call of \"JSON.request()\" to",
        "\"/src/natural/server.nlp.js\" with response:", data_response, "___");
    console.log("");
    console.log("");

    console.log("||| End of \"socket.on('user_message')\" in",
        "\"/src/socket/server.socket.js\" |||");
    console.log("");
    console.log("");

    return (final_response);
  }
}
