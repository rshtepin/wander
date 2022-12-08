const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generaiteJwt = (id, email, role) => {
  return jwt.sign(
    {id: User.id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}

  )
}

class UserController {
  async registraition(req, res, next) {
    const {email, password, role} = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Login/Password error'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('User already exist'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password: hashPassword})

    const token = generaiteJwt(user.id, user.email, user.role)
    return res.json(token)
  }
  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internalError('No user'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internalError('Bad password'))
    }

    const token = generaiteJwt(user.id, user.email, user.role)
    return res.json({token})

  }
  async check(req, res, next) {
    const token = generaiteJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}
module.exports = new UserController()