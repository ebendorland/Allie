var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("New user connected.");
  socket.on("user_message", function(msg) {
    console.log("New message from user: " + msg);
  });
});

module.exports = {
  listen: function() {
    http.listen("3001", function() {
      console.log("Listening for chats at: localhost:3001");
    });
  }
}
