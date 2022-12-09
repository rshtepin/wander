const Router = require('express')
const testController = require('../controllers/testController')

const router = new Router()
router.post('/change', testController.change)
router.post('/', testController.create)
router.get('/', testController.getAll)
// router.get('/', (req, res) => {
//   res.json({mesage: 'GO!'})
// })
router.get('/:id', testController.getOne)

module.exports = router
