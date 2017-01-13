/*
  Exports all the below declarations for global access to other files.
*/
module.export = function() {
  AllyServer: {
    var expressApp = require("express")();
    var http = require("http").Server(expressApp);
    var io = require("socket.io")(http);
  }
}
