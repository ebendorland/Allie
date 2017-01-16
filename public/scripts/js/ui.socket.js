//  Connect to socket running on localhost:3001
var socket = io.connect("http://localhost:3001");

/*
  Function to emit the user's message to the server and display it
  onscreen.
*/
function userSendMessage() {
  //  Get User message text
  var input = document.getElementById("usr_input");
  var input_txt = input.value;

  //  Create new message bubble and append to message_list
  var new_message = document.createElement("div");
  var text_node = document.createTextNode(input_txt);
  new_message.setAttribute("class", "user_message");
  new_message.appendChild(text_node);
  document.getElementById("message_list").appendChild(new_message);

  // Clear input field and emit message
  socket.emit("user_message", input_txt);
  input.value = "";
}
