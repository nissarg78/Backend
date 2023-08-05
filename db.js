const mongoose = require('mongoose');

// const url = "mongodb+srv://krunal22:5bY4rOrQmWCeTVLw@cluster0.yl6esvi.mongodb.net/?retryWrites=true&w=majority";

const url="mongodb://127.0.0.1:27017";

const ConnectToDB = mongoose.connect(url,{
    dbName: "Project",
}).
then(()=>{
    console.log("Connected to DB Successfully!");
}).
catch(()=>{
    console.log("Error Occured at DB Connection");
})

module.exports = ConnectToDB;