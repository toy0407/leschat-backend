const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    _contentId: {
        type : mongoose.Schema.Types.ObjectId
    },
    text: {
        type : String,
    },
    type:{
        type : String,
        enum : ['TEXT','IMAGE','VIDEO'],
        default : 'TEXT'
    },
    mediaUrl: {
        type : String,
    }
})

module.exports = mongoose.model('Content',contentSchema);