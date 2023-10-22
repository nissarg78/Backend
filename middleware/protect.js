const bcrypt = require('bcrypt');


const protect = async (req,res,next)=>{
    const {Password} = req.body;
    console.log(Password);

    try{
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(Password,salt);
        req.body.Password = newPassword;
        next();
    }
    catch{
        console.log("Error Occcured at Protect middleware");
        res.status(500).json({success: true, message:"Internal Server Error"});
    }
};
module.exports = protect;