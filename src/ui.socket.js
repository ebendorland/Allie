/*
  @Author: Khathu Musekwa

  @Date: 12/01/2017

  @Description: This file will handle the emitting and catching of socket
                events for the front-end.
*/

//Initialise socket package so we can emit & catch messages and events
var socket = io();

//Emit text contained in input field then clear the field
function  userSendMessage() {
  var msg = $("#usr_input").val();

  if (msg && /\S/.test(msg)) {
    $("#Ally-replies").append($("<div id='usr_message'").text(msg));
    socket.emit("usr_message", msg);
    $("#usr_input").val("");
  }
  return false;
}

//Catch text messages emitted from the server
socket.on("ally_message", function(msg) {
  $("#Ally-replies").append($("<div id='ally_message'").text(msg));
});
