const express=require('express');
const { handleUserRegistration, handleUserLogin } = require('../controllers/authController');
const {protectRoute}=require('../middlewares/protectRoute');
const router=express.Router();

router.post('/signup',handleUserRegistration);
router.post('/login',handleUserLogin);

router.get('/verify',protectRoute,(req,res)=>{
    res.status(200).json({
        user:req.user,
    });
})

module.exports=router;