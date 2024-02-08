const express=require('express');
const router=express.Router();
const controller=require('./userController');

router.post('/create',controller.createUserFn);
router.post('/login',controller.loginControllerFn);
module.exports=router;