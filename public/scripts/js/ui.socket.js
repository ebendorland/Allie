//  Connect to socket running on localhost:3001
var socket = io.connect("http://localhost:3001");

/*
  Function to emit the user's message to the server and display it
  onscreen.
*/

/*
  This catches any "server_message" events emitted by the server_message
*/
socket.on("server_message", function(msg) {
  if (msg && /\S/.test(msg)) {
    //  Create new message bubble and append to message_list
    var new_message = document.createElement("textfield");
    var text_node = document.createTextNode(msg);
    new_message.setAttribute("class", "ally_message");
    new_message.appendChild(text_node);
    document.getElementById("message_list").appendChild(new_message);
  }
});
