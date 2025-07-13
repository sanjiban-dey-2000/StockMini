const express=require('express');
const {protectRoute}=require('../middlewares/protectRoute');
const upload=require('../middlewares/uploadImage');
const { handleAddingProduct, handleGettingProducts } = require('../controllers/productController');
const router=express.Router();

router.post('/add-product',protectRoute,upload.single('image'),handleAddingProduct);

router.get('/get-product',protectRoute,handleGettingProducts);

module.exports=router;