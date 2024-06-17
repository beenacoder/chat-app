import express from "express";
import http from "http";
import {Server as SocketServer} from "socket.io";


const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on('connection', socket => {
    console.log(`Cliente conectado con su id: ${socket.id}`);

    socket.on('message', (data) => {

        //Recibe el mensaje y lo envia al cliente
        socket.broadcast.emit('message', {
            data,
            from: socket.id.slice(6)
        });
        console.log(data)
    })
})

server.listen(3000, () => {
    console.log("Listening on port 3000");
})