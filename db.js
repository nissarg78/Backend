const mongoose = require('mongoose');

const url = "mongodb+srv://krunal22:WtYOpZmV1gs0KVtt@cluster0.yl6esvi.mongodb.net/?retryWrites=true&w=majority";

const ConnectToDB = mongoose.connect(url).
then(()=>{
    console.log("Connected to DB Successfully!");
}).
catch(()=>{
    console.log("Error Occured at DB Connection");
})

module.exports = ConnectToDB;