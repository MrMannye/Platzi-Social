const express = require('express');
const response = require('../../network/response')
const controller = require('./index')

const router = express.Router();


router.get('/', async(req,res) => {
    try {
        const action = await controller.get();
        response.success(req,res,action,200);
    } catch (error) {
        response.error(req,res,error.message,501);
    }
})

router.post('/', async (req,res) => {
    try {
        const action = await controller.login(req.body.username,req.body.password);
        response.success(req,res,action,200);
    } catch (error) {
        response.error(req,res,error.message,500);
    }
})

module.exports = router;
