const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
};

// signup user 
const signupUser = async (req, res) => {
    const {name, lName, title, email, password, manager} = req.body;

    try {
        const user = await User.signup(name, lName, title, email, password, manager,);
        const token = createToken(user._id);
        res.status(200).json({email, token});

    } catch (error) {
        res.status(400).json({error: error.message});

    }  
};

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

   try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({email, token});

   } catch (error) {
    res.status(400).json({error: error.message});
    
   };
};

// get all users
const getAllUsers = async (req, res) => {
    const users = await User.find().sort({createdAt: -1});
    res.status(200).json(users);
}

// get singel user
const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal user id.'});   
    };
    const user = await User.findById(id);
    if (!user) {
        return res.status(400).json({error: 'No such user in DB'})
    }
    res.status(200).json(user);
};

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal user id.'});   
    };
    const user = await User.findByIdAndDelete({_id: id});
    if (!user) {
        return res.status(400).json({error: 'No such user in DB'})
    } 
    res.status(200).json(user);
};

// update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal user id.'});   
    };
    const user = await User.findByIdAndUpdate({_id: id}, {...req.body});
    if (!user) {
        return res.status(400).json({error: 'No such user in DB'})
    }   
    res.status(200).json(user);
}

module.exports = { 
    signupUser,
    loginUser, 
    getAllUsers, 
    getUser, 
    deleteUser, 
    updateUser}