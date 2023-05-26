const jwt = require('jsonwebtoken');
// const User= require('../models/user.js');
const JWT_SECRET="nisarg@123";

module.exports.authtokenfun = function authtokenfun(req){
  
    const ret = {
     
            id: req.id
        
    }

    return jwt.sign(ret,JWT_SECRET);
}

module.exports.decode= function decode(req){
   try{
    const ret= req.token;
    return jwt.verify(ret, JWT_SECRET);
   }
   catch(e){
    console.log("Token decode error", e);
    return resizeBy.status(500).json({
        success: false,
        message: "Token decode error",
    })
   }
}