const http = require('http'),
      os = require('os');

var handler = function(request, response) {
  console.log("Request received from: " + request.connection.remoteAddress);
  response.writeHead(200);
  response.end("Node app v1 is running in Pod: " + os.hostname() + "\n");
};

var server = http.createServer(handler);
server.listen(8080);