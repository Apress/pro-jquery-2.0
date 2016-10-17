var http = require('http');
var url = require('url');


http.createServer(function (req, res) {
    console.log("Request: " + req.method + " to " + req.url);
    
    res.writeHead(200, "OK");
    res.write("<h1>Hello</h1>Node.js is working");
    res.end();
    
}).listen(80);
console.log("Ready on port 80");  
