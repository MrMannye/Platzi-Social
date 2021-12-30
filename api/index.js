const express = require('express');
const app = express();
const config = require('../config.js')

const user = require('../components/auth/network')

//ROUTER
app.use('/api/user', user);

app.listen(config.api.PORT, (req,res) => {
    console.log("Escuchando en el puerto " + config.api.PORT)
})
