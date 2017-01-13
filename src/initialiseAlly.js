/*
  @Author: Khathu Musekwa

  @Date: 12/01/2017

  @Description: This file will Initialise and setup all modules to be used in
                the
*/
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  socket.on("usr_message", function(msg) {
    console.log(msg);
  })
})

http.listen(3000, function() {
  console.log("Listening on localhost:3000");
});
