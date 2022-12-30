const Chat = require('../models/chat');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const Content = require('../models/content')

//@desc Send a message
//@route PATCH /
//@access Private
const sendMessage = asyncHandler(async(req,res)=>{
    const {userId, chatId, text, mediaUrl, type} = req.body;

    // TODO: Validations for request data
    if(!chatId?.length || !userId?.length) return res.status(400).json({
        message: 'Please provide all details',
    })
    

    //Create Content
    const contentObject  = {text,type,mediaUrl};
    const content = await Content.create(contentObject);

    //Get content id
    const contentId = content._id.valueOf(); 

    //Create message
    const messageObject = {userId, contentId};
    const message  = await Message.create(messageObject);

    //Get message id
    const messageId = message._id.valueOf();

    //Find chat by Id
    const chat = await Chat.findById(chatId).exec();

    //Add new message id
    chat.messagesList.push(messageId);
    
    //Update the chat in the mongodb
    const sent = await chat.save();
    
    if(sent) return res.status(200).json({message:'Message Sent'});
    res.status(400).json({message:'Message Sending Failed'});

})

//@desc Create a chat
//@route POST /
//@access Private
const createChat = asyncHandler(async(req,res)=>{
    const {userId_1, userId_2} = req.body;

    //Check if chatId_1 and chatId_2 both are not null
    if(!userId_1 || !userId_2) return res.status(400).json({
        message: 'User Ids are null',
    })

    //TODO:Check for duplicates


    //Create chat 
    const chatObject = {userId_1, userId_2};
    const chat = await Chat.create(chatObject);

    console.log(chat._id.valueOf());

    if(chat) res.status(200).json({message: 'Chat established', chatId: chat._id.valueOf(),});
    else res.status(400).json({message:'Failed to establish chat'});
})


module.exports = {
    createChat,
    sendMessage
}