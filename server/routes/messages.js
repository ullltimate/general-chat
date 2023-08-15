const Router = require("express");
const Message = require("../models/message");
const router = new Router();

router.post('/message', async (req, res) => {
    try {
        const {messageText, tags} = req.body;
        const message = new Message({messageText, tags});
        message.save();
        return res.json(message)
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

router.post('/tags', async (req, res) => {
    try {
        const {tags} = req.body;
        const messages = await Message.find({tags});
        return res.json(messages)
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
} )

router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        return res.status(200).json(messages);
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

module.exports = router