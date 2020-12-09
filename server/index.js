var express = require('express');
var socketio = require('socket.io');
var http = require('http');
var app = express();
var PORT = process.env.PORT || 3000;
var server = http.createServer(app);
server.listen(PORT, function () { return console.log("Server is working on port " + PORT); });
var io = socketio(server, {
    cors: {
        origin: "http://localhost:8080",
        credentials: true
    }
});
var socks = require('./controllers/ws-controller')(io);
app.get("/", function (req, res) {
    res.send({ response: "Server is up and running." }).status(200);
});
