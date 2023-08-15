const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();
const PORT = process.env.PORT || config.get('serverPort');

app.use(corsMiddleware);
app.use(express.json());
app.use("/", function (req, res) {
    res.send("Chat works :-)");
  });

const start = async () => {
    try {
        //await mongoose.connect(config.get('dbUrl'));
        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        });
    } catch (error) {
        console.log(error)
    }
}

start()