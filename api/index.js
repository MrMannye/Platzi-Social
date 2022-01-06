const express = require('express');
const app = express();
const config = require('../config.js')
const swaggerUI = require('swagger-ui-express');

const user = require('../components/user/network')
const auth = require('../components/auth/network')
const errors = require('../network/errors')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT;


// REQUERIMIENTOS POR POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const swaggerDoc = require('./swagger.json')

//ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/docs', swaggerUI.serve,swaggerUI.setup(swaggerDoc));

// ERRORS
app.use(errors);

app.listen(PORT, (req,res) => {
    console.log("Escuchando en el puerto " + PORT)
})
