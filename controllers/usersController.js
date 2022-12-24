const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find().select('-password').lean();
    if(!users?.length){
        return res.status(400).json({message: 'No users found'});
    }
    res.json(users);
})



//@desc Create new user
//@route POST /users/signup
//@access Private
const createNewUser = asyncHandler(async(req,res)=>{
    const {username, name, password, phoneNumber, about, email, image, lastSeen} = req.body;
    console.log(name);
    //Confirm data
    if(!username || !password || !name || !email) {
        return res.status(400).json({message:'All fields are required'});
    }
    //Check for duplicates
    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate){
        return res.status(409).json({message: 'Account already exists'}); 
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10);

    //Create and store new user
    const userObject = {username, name,"password":hashedPassword, phoneNumber,about,email,image,lastSeen};
    const user = await User.create(userObject);

    if(user){
        res.status(201).json({message:`New user ${username} created`});
    }
    else {
        res.status(400).json({message:`Invalid user data received`});
    }
    
})




//@desc Login a user
//@route POST /users/login
//@access Private
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    //Confirm data
    if(!email || !password) return res.status(400).json({message:`All fields are required`});

    //Check if user exists
    const foundUser = await User.findOne({email}).exec();
    if(!foundUser) return res.status(401).json({message:`Unauthorized`});

    //Match password
    const match = await bcrypt.compare(password,foundUser.password);
    if(!match) return res.status(401).json({message:`Unauthorized`});

    //Get JWT token
    const token = await jwt.sign(
        {
           email: foundUser.email,
           userId: foundUser._userId 
        },
        process.env.JWT_KEY,
        {
            expiresIn: "1h"
        }
    );
    
    return res.status(200).json({
        message: `Login Successful`,
        token: token
    });

})





//@desc Update a user
//@route PATCH /users/update
//@access Private
const updateUser = asyncHandler(async(req,res)=>{
    const {id, username, name, password, phoneNumber, about, email, image, lastSeen} = req.body;

    //Confirm data
    if(!id|| !username || !password || !email) {
        return res.status(400).json({message:'All fields are required'});
    }

    const user = await User.findById(id).exec();
    if(!user){
        return res.status(400).json({message:`User not found`});
    }
    
    //Check for duplicates
    const duplicate = await User.findOne({username}).lean().exec();
    //Allow duplicates to the original user
    if(duplicate && duplicate?._id.toString()!==id){
        return res.status(409).json({message:`Duplicate username`});
    }
    //TODO: Manage user updates
    user.username = username;
    if(name) {user.name = name;}
    if(phoneNumber) {user.phoneNumber = phoneNumber;}
    if(about) {user.about = about;}
    if(email) {user.email = email;}
    if(image) {user.image = image;}
    if(lastSeen) {user.lastSeen = lastSeen;} 

    const updatedUser = await user.save();
    res.status(201).json({message:`${user.username} updated`});
})





//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteUser = asyncHandler(async(req,res)=>{
    const {id}  = req.body;
    if(!id) {
        return res.status(400).json({message:`User ID required`});
    }
    const user = await User.findById(id).exec();
    if(!user){
        return res.status(400).json({message:`User not found`});
    }
    const result = await user.deleteOne();
    res.json({message: `${result.username} with ${result.id} deleted`});

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
}