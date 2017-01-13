/*
  Exports all the below declarations for global access to other files.
*/
module.export = function() {
  function initialiseAlly(allyServer) {
    allyServer.http.listen(3001, function() {
      console.log("Listening on localhost:3001");
    });
  }
}
