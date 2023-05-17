const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Name:{
        Type: String,
        required: true
    },
    Email:{
        Type: String,
        required: true,
        unique: true
    },
    Password:{
        Type: String,
        required: true
    },
    PhoneNum:{
        Type: String,
        required: true
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;

