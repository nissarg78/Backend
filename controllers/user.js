const {User}= require("../models/user.js");
const {Request}= require("../models/user.js");
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
            expires: new Date(Date.now() + 1000*100000)
        }).json({
            success: true,
            message: "Successfully logged in"
        });
      
    }
  }
  catch(err){
    console.log("error occured", err);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
  }

}


const update= async ( req, res)=>{
    let= data= req.body;

    try {
        let cookie= req.cookies;
        let token= cookie.token;
        if(token){
            let email= data.Email;
            // let currName= data.currName;
            let newName= data.newName;
            // let currNum= data.currNum;
            let newNum= data.newNum;
    
            if(newName==null || newNum==null){
                return res.status(400).json({ 
                    success: false,
                    message: "Providde proper data"
                });
            }
    
            let db_id=await User.findOne({Email: data.Email});
    
            if(db_id==null){
                return res.status(404).json({ 
                    success: false,
                    message: "User not found"
                });
            }
    
           let check= await User.updateOne({Email: data.Email}, {$set: {Name: newName, PhoneNum: newNum}} )
           .then(()=>{
            return res.status(200). json({
                success: true,
                message: "Successfully updated"
            });
           })
           .catch(()=>{
            return res.status(401).json({
                success: false,
                message: "Failed to update"
            });
           })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Login first to update"
            });
        }
      

       

    } catch (err) {
        console.log("Error Occured at register", err);
        return res.status(500).json({success:false,message: "Internal Server Error"});
  
    }
}
 
const register= async (req, res)=>{
    let data= req.body;
    try{    
        // console.log(data); 
        let EmailExist = await User.findOne({Email:data.Email});

        //if already used email
       
        const check= data.Role;
        let temp= "Student";
        if(check==true){
            temp="Mentor";
        }
        
      if(EmailExist==null){
        let check= await User.create({
            Name: data.Name,
            Email: data.Email,
            Password: data.Password,
            PhoneNum: data.PhoneNum,
            Role: temp,
            // Followers: new Array(),
            // Following: new Array(),
         });
         let reqDB= await Request.create({
          Email: data.Email,
         })
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


    // const follow= async (req, res)=>{
        
    //     const userID= await User.findOne({Email: req.bdy.FollowId});

    //      User.findByIdAndUpdate(req.body.userID, {
    //         $push:{followers:req.body._id}
    //     }, (err,result)=>{
    //         if(err){
    //             return res.status(422).json({error:err})
    //         }
    //       User.findByIdAndUpdate(req.body._id,{
    //           $push:{following:req.body.userID}
    //       })
    //       .then(result=>{
    //           res.json(result)
    //       })
    //       .catch(err=>{
    //           return res.status(422).json({error:err})
    //       })
    
    //     }
    //     )
    // }

    const request = async (req, res) => {
        try {
          const userID = await Request.findOne({ Email: req.body.FollowID });
          const currUser= await Request.findOne({Email: req.body.Email});
          // console.log(userID, currUser);
            // console.log(userID);
            if(userID._id== currUser._id){
              return res.status(404).json({message:"Can not follow the same user"});
            }
          if (!userID || !currUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      // console.log(currUser._id, userID._id);
         const reqUser= await Request.findByIdAndUpdate(userID._id, {
            $push: { requests: currUser._id }
          });
          // console.log(reqUser);

          
        //  const followingUser= await Request.findByIdAndUpdate(currUser._id, {
        //     $push: { following: userID._id }
        //   });

        //   console.log(followUser, followingUser);
      
          if(reqUser){res.json({ message: 'Requested successfully' });}
          else {
            res.json({message: "Operation failed"});
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      
      const follow= async(req, res)=>{
        const data= req.body;
        try {
          const userData= await User.findOne({Email: data.Email});
          const otherUser= await User.findOne({Email: data.FollowID});
          if(userData._id == otherUser._id){
            return res.status(404).json({message:"Can not follow the same user"});
          }
          const check= data.Follow;
          // console.log(check, userData, otherUser);
          let check1=false;
          let check2= false;

          if(check){
            const followUser= await User.findByIdAndUpdate(userData._id,{
              $push:{followers: otherUser._id}
            });

            const followingUser= await User.findByIdAndUpdate(otherUser._id,{
              $push:{following: userData._id}
            })
            // console.log(followUser, followingUser);
            const delTo= await Request.findOne({Email: data.Email});
            const delId= await Request.findOne({Email: data.FollowID});
            // console.log(delTo, delId);
            const delUser= await Request.findByIdAndUpdate(delTo._id,{
              $pull:{requests: delId._id}
            })

            if(followUser && followingUser && delUser){
              check1=true;
            }
            // console.log(delUser);
          }
          else {
            const delTo= await Request.findOne({Email: data.Email});
            const delId= await Request.findOne({Email: data.FollowID});
            const deleteUser= await Request.findByIdAndUpdate(delTo._id,{
              $pull:{requests: delId._id}
            })
            if(deleteUser){
              check2= true;
            }
          }
          // console.log(followUser, followingUser, delUser);
          if(check1){
            res.json({
              message:"Follow request accepted",
              success: true
            }). status(200);
          }
          else if(check2){
            res.json({
              message:"Follow request deleted",
              success: true
            }). status(200);
          }
          else{
            res.json({
              message:"Operation failed",
              success: false
            }). status(400);
          }
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      
      const unfollow = async (req, res) => {
        try {
          const userID = await User.findOne({ Email: req.body.FollowId });
          const currUser= await User.findOne({Email: req.body.Email});
            // console.log(userID);
          if (!userID) {
            return res.status(404).json({ error: 'User not found' });
          }
      console.log(currUser._id, userID._id);
         const followUser= await User.findByIdAndUpdate(userID._id, {
            $pull: { followers: currUser._id }
          });

          
         const followingUser= await User.findByIdAndUpdate(currUser._id, {
            $pull: { following: userID._id }
          });

        //   console.log(followUser, followingUser);
      
          if(followUser && followingUser)res.json({ message: 'User unfollowed successfully' });
          else {
            res.json({message: "Operation failed"});
          }
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      

    // const unfollow= async (req, res)=>{
        
    //     User.findByIdAndUpdate(req.body.UnfollowId,{
    //         $pull:{followers:req.body._id}
    //     },{
    //         new:true
    //     },(err,result)=>{
    //         if(err){
    //             return res.status(422).json({error:err})
    //         }
    //       User.findByIdAndUpdate(req.body._id,{
    //           $pull:{following:req.body.UnfollowId}
              
    //       },{new:true}).then(result=>{
    //           res.json(result)
    //       }).catch(err=>{
    //           return res.status(422).json({error:err})
    //       })
    
    //     }
    //     )
    // }

const  profile= async (req, res)=>{
    let data= req.body;
    let email= req.Email;
    // console.log(req.Email);
    try {

        let cookie= req.cookies;
        // console.log(data.id);

        // console.log(cookie);
        // console.log(cookie.token);
  
        if(cookie.token){
            let token1= decode(cookie);
            // console.log(token1.id);
            let result= await User.findById(token1.id);
            //  console.log(result.id);
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
                PhoneNum:result.PhoneNum,
                Role: result.Role,
                Followers: result.followers,
                Following: result.following
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

module.exports= {register, login, profile, update, follow, unfollow, request};