const {Schema, model} = require("mongoose");

const Message = new Schema({
    messageText: {type: String, required: true},
    tags: [{type: String}],
    sendMessage: {type: Date, default: Date.now},
})

module.exports = model('Message', Message);