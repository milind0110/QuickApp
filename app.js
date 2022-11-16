// const cors = require("cors");
const express = require("express");

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);  

app.use(express.static("public"));


const user = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        user[socket.id] = name;
        socket.broadcast.emit("user-joined",name);
    });

    socket.on('send', message => {
        socket.broadcast.emit("receive", {message : message, name : user[socket.id]});
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit("leave", user[socket.id]);
        delete user[socket.id];
    });
})


app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 3000,() => {
    console.log("Listening to port");
});