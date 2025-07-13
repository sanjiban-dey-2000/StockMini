const express=require('express');
const { protectRoute } = require('../middlewares/protectRoute');
const {handleAddingSupplier, handleGettingSupplier}=require('../controllers/supplierController');
const router=express.Router();

router.post('/add-supplier',protectRoute,handleAddingSupplier);

router.get('/get-supplier',protectRoute,handleGettingSupplier);

module.exports=router;