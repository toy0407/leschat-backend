const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat');
const Message = require('../models/message');
const Content = require('../models/content');
const User = require('../models/user');
const message = require('../models/message');

//@desc Get all messages
//@route GET /
//@access Private
const getMessages = asyncHandler(async(req,res)=>{

})

//@desc Delete a message
//@route DELETE /
//@access Private
const deleteMessage = asyncHandler(async(req,res)=>{
    const {messageId}  = req.body;
    
    if(!messageId?.length>0) return res.status(400).json({message : "messageId not specified"});

    //Fetch message from database
    const message = await Message.findById(messageId);

    //Delete message from chat
    const chatId = message.chatId;
    const chat = await Chat.findById(chatId);
    const index = chat.messagesList.indexOf(messageId);
    if(index>-1){
        chat.messagesList.splice(index,1);
        await chat.save();
    }
    else return res.status(400).json({message: "Message not found in chat"});


    //Delete content of message
    const contentId = message.contentId;
    await Content.findByIdAndDelete(contentId);

    //Delete message
    const deleted = await Message.findByIdAndDelete(messageId);

    if(!deleted){
        return res.status(400).json({message: "Message deleting failed"})
    }
    return res.status(200).json({message: "Message deleted successfully"});
})

module.exports = {
    getMessages,
    deleteMessage
}