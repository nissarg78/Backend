const express= require("express");
const mongoose= require("mongoose");
// const User= require('../models/user.js');
const Protect = require('../middleware/protect.js');

const {register, login, profile, update, unfollow, follow, request}= require('../controllers/user.js');

const userRouter= express.Router();

// userRouter.get("/", (req, res)=>{
//     res.status(200).json({
//         success: true,
//         message: "Home page"
//     })
// })


userRouter
.post('/register', Protect,register)
.post('/login', login)
.post('/profile', profile)
.post('/profile/update', update)
.put('/follow', follow)
.put('/unfollow', unfollow)
.put('/request', request);


module.exports= userRouter;