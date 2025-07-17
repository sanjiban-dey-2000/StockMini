const express=require('express');
const { protectRoute } = require('../middlewares/protectRoute');
const {handleAddingSupplier, handleGettingSupplier, handleSupplierUpdate, handleSupplierDelete}=require('../controllers/supplierController');
const router=express.Router();

router.post('/add-supplier',protectRoute,handleAddingSupplier);

router.get('/get-supplier',protectRoute,handleGettingSupplier);

router.put('/update/:id',protectRoute,handleSupplierUpdate);

router.delete('/delete/:id',protectRoute,handleSupplierDelete);

module.exports=router;