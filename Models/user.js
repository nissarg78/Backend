const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types;

const RequestSchema= mongoose.Schema({
    Email:{
        type: String,
        required: true
    },
  
    requests: [{type:ObjectId, ref:"User"}],
});

const UserSchema = mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },
    PhoneNum:{
        type: String,
        required: true
    },
    Role:{
        type: String,
        require: true
    },
    followers:[{type: ObjectId, ref:"User"}],
    following:[{type: ObjectId, ref:"User"}],
    posts:[{type: ObjectId, ref:"User"}],

});

const User = mongoose.model('User',UserSchema);
const Request= mongoose.model('Request', RequestSchema);

module.exports = {User, Request};

