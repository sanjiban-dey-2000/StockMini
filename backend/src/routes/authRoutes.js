const express=require('express');
const { handleUserRegistration } = require('../controllers/authController');
const router=express.Router();

router.post('/signup',handleUserRegistration);

module.exports=router;