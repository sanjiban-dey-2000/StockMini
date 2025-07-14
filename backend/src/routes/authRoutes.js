const express=require('express');
const { handleUserRegistration, handleUserLogin, handleUseLogout } = require('../controllers/authController');
const {protectRoute}=require('../middlewares/protectRoute');
const router=express.Router();

router.post('/signup',handleUserRegistration);
router.post('/login',handleUserLogin);

router.get('/verify',protectRoute,(req,res)=>{
    res.status(200).json({
        user:req.user,
    });
})

router.post('/logout',handleUseLogout);


module.exports=router;