var request = require('request');
var natural = require('natural'),
  classifier = new natural.BayesClassifier();
  tokenizer = new natural.WordTokenizer();

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

/*
  When a new connection event is detected, we then check if a message
  event was emitted.
  If so, compare its accompanying message to what the bot can currently handle.
  The bot then emits a new event as a message to the client with the
  applicable response, and logs the response to the console.
*/
io.on("connection", function(socket)
{
  //socket.emit("server_message", "Hi, how can I help you?");
  socket.on("user_message", function(msg)
  {
  var mssg=languageProccessing(msg);
  var totalPrice='R 42 006.52';

 if(mssg)
 {
   if(mssg[0] === 'portfolio value')
   {
     socket.emit("message", "Your portfolio total value is: "+totalPrice);
   }
   else if(mssg.length==2)
   {
     request({
         url:"http://localhost:3000/funds?fundReportingDescription="+mssg[0],
         method:"GET",
         json:true,


       }, function (error,response,body,data)
          {
               if(error)
               {
                 console.log("feature not deleted error");
                 return error;
               }
               else
               {
                 if("The value of your "+mssg[0]+" is R"+(parseFloat(body[0][ mssg[1] ] )).toFixed(2))
                 {
                   socket.emit("message", (body[0][ mssg[1]]));
                 }
                 else
                 {
                    socket.emit("message", "The value of your "+mssg[0]+" is R"+(parseFloat(body[0][ mssg[1] ] )).toFixed(2));
                 }
               }
            });
      }
      else if(mssg.length==1 && mssg[0] == "greeting hello"){
          socket.emit("message", "Hello to you too, how can I help you?");
      }
      else if(mssg.length==1 && mssg[0] == "greeting how are you"){
          socket.emit("message", "I'm well thank you.");
          socket.emit("message", "What can I do for you.");
        }
      else {
        console.log("I don't know what you're asking me. Maybe try rephrasing your question?");
        socket.emit("message", "I don't know what you're asking me. Maybe try rephrasing your question?");
      }
    }
    else{
      socket.emit("message", "I don't know what you're asking me. Can you type out something");
    }
  });
});
