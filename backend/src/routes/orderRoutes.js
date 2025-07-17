const express=require('express');
const { protectRoute } = require('../middlewares/protectRoute');
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

const router=express.Router();

router.post('/create',protectRoute,createOrder);

router.get('/getOrder',protectRoute,getOrders);

router.put('/update/:id',protectRoute,updateOrder);

router.delete('/delete/:id',protectRoute,deleteOrder);

module.exports=router;