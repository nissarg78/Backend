const express = require('express');
const userRouter= require('./routers/user.js');
const cookieParser= require('cookie-parser');
const bodyParser = require('body-parser');
const User= require("./models/user.js");
const cors = require('cors')
const fs= require('fs')
const mysql= require('mysql')
// const jwt= require('jsonwebtoken');
const app = express();

//database connection
const ConnectToDB = require('./db.js');
ConnectToDB;

const connect= require('./sql.js')
connect;

app.use(cors(
    {
        origin : "*",
        methods : ["GET","POST"],
        allowedHeaders : ["my-custom-header"],
        credentials : true
    }
));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
// fs.rename('text.txt', 'newText.txt', (err)=> {
//     if(err) console.log(err);
//     console.log('renamed');
// })
app.use('/', userRouter);

//api documentation 
const swaggerUi = require('swagger-ui-express');
const YML = require('yamljs');
const swaggerDocumet = YML.load('./swagger.yaml');

app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocumet));



app.listen(3000,()=>{
    console.log("App is Listning at 3000 Port");
})