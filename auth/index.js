const jwt = require('jsonwebtoken');
const error = require('../utils/error')
const config = require('../config')

function sign(data){
    return jwt.sign(data, config.api.SECRET_TOKEN);
}

function verify(token){
    return jwt.verify(token, config.api.SECRET_TOKEN);
}

const check = {
    own: function(req,owner){
        const decoded = decodeHeader(req);
        console.log(decoded);
        if(decoded.Id_Auth !== owner){
            throw error('No puedes editar',401)
        }
    },
    logged: function(req){
        const decoded = decodeHeader(req);
        if(!decoded) throw new Error("No se ha loggeado");
    }
}

function getToken(auth){
    if(!auth){
        throw error('No viene el token',401);
    }
    if(auth.indexOf('Bearer ')=== -1){
        throw error('Formato Invalido',500);s
    }
    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoder = verify(token)

    req.user = decoder;
    return decoder;
}

module.exports = {
    sign,
    check
}