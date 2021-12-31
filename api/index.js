const express = require('express');
const app = express();
const config = require('../config.js')
const swaggerUI = require('swagger-ui-express');

const user = require('../components/user/network')

// REQUERIMIENTOS POR POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDoc = require('./swagger.json')

//ROUTER
app.use('/api/user', user);
app.use('/api/docs', swaggerUI.serve,swaggerUI.setup(swaggerDoc));

app.listen(config.api.PORT, (req,res) => {
    console.log("Escuchando en el puerto " + config.api.PORT)
})
