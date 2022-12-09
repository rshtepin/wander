const Router = require('express')
const testRouter = require('./testRouter')
const router = new Router()
const dlpProductRouter = require('./dlpProductRouter')
const userRouter = require('./userRouter')

router.use('/dlpproducts', dlpProductRouter)
router.use('/test', testRouter)

router.use('/user', userRouter)

module.exports = router