const fs = require("fs");
const http = require("http");

const defaultSite = "/index.html";

http.createServer(function(req, res) {
    if(req.url === "/") req.url = defaultSite;
    req.url = "/www" + req.url;
    fs.readFile(__dirname + req.url, function(err, data) {
        if(err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        if(req.url.substr(-3, 3) === ".js") res.setHeader("Content-Type", "application/javascript");
        if(req.url.substr(-16, 16) === ".triviaQuestions") res.setHeader("Content-Type", "application/javascript");
        res.writeHead(200);
        res.end(data);
    });
}).listen(8000);