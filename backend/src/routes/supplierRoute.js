const express=require('express');
const { protectRoute } = require('../middlewares/protectRoute');
const {handleAddingSupplier}=require('../controllers/supplierController');
const router=express.Router();

router.post('/add-supplier',protectRoute,handleAddingSupplier);

module.exports=router;