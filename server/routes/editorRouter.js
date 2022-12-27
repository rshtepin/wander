const Router = require('express')
const editorController = require('../controllers/editorController')
const router = new Router()

router.get('/', editorController.getColumnsList)
router.post('/addColumn', editorController.addColumn)
router.post('/dropColumn', editorController.dropColumn)
router.post('/update', editorController.updateColumn)


module.exports = router
