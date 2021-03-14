const mongoose = require('mongoose');
const {isEmail, isStrongPassword} = require('validator');
const bycrpt = require('bcryptjs');

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
    }
});

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bycrpt.hash(user.password, 8);
    }
    
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;