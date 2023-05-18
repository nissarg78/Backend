const express= require("express");
const mongoose= require("mongoose");
const User= require('../models/user.js');

const {register, login}= require('../controllers/user.js');

const userRouter= express.Router();

userRouter.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Home page"
    })
})

// userRouter.route('/register')
// .post( (req, res)=>{
//     console.log(req.body);
//    register;
// })

userRouter
.post('/register', register )
.post('/login', login);


module.exports= userRouter;