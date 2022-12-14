const Router = require('express')
const dlpProductController = require('../controllers/dlpProductController')
const router = new Router()

router.post('/', dlpProductController.create)
router.get('/', dlpProductController.getAll)
// router.get('/', (req, res) => {
//   res.json({mesage: 'GO!'})
// })
router.get('/:id', dlpProductController.getOne)

module.exports = router
