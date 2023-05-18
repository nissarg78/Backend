const User= require("../models/user.js");
const bcrypt = require('bcrypt');
const {authtokenfun}= require('../middleware/token.js');
const {encreption}= require('../middleware/hash.js');
// const JWT_SECRET="nisarg@123";
// const jwt = require('jsonwebtoken');





const login= async(req,res)=>{
  try{
    let data= req.body;

    // const {Email, Password}= req.body;
    
    const result= await User.findOne({Email:data.Email});

    if(!result){
        return res.status(404).json({message: "User not found"});
    }

    const check= await bcrypt.compare(data.Password, result.Password);

    const token= authtokenfun(result);

    if(!check){
        return res.status(200).cookie("token", null).json({
            success: false,
            message: "Incorrect Password"
        });
    }
    else{
        return res.status(200).cookie("token", token).json({
            success: true,
            message: "Successfully logged in"
        });
      
    }
  }
  catch{
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
  }

}



 
const register= async (req, res)=>{
    try{    
        console.log(req.body);
        let data= req.body;

       let check= await User.create({
           Name: data.Name,
           Email: data.Email,
           Password: data.Password,
           PhoneNum: data.PhoneNum,
        });

        const token=authtokenfun(check);


         if(token)
        {
            return res.status(200).json({
            success: true,
            message: "Registered Succesfully",
        });
    }
        else{
            return res.status(401).json({
                success:false,
                message:"Registered Successfully",
            })
        
    }
    }
    catch(e){
        return res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports= {register, login};