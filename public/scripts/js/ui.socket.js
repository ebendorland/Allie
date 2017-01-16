var socket = io.connect("http://localhost:3001");

function userSendMessage() {
  var input = document.getElementById("usr_input");
  var input_txt = input.value;
  input.value = "";
  socket.emit("user_message", input_txt);
}
