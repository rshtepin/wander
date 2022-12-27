const Router = require('express')
const productsRouter = require('./productsRouter')
const router = new Router()
const dlpProductRouter = require('./dlpProductRouter')
const userRouter = require('./userRouter')
const editorRouter = require('./editorRouter')

router.use('/dlpproducts', dlpProductRouter)
router.use('/products', productsRouter)
router.use('/editor', editorRouter)
router.use('/user', userRouter)

module.exports = router