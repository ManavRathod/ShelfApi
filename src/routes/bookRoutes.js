const express=require('express')
const router=express.Router();
const controller=require('../controllers/bookController')
const {authenticate,authorize}=require('../middleware/auth')
router.get('/filters',controller.bookFilter)
router.get('/agg/book/newOld',controller.getOldestBookAndNewest)
router.get('/paginated',controller.getPaginatedBooks)
router.get('/group/by/:field',controller.groupBooks)
router.post('/',authenticate,authorize('admin','editor'),controller.createBook)
router.put('/:id',authenticate,authorize('admin','editor'),controller.updateBook)
router.get('/:id',authenticate,authorize('admin','editor','viewer'),controller.getBook)
router.get('/',authenticate,authorize('admin','editor','viewer'),controller.viewBook)
router.delete('/:id',authenticate,authorize('admin'),controller.deleteBook)
module.exports=router;