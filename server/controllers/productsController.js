const {Products} = require('../models/models')
const ApiError = require('../error/ApiError')


class ProductsController {
  async create(req, res, next) {
    try {
      const {title, OS} = req.body
      const Productsvar = await Products.create({title, OS})

      return res.json(Productsvar)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }

  }

  async getAll(req, res) {
    const Productsvar = await Products.findAll()
    return (res.json(Productsvar)
    )
  }

  async editor(req, res) {
    const Productsvar = await Products.findAll()
    return (res.json(Productsvar)
    )
  }
  async change(req, res, next) {
    const {id, title, OS} = req.body
    try {
      const Productsvar = await Products.update({
        id: id,
        title: title,
        OS: OS
      },
        {
          where: {id: id}
        }
      ).then((res) => {
        console.log(res);
      })
      return (res.json(res)
      )
    } catch (err) {
      next(ApiError.badRequest(err.message))
    }
  }

  // async getOne(req, res) {
  //   const {id} = req.params
  //   const Productsvar = await Products.findOne(
  //     {
  //       where: {id}
  //     }
  //   )
  //   return res.json(Productsvar)
  // }
}

module.exports = new ProductsController()