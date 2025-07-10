const express=require('express');
const { handleUserRegistration, handleUserLogin } = require('../controllers/authController');
const router=express.Router();

router.post('/signup',handleUserRegistration);
router.post('/login',handleUserLogin);

module.exports=router;