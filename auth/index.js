const jwt = require('jsonwebtoken');

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
            throw new Error('No puedes editar')
        }
    }
}

function getToken(auth){
    if(!auth){
        throw new Error('No viene el token');
    }
    if(auth.indexOf('Bearer ')=== -1){
        throw new Error('Formato Invalido');s
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