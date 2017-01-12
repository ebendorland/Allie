/*
  @Author: Khathu Musekwa

  @Date: 12/01/2017

  @Description: This file will Initialise and setup all modules to be used in
                the
*/
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/../public/index.html");
});

http.listen(3000, function() {
  console.log("Listening on localhost:3000");
});
