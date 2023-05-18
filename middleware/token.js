const jwt = require('jsonwebtoken');
// const User= require('../models/user.js');
const JWT_SECRET="nisarg@123";

module.exports.authtokenfun = function authtokenfun(req){
  
    const ret = {
        user: {
            id: req.id
        }
    }

    return jwt.sign(ret,JWT_SECRET);
}