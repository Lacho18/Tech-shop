const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');  //remove most of try-catch block while working with MongoDB
const bcrypt = require('bcrypt'); //crypts the passwords before going to the data base

//@desc Get all users
//@route GET /users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();    //select(-password) does not return the password
    if(!users) {
        return res.status(400).json({message : 'No users found'});
    }
    res.json(users);
});

//@desc Create new user
//@route POST /users
//@access Private
const createNewUser = asyncHandler(async (req, res) => {
    const {username, password, roles} = req.body;   //gets daa from the frontend

    //Confirm data
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'All fields are required'});
    }

    //Check for duplicate
    const duplicate = await findOne({username}).lean().exec();

    if(duplicate) {
        return res.status(409).json({message : 'Duplicate username'});
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10) //salt rounds

    const userObject = {username, "password" : hashedPwd, roles};

    //Create and store a new user
    const user = await User.create(userObject);

    if(user) {
        res.status(201).json({message : `New user ${username} created`});
    }
    else {
        res.status(400).json({message : 'Invalid user data received'});
    }

});

//@desc Update a user
//@route PATCH /users
//@access Private
const updateUser = asyncHandler(async (req, res) => {

});

//@desc Delete a user
//@route DELETE /users
//@access Private
const deleteUser = asyncHandler(async (req, res) => {

});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}