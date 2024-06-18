import express from "express";
import http from "http";
import morgan from "morgan";
import { PORT } from './config.js';
import { Server as SocketServer } from "socket.io";
import { dirname, join } from 'path';
import { fileURLToPath } from "url";


const app = express();
app.use(morgan('dev'));
const __dirname = dirname(fileURLToPath(import.meta.url));

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
});

app.use(express.static(join(__dirname, '../client/dist')))

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})