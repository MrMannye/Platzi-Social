const jwt = require('jsonwebtoken');
const error = require('../utils/error')

function sign(data){
    return jwt.sign(data, process.env.SECRET_TOKEN);
}

function verify(token){
    return jwt.verify(token, process.env.SECRET_TOKEN);
}

const check = {
    own: function(req,owner){
        const decoded = decodeHeader(req);
        console.log(decoded);
        if(decoded.id !== owner){
            throw error('No puedes editar',401)
        }
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