//  Setup ally server
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var nlp = require("../natural/server.nlp.js");

//  Define user message event handler
io.on("connection", function(socket) {
  console.log("+++ New user connected.");
  console.log("\tUserID:\t", socket.id);
  console.log("");
  console.log("");

  socket.on("user_message", function(msg) {
    console.log("||| Start of \"socket.on('user_message')\" in",
        "\"/src/socket/server.socket.js\" |||");
    console.log("");
    console.log("");

    console.log(">>> New message from user to server.");
    console.log("\tFrom UserID:\t", msg.id);
    console.log("\tMessage:\t", msg.message);
    console.log("");
    console.log("");

    console.log("___ Calling \"processMessage()\" from",
        "\"/src/socket/server.socket.js\" ___");
    console.log("");
    console.log("");
    var response = nlp.processMessage(msg);
    console.log("___ Returned call of \"processMessage()\" to",
        "\"/src/socket/server.socket.js\" with response:\t", response, "___");
    console.log("");
    console.log("");

    console.log("<<< New message from server to user.");
    console.log("\tTo UserID:\t", msg.id);
    console.log("\tMessage:\t", response);
    console.log("");
    console.log("");

    console.log("%%% Sending server response to user %%%");
    console.log("\t...");
    io.to(msg.id).emit("server_message", response);
    console.log("%%% Message sent. %%%");
    console.log("");
    console.log("");

    console.log("||| End of \"socket.on('user_message')\" in",
        "\"/src/socket/server.socket.js\" |||");
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
