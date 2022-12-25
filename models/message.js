const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    _messageId:{
        type: mongoose.Schema.Types.ObjectId
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chatID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    contentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    },
    readStatus:{
        type: String,
        enum: ['SENT','DELIVERED','READ'],
        default: 'SENT'
    },
},
{
    timestamps : true 
})

module.exports = mongoose.model('Message',messageSchema);