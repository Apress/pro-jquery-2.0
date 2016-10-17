var http = require("http");
var querystring = require("querystring");
var url = require("url");

var port = 80;

http.createServer(function (req, res) {
    console.log("[200 OK] " + req.method + " to " + req.url);

    var flowers = ["Aster", "Daffodil", "Rose", "Peony", "Primula", "Snowdrop",
                    "Poppy", "Primrose", "Petuna", "Pansy"];

    var matches = [];
    var term = url.parse(req.url, true).query["term"];

    if (term) {
        var pattern = new RegExp("^" + term, "i");
        for (var i = 0; i < flowers.length; i++) {
            if (pattern.test(flowers[i])) {
                matches.push(flowers[i]);
            }
        }
    } else {
        matches = flowers;
    }

    res.writeHead(200, "OK", {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    res.write(JSON.stringify(matches));
    res.end();

}).listen(port);
console.log("Ready on port " + port);
