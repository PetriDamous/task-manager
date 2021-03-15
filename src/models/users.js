const mongoose = require('mongoose');
const {isEmail, isStrongPassword} = require('validator');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretPhrase = 'ilikebigbuttsandicannotlie';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be greater than 0.');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('You must enter a valid email.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot be the value of password.');
            }

            if (!isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })) {
                throw new Error('Password must be 8 charaters long and contain at least 1 lowercase character, uppercase character, 1 number, and 1 symbol (example: !@#$%^&*).');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }

    }]
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const {_id} = user;    

    const token = jwt.sign({_id: _id.toString()}, secretPhrase);

    user.tokens = [...user.tokens, {token}];

    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const errorMessage = 'Incorrect user name or password';

    const user = await User.findOne({email});

    if (!user) throw new Error(errorMessage);

    const isPasswordMatch = await bycrpt.compare(password, user.password);

    if (!isPasswordMatch) throw new Error(errorMessage);

    return user;
};

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bycrpt.hash(user.password, 8);
    }
    
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User: User,
    secretPhrase: secretPhrase

};