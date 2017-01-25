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
** Creates log in src/logger/log
*/
function logger_log(messageToLog)
{
  fStream.appendFile('src/logger/log', messageToLog, function(err)
  {
    if(err) throw err;
  });
}

/*
** Creates log in src/logger/extInfo
*/
function logger_extInfo(messageToLog)
{
  fStream.appendFile('src/logger/extInfo', messageToLog, function(err)
  {
    if(err) throw err;
  });
}


/*
** Gets Current Date
*/
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    var access_to_all = new Date();
    var mil = access_to_all.getMilliseconds();

    return " [Year: "+year + " || " + "Month: "+month + " || " + "Day: "+day + " || " + "Hour: "+hour + " || " + "Minute: "+min + " || " + "Second: " + sec + " || " + "MiliSecond: "+mil + "]"

}


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
  var NLP_To_File = 'NLP_[Extracted Fund Name(s)]: NO FUND NAMES FOUND IN USER STRING\n';
    logger_extInfo(NLP_To_File);
    return (null);
  }
  else
  {
    var NLP_To_File = 'NLP_[Extracted Fund Name(s)]: ' + fund_name_trainer[best_index].type + '\n';
    logger_extInfo(NLP_To_File);

    return (fund_name_trainer[best_index].type);
  }
}

/*
** Return the data identifier that the user is asking for.
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
    var NLP_To_File = 'NLP_[Extracted Fund Data]: NO FUND DATA FOUND IN USER MESSAGE\n';
    logger_extInfo(NLP_To_File);
    return (null);
  }
  else
  {
    var NLP_To_File = 'NLP_[Extracted Fund Data]: ' + fund_data_trainer[best_index].type + '\n';
    logger_extInfo(NLP_To_File);

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
    var NLP_To_File = 'NLP_[Extract Greeting Type]: NO GREETING TYPE FOUND IN USER MESSAGE\n';
    logger_extInfo(NLP_To_File);
    return (null);
  }
  else
  {
    var NLP_To_File = 'NLP_[Extract Greeting Type]: ' + message_type_trainer[best_index].type + '\n';
    logger_extInfo(NLP_To_File);

    return (message_type_trainer[best_index].type);
  }
}

/*
** Returns the correct response to use based on the parameter given
*/
function getResponse(type)
{
  for (var i = 0; i < responsesJSON.length; i++)
  {
    if (responsesJSON[i].type == type)
    {
      return (responsesJSON[i].response);
      var NLP_To_File = 'NLP_[Respone]: ' + responsesJSON[i].response + '\n';
      logger_extInfo(NLP_To_File);
      }
  }
  var type_split = type.split(/(?=[A-Z])/);


  var NLP_To_File = 'NLP_[Type]: ' + type + '\n';
  logger_extInfo(NLP_To_File);

  var NLP_To_File = 'NLP_[Type Splitted]: ' + type_split + '\n';
  logger_extInfo(NLP_To_File);

  var generic_response = "The " + type_split.join(" ") + " for your {account} "
    + " is currently sitting at {value}. Please let me know if there's " +
    "anything you'd like me to assist with :)";

    var NLP_To_File = 'NLP_[Generic Response]: ' + generic_response + '\n';
    logger_extInfo(NLP_To_File);

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

      var NLP_To_File = 'NLP_[Returned Greeting]: ' + responsesJSON[i].response + '\n';
      logger_extInfo(NLP_To_File);

      return (responsesJSON[i].response);
    }
  }
}

function politeRequest(msg_stem)
{
  var requests = "can i please have my give me you get tell";
  requests = requests.tokenizeAndStem(true);

  var NLP_To_File = 'NLP_[Polite Request List]: ' + requests+ '\n';
  logger_extInfo(NLP_To_File);


  var sim_count = getSimilarityCount(msg_stem, requests);

  if (sim_count >= 3)
  {
    var NLP_To_File = "NLP_[Polite Request]: " + true + "\n";
    logger_extInfo(NLP_To_File);
    return (true);
  }
  else
  {
    var NLP_To_File = "NLP_[Polite Request]: " + false + "\n";
    logger_extInfo(NLP_To_File);
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
    var NLP_To_File = 'NLP_[Ally Was Polite]: True\n';
    logger_extInfo(NLP_To_File);

    return (" Sure thing, let me get that for you.");
  }
  var NLP_To_File = 'NLP_[Ally Was Polite]: False\n';
  logger_extInfo(NLP_To_File);
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
    var msg = message.message;

    var CurrentTime = getDateTime();
    var NLP_To_File = 'User Message Sent: ' + CurrentTime + '\n\n';
    logger_extInfo(NLP_To_File);

    var CurrentTime = getDateTime();
    var NLP_To_File = 'User Message Sent: ' + CurrentTime + '\n\n';
    logger_log (NLP_To_File);


    var UserToFile = 'From User: ' + msg + '\n';
    logger_log(UserToFile);
    logger_extInfo(UserToFile);

    var msg_stem = msg.tokenizeAndStem(true);
    NLP_To_File = "NLP_[Stemmed Message]: " + msg_stem + "\n";
    logger_extInfo(NLP_To_File);

    var message_type_classification = getGreetingType(msg_stem);
    var fund_name_classification = getFundName(msg_stem);
    var fund_data_classification = getFundData(msg_stem);

    /*
      If user message contains a greeting, add a greeting to the final_response
    */
    if (message_type_classification)
    {
      NLP_To_File = "NLP_[getGreetingType()]: Stemmed Message Recieved\n";
      logger_extInfo(NLP_To_File);
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
      NLP_To_File = "NLP_[Fund Name Classification]: Set To Default -> " + fund_name_classification + "\n";
      logger_extInfo(NLP_To_File);
    }
    if(fund_name_classification && fund_data_classification)
    {
      var NLP_To_File = "NLP_[ALLY UNDERSTOOD REQUEST]: true\n";
      logger_extInfo(NLP_To_File);
      /*
        If request says please, then add "sure thing".
      */
      final_response += handleRequest(msg_stem);

      var NLP_To_File = "NLP_[URL]: http://localhost:3002/funds?fundReportingDescription=" + fund_name_classification + "\n";
      logger_extInfo(NLP_To_File);

      var sync = true;
      request({
          url:"http://localhost:3002/funds?fundReportingDescription=" + fund_name_classification,
          method:"GET",
          json:true,
          async:false,
        },
        function (error,response,body,data)
        {
          if(error)
          {
            sync = false;
          }
          else
          {
            data_response = body[0][fund_data_classification];
            var NLP_To_File = "NLP_[Data Response]: " + data_response + "\n"
            logger_extInfo(NLP_To_File);
            sync = false;
          }
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
        var NLP_To_File = "NLP_[ALLY UNDERSTOOD REQUEST]: false\n";
        logger_extInfo(NLP_To_File);
    }
    // If a user hasn't asked for anything but made sense
    else if (!fund_name_classification && !fund_data_classification && message_type_classification)
    {
      final_response += " What would you like me to assist you with?";
      var NLP_To_File = "NLP_[ALLY UNDERSTOOD REQUEST]: false\n";
      logger_extInfo(NLP_To_File);
    }
    // If a user hasn't asked for anything and made no sense
    else if (!fund_name_classification && !fund_data_classification && !message_type_classification)
    {
      final_response = "unknown";
      var NLP_To_File = "NLP_[ALLY UNDERSTOOD REQUEST]: false\n";
      logger_extInfo(NLP_To_File);
    }

    // Search for a response if a response was provided from the JSON server
    if (data_response)
    {
      final_response += getResponse(fund_data_classification);

      var NLP_To_File = "NLP_[Final Response Before PregEx]: " + final_response + "\n";
      logger_extInfo(NLP_To_File);

      final_response = final_response.replace(/\{account\}/g, fund_name_classification);
      final_response = final_response.replace(/\{value\}/g, data_response);

      var NLP_To_File = "NLP_[Final Response After PregEx]: " + final_response + "\n";
      logger_extInfo(NLP_To_File);

            var NLP_To_File = "NLP_[Program Failed]: False\n";
            logger_extInfo(NLP_To_File);
    }
    // Fail gracefully if no data is returned
    else if (!data_response && fund_name_classification && fund_data_classification)
    {
      final_response += "I don't think that's something I can provide." +
        " Try contacting one of our consultants at 0860 000 654 for further"
        + " assistance";

      var NLP_To_File = "NLP_[Program Failed]: True\n";
      logger_extInfo(NLP_To_File);
    }

    var AllyToFile = 'From ALLY: ' + final_response + '\n\n';
    logger_log(AllyToFile);

    var CurrentTime = getDateTime();
    var NLP_To_File = 'User Message Recieved: ' + CurrentTime + '\n\n\n\n\n';
    logger_log (NLP_To_File);

    logger_extInfo(AllyToFile);

    var CurrentTime = getDateTime();
    var NLP_To_File = 'User Message Recieved: ' + CurrentTime + '\n\n\n\n\n';
    logger_extInfo(NLP_To_File);

    return (final_response);
  }
}
