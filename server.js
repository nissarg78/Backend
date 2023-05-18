const express = require('express');
const userRouter= require('./routers/user.js');
const bodyParser = require('body-parser');
const User= require("./models/user.js");
// const jwt= require('jsonwebtoken');
const app = express();

//database connection
const ConnectToDB = require('./db');
ConnectToDB;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/user', userRouter);
//api documentation 
const swaggerUi = require('swagger-ui-express');
const YML = require('yamljs');
const swaggerDocumet = YML.load('./swagger.yaml');

app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocumet));



app.listen(3000,()=>{
    console.log("App is Listning at 3000 Port");
})