const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    _groupId: {
        type : mongoose.Schema.Types.objectId
    },
    userIds:[{
        type : mongoose.Schema.Types.objectId,
        ref: 'User'
    }],
    messagesList: [{
        type : mongoose.Schema.Types.objectId,
        ref: 'Message'
    }]
})

module.exports = mongoose.model('Group',groupSchema);