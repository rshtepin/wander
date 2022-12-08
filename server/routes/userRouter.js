const Router = require('express')
const userControler = require('../controllers/userControler')
const router = new Router()
const authMiddleWare = require('../middleware/authMiddleWare')

router.post('/registration', userControler.registraition)
router.post('/login', userControler.login)
router.get('/auth', authMiddleWare, userControler.check)

module.exports = router