const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    _chatId: {
        type : mongoose.Schema.Types.objectId
    },
    userId_1:{
        type : mongoose.Schema.Types.objectId,
        ref: 'User'
    },
    userId_2:{
        type : mongoose.Schema.Types.objectId,
        ref: 'User'
    },
    messagesList: [{
        type : mongoose.Schema.Types.objectId,
        ref: 'Message'
    }]
})

module.exports = mongoose.model('Chat',chatSchema);