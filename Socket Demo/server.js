const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


var i = 0;

io.on('connection', (socket) => {

    console.log(socket.id);

    i++;
    console.log('a user connected  i=' + i);

    socket.on('disconnect', () => {

        i--;
        console.log('user disconnected i=' + i);

    });

    socket.on('chat message', (msg) => {
    
        io.emit('chat message', msg);
    
        console.log('message: ' + msg);
    });
});

server.listen(3000, () => {
    console.log('listening on:3000');
});