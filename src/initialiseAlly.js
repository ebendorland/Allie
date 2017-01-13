/*
  @Author: Khathu Musekwa

  @Date: 12/01/2017

  @Description: This file will Initialise and setup all modules to be used in
                the
*/

/*
  Exports all the below declarations for global access to other files.
*/
module.exports = function() {
  var expressApp = require("express")();
  var http = require("http").Server(expressApp);
  var io = require("socket.io")(http);

  http.listen(3001, function() {
    console.log("Listening on localhost:3000");
  });
}
