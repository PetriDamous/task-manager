const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/users');

const userOneID = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneID,
    name: 'Red Ridding Hood',
    email: 'red@gmail.com',
    password: '!QAZ2wsx#EDC4rfv',
    tokens: [{
        token: jwt.sign({_id: userOneID}, process.env.JWT_SECRET)
    }]
};

const nonExistingUser = {
    name: 'Billy Bod',
    email: 'billy@gmail.com',
    password: '!QAZ2wsx#EDC4rfv'
};

const dataBaseSetup = async () => {
    await User.deleteMany();
    await new User(userOne).save();
};

module.exports = {
    userOne,
    nonExistingUser,
    dataBaseSetup
};