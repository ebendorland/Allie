var server_socket = require('../src/natural/server.nlp.js');
var assert = require('assert');
// var server_socket = require('../src/socket/server.nlp.js');

var msg = 'Hi! How can I help?';
var message = {
  message: msg,
  from: "user",
  id: "xkjhgas-lhgs"
}
describe('when i say hello ',function(){
it('should tell Hi! How can I help?',function(){

var processMessage = server_socket.processMessage(message);
assert.equal(processMessage,msg);
});
});

describe('when i say hello ',function(){
it('should tell Hi! How can I help?',function(){

var processMessage = server_socket.processMessage(message);
assert.equal(processMessage,msg);
});
});
