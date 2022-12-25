const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type : String,
        required : true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type : String,
    },
    about:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type : String,
    },
    lastSeen:{
        type: String,
    },
    chatsList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    groupsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
},
{
    timestamps : true
}
)

module.exports = mongoose.model('User', userSchema)