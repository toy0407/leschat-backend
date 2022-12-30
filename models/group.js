const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    _groupId: {
        type : mongoose.Schema.Types.ObjectId
    },
    userIds:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messagesList: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

module.exports = mongoose.model('Group',groupSchema);