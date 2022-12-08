const Router = require('express')
const router = new Router()
const dlpProductRouter = require('./dlpProductRouter')
const userRouter = require('./userRouter')

router.use('/dlpproducts', dlpProductRouter)
router.use('/user', userRouter)

module.exports = router