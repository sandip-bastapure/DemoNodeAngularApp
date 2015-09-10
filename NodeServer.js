// Load the http module to create an http server.
var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
   var filePath = false;
   if (request.url == '/') {
     filePath = "index.html";
   } else {
     filePath = "index.html";
   }

   var absPath = "./" + filePath;
   serverWorking(response, absPath);
});


function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
