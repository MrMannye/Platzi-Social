const express = require('express');
const router = express.Router();
const response = require('../../network/response')
const controller = require('./index')

router.get('/', async (req,res) =>{
    try{
        const users = await controller.list();
        response.success(req,res,users,200);
    } catch(error){
        response.error(req,res,error,500);
    }
})

router.post('/', async (req,res) =>{
    try {
        const action = await controller.upsert(req.body);
        response.success(req,res,action,200);
    } catch (error) {
        response.error(req,res,error,500);
    }
})

router.get('/:id', async (req,res) =>{
    try {
        const user = await controller.get(req.params.id);
        response.success(req,res,user,200);
    } catch (error) {
        response.error(req,res,error,500);
    }
})


module.exports = router;