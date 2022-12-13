const Router = require('express')
const editorController = require('../controllers/editorController')
const ProductsController = require('../controllers/productsController')

const router = new Router()
router.post('/change', ProductsController.change)
router.post('/', ProductsController.create)
router.get('/', ProductsController.getAll)
router.get('/editor', editorController.getColumnsList)
router.get('/:id', ProductsController.getOne)

module.exports = router
