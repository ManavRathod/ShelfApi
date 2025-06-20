const express=require('express')
const router=express.Router();
const controller=require('../controllers/categoryController')
const {authenticate,authorize}=require('../middleware/auth')
router.post('/',authenticate,authorize('admin','editor'),controller.createCategory)
router.put('/:name',authenticate,authorize('admin','editor'),controller.updateCategory)
router.get('/',authenticate,authorize('admin','editor','viewer'),controller.viewCategory)
router.delete('/:name',authenticate,authorize('admin'),controller.deleteCategory)
module.exports=router