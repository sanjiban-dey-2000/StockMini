const express=require('express');
const { protectRoute } = require('../middlewares/protectRoute');
const { addCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController');

const router=express.Router();

router.post('/add',protectRoute,addCustomer);

router.get('/getCustomer',protectRoute,getCustomers);

router.put('/update/:id',protectRoute,updateCustomer);

router.delete('/delete/:id',protectRoute,deleteCustomer);

module.exports=router;