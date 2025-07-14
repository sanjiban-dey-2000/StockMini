const express=require('express');
const router=express.Router();
const {protectRoute}=require('../middlewares/protectRoute');
const {handleAddingCategory, handleGettingCategory, handleDeleteCategory, handleUpdateCategory}=require('../controllers/categoryController');
const upload=require('../middlewares/uploadImage');

router.post('/add-category',protectRoute,upload.single('image'),handleAddingCategory);

router.get('/get-category',protectRoute,handleGettingCategory);

router.delete('/delete/:id',protectRoute,handleDeleteCategory);

router.put('/update/:id',protectRoute,handleUpdateCategory);

module.exports=router;
