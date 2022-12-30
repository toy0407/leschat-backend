const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    _chatId: {
        type : mongoose.Schema.Types.ObjectId
    },
    userId_1:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId_2:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    messagesList: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

module.exports = mongoose.model('Chat',chatSchema);