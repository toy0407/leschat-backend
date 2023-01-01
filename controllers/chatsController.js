const Chat = require('../models/chat');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');
const Content = require('../models/content');
const User = require('../models/user');

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
    const messageObject = {userId, chatId, contentId};
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

    //Finding user1 & user2 by respective Ids
    const user1 = await User.findById(userId_1).exec();
    const user2 = await User.findById(userId_2).exec();

    //Adding the new chat to corresponding user's chatList
    user1.chatsList.push(chat._id.valueOf());
    user2.chatsList.push(chat._id.valueOf());

    // Updating the user in the database
    const sent1 = await user1.save();
    const sent2 = await user2.save();
    // console.log(chat._id.valueOf());

    if(chat) res.status(200).json({message: 'Chat established', chatId: chat._id.valueOf(),});
    else res.status(400).json({message:'Failed to establish chat'});
})


//@desc Get all chats
//@route GET /
//@access Private
const getAllChats = asyncHandler(async(req,res)=>{
    const {userId} = req.body;
    
    // Checking if userId is null
    if(!userId?.length>0) return res.status(400).json({
        message: 'UserId not specified',
    })

    const user = await User.findById(userId).exec();
    if(!user){
        return res.status(400).json({message:'User not found'});
    }
    else{
        const chatsList = user.chatsList; 
        const chats = [];
        for(const chatId of chatsList){
                const chat = await Chat.findById(chatId).exec();
                chats.push(chat);
        }
        return res.status(200).json({
            message: 'success',
            chats: chats
        });
    }

});

//@desc Delete a chat
//@route DELETE /
//@access Private
const deleteChat = asyncHandler(async(req,res)=>{
    const {chatId} = req.body;
    
    // Checking if chatId is null
    if(!chatId?.length>0) return res.status(400).json({
        message: 'ChatId not specified',
    })

    //Fetching the Chat by chatId
    const chat = await Chat.findById(chatId).exec();
    if(!chat){
        return res.status(400).json({message:'Chat not found'});
    }
    //Getting userIds from chat
    const userId1 = chat.userId_1;
    const userId2 = chat.userId_2;

    // Deleting chat from user1's chatsList
    const user1 = await User.findById(userId1).exec();
    const index1 = user1.chatsList.indexOf(chatId);
    if(index1>-1){
        user1.chatsList.splice(index1,1);
    } 
    else return res.status(400).json({
        message: "Chat Id not present in user 1"
    })

    // Deleting chat from user2's chatsList  
    const user2 = await User.findById(userId2).exec();
    const index2 = user2.chatsList.indexOf(chatId);
    if(index2>-1){
        user2.chatsList.splice(index2,1);
    } 
    else return res.status(400).json({
        message: "Chat Id not present in user 2"
    })

    //Reflecting the changes in database
    const user1save = await user1.save();
    const user2save = await user2.save();

    //Deleting the messages and content of the deleted chat
    for(const messageId of chat.messagesList){
        const message = await Message.findById(messageId);
        //TODO: Implement checks for success
        await Content.findByIdAndDelete(message.contentId);
        await Message.findByIdAndDelete(messageId);
    }

    //Deleting the chat from the database
    const deleteChat = await Chat.findByIdAndDelete(chatId).exec();
    if(!deleteChat) {
        return res.status(400).json({message: 'Failed to delete chat'})
    }
    return res.status(200).json({
        message: 'Chat deleted successfully'
    })
});

module.exports = {
    createChat,
    sendMessage,
    getAllChats,
    deleteChat
}