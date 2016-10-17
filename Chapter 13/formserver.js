var http = require("http");
var querystring = require("querystring");

var port = 80;

http.createServer(function (req, res) {
    console.log("[200 OK] " + req.method + " to " + req.url);

    if (req.method == "POST") {
        var dataObj = new Object();
        var cType = req.headers["content-type"];
        var fullBody = "";
        
        if (cType && cType.indexOf("application/x-www-form-urlencoded") > -1) {
            req.on("data", function(chunk) { fullBody += chunk.toString();});
            req.on("end", function() {            
                res.writeHead(200, "OK", {"Content-Type": "text/html"});  
                res.write("<html><head><title>Post data</title></head><body>");
                res.write("<style>th, td {text-align:left; padding:5px; color:black}\n");
                res.write("th {background-color:grey; color:white; min-width:10em}\n");
                res.write("td {background-color:lightgrey}\n");
                res.write("caption {font-weight:bold}</style>");
                res.write("<table border='1'><caption>Form Data</caption>");
                res.write("<tr><th>Name</th><th>Value</th>");
                var dBody = querystring.parse(fullBody);
                for (var prop in dBody) {
                    res.write("<tr><td>" + prop + "</td><td>"
                        + dBody[prop] + "</td></tr>");
                }
                res.write("</table></body></html>");
                res.end();                    
            });            
        }
    }

}).listen(port);
console.log("Ready on port " + port);
