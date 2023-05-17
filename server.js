const express = require('express');

const app = express();

const swaggerUi = require('swagger-ui-express');
const YML = require('yamljs');
const swaggerDocumet = YML.load('./swagger.yaml');

app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocumet));


app.listen(3000,()=>{
    console.log("App is Linsting at 3000 Port");
})