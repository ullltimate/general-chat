const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const corsMiddleware = require('./middleware/cors.middleware');
const http = require('http');
const app = express();
const server = http.createServer(app);
const messageRouter = require('./routes/messages')

const PORT = process.env.PORT || config.get('serverPort');
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: "http://localhost:3000"
  });

app.use(corsMiddleware);
app.use(express.json());
app.use("/", messageRouter);

//io.on('connection', (socket) => {
//  console.log('a user connected');
//});
//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
//io.on('connection', (socket) => {
//    socket.on('chat message', (msg) => {
//      io.emit('chat message', msg);
//    });
//  });

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'));
        console.log('connected database')
        server.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        });
    } catch (error) {
        console.log(error)
    }
}

start()