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
    //TODO: ChatsList[]
    //TODO: GroupsList[]
    
},
{
    timestamps : true
}
)

module.exports = mongoose.model('User', userSchema)