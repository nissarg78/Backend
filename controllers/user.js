const User= require("../models/user.js");
const bcrypt = require('bcrypt');
const {authtokenfun, decode}= require('../middleware/token.js');
const {encreption}= require('../middleware/hash.js');
const { default: mongoose, mongo } = require("mongoose");
// const JWT_SECRET="nisarg@123";
// const jwt = require('jsonwebtoken');





const login= async(req,res)=>{
  try{
    let data= req.body;

    // const {Email, Password}= req.body;
    const result= await User.findOne({Email:data.Email});
   


    if(!result){
        return res.status(404).json({success:false,message: "User not found"});
    }

    const check= await bcrypt.compare(data.Password, result.Password);

    const token= authtokenfun(result);
    // console.log(token);

    if(!check){
        return res.status(400).cookie("token", null).json({
            success: false,
            message: "Incorrect Password"
        });
    }
    else{
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10*1000)
        }).json({
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
    let data= req.body;
    try{    
        // console.log(data); 
        let EmailExist = await User.findOne({Email:data.Email});

        //if already used email
       

      if(EmailExist==null){
        let check= await User.create({
            Name: data.Name,
            Email: data.Email,
            Password: data.Password,
            PhoneNum: data.PhoneNum,
         });
          const token=authtokenfun(check);
 
          if(check)
         {
             return res.status(200).cookie("token", token).json({
             success: true,
             message: "Registered Succesfully",
             });
 
         }else{
             return res.status(401).cookie("token", null).json({
                 success:false,
                 message:"Couldn't Registered Successfully",
             });
         }
      }
      else{
        res.status(400).json({success : false, message: "Already Registered"});
    }
    }
    catch(err){
        console.log("Error Occured at register", err);
        return res.status(500).json({success:false,message: "Internal Server Error"});
    }
}

const  profile= async (req, res)=>{
    let data= req.body;
    let email= req.Email;
    // console.log(req.Email);
    try {

        let cookie= req.cookies;

        // console.log(cookie);
        // console.log(cookie.token);
  
        if(cookie.token){
            let token1= decode(cookie);
            let result= await User.findById(token1.id);
        if(!result){
            return res.status(404).json({
                success: false,
                message:"User not found",
    
            })
        }
        else{
            const data= {
                Name:result.Name,
                Email:result.Email,
                PhoneNum:result.PhoneNum
            }
            console.log(data); 

            return res.status(200).json({
                success: true,
                message:"User profile accessed successfully",
                data,
            });
        }
        }
        else{
            return res.status(401).json({
                success: false,
                message:"Unauthorised access / Login timeout",
               
            });
        }
    } catch (error) {
        console.log("Error Occured at profile fetch", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
    };

module.exports= {register, login, profile};