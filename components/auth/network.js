const express = require('express');
const response = require('../../network/response')
const controller = require('./controller')

const router = express.Router();


router.post('/', (req,res) =>{
    try {
        const action = controller.login(req.body.username);
        response.success(req,res,action,200);
    } catch (error) {
        response.error(req,res,error,500);
    }
})

module.exports = router;
