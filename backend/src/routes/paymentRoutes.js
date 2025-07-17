const express=require('express');
const { protectRoute } = require('../middlewares/protectRoute');
const { addPayment, getPayments } = require('../controllers/paymentController');

const router=express.Router();

router.post('/add',protectRoute,addPayment);

router.get('/get',protectRoute,getPayments);

module.exports=router;