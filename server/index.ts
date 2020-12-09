const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server is working on port ${PORT}`));


const io = socketio(server, {
    cors: {
        origin: "http://localhost:8080",
        credentials: true
    }
})

const socks = require('./controllers/ws-controller')(io)

app.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});
