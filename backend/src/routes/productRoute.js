const express=require('express');
const {protectRoute}=require('../middlewares/protectRoute');
const upload=require('../middlewares/uploadImage');
const { handleAddingProduct, handleGettingProducts, handleUpdateProduct, handleDeleteProduct } = require('../controllers/productController');
const router=express.Router();

router.post('/add-product',protectRoute,upload.single('image'),handleAddingProduct);

router.get('/get-product',protectRoute,handleGettingProducts);

router.put('/update/:id',protectRoute,upload.single('image'),handleUpdateProduct);

router.delete('/delete/:id',protectRoute,handleDeleteProduct);

module.exports=router;