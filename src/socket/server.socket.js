//  Setup ally server
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var nlp = require("../natural/server.nlp.js");

//  Define user message event handler
io.on("connection", function(socket) {
  console.log("New user connected.");
  console.log("");
  console.log("");

  socket.on("user_message", function(msg) {
    console.log("New message from user {" + msg.id + "}: " + msg.message);
    console.log("");
    console.log("");
    var response = nlp.processMessage(msg);
    if (response)
      io.to(msg.id).emit("server_message", response);
    console.log("Message sent.")
    console.log("");
    console.log("");
  });
});

/*
    Listen for new events and export the listen function to be used
    when initialising the script.
*/
module.exports = {
  listen: function()
  {
    http.listen("3001", function()
    {
      console.log("Listening for chats at: localhost:3001");
      console.log("");
      console.log("");
    });
  }
};
