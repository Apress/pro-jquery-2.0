var http = require("http");
var querystring = require("querystring");
var url = require("url");

var port = 80;

http.createServer(function (req, res) {
    console.log("[200 OK] " + req.method + " to " + req.url);

    if (req.method == "OPTIONS") {
        res.writeHead(200, "OK", {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Origin": "*"
        });
        res.end();

    } else if (req.method == "POST") {
        var dataObj = new Object();
        var contentType = req.headers["content-type"];
        var fullBody = "";

        if (contentType) {
            if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
                req.on("data", function (chunk) { fullBody += chunk.toString(); });
                req.on("end", function () {
                    var dBody = querystring.parse(fullBody);
                    writeResponse(req, res, dBody,
                        url.parse(req.url, true).query["callback"])
                });
            } else {
                req.on("data", function (chunk) { fullBody += chunk.toString(); });
                req.on("end", function () {
                    dataObj = JSON.parse(fullBody);
                    var dprops = new Object();
                    for (var i = 0; i < dataObj.length; i++) {
                        dprops[dataObj[i].name] = dataObj[i].value;
                    }
                    writeResponse(req, res, dprops);
                });
            }
        }
    } else if (req.method == "GET") {
        var data = url.parse(req.url, true).query;
        writeResponse(req, res, data, data["callback"])
    }

    function writeResponse(req, res, data, jsonp) {
        var total = 0;
        for (item in data) {
            if (item != "_" && data[item] > 0) {
                total += Number(data[item]);
            } else {
                delete data[item];
            }
        }
        data.total = total;
        jsonData = JSON.stringify(data);
        if (jsonp) {
            jsonData = jsonp + "(" + jsonData + ")";
        }

        res.writeHead(200, "OK", {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
        res.write(jsonData);
        res.end();
    }

}).listen(port);
console.log("Ready on port " + port);
