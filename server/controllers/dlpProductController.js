const {DlpProduct} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class DlpUProductController {
  async create(req, res, next) {
    try {
      const {name, info} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const dlpPrdct = await DlpProduct.create({name, img: fileName})

      return res.json(dlpPrdct)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }

  }
  async getAll(req, res) {
    const dlpPrdct = await DlpProduct.findAll()
    return res.json(dlpPrdct)
  }
  async getOne(req, res) {
    const {id} = req.params
    const dlpPrdct = await DlpProduct.findOne(
      {
        where: {id}

      }
    )
    return res.json(dlpPrdct)
  }
}
module.exports = new DlpUProductController()