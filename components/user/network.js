const express = require('express');
const router = express.Router();

const secure = require('./secure');
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

router.get('/following',secure('logged'), async (req,res) => {
    try {
        const action = await controller.following(req.user.Id_Auth);
        response.success(req,res,action,200);
    } catch (error) {
        response.error(req,res,error.message, 501);
    }
})

router.post('/follow/:id', secure('logged'),(req,res) =>{
    try {
        const action = controller.follow(req.user.Id_Auth,req.params.id);
        response.success(req,res,action,201);
    } catch (error) {
        response.error(req,res,error.message,500);
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

router.put('/', secure('update') ,async (req,res) => {
    try{
        const action = controller.update(req.body);
        response.success(req,res,action,200);
    }catch(error){
        response.error(req,res,error.message,500);
    }
})

module.exports = router;