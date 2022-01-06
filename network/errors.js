const response = require('./response')

const errors = (err,req,res,next) => {
    console.log('[Error]' , err);
    const message = err.message;
    const status = err.statusCode || 500;
    response.error(req,res,message,status)
}

module.exports = errors;