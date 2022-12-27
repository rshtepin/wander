const {Products} = require('../models/models')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')

class ProductsController {
  async create(req, res, next) {
    try {
      const {title} = req.body
      const Productsvar = await Products.create({title})
      const id = Productsvar.id
      const [results, metadata] =
        await sequelize.query("INSERT INTO " + process.env.DB_PRODUCT_INFO_TABLE + "s (\"idProduct\") VALUES(" + id + ");")
      return res.json(Productsvar)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }

  }

  async getAll(req, res) {
    try {
      const [results, metadata] =
        await sequelize.query("SELECT * FROM public." + process.env.DB_PRODUCTS_TABLE + "s ORDER BY id ASC ")
      return (
        res.json(results)
      )
    } catch (error) {
      console.log('Error in getAll in  Product controller: ' + error)
    }
  }

  async change(req, res, next) {
    const {id, title} = req.body
    try {
      const Productsvar = await Products.update({
        id: id,
        title: title,

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

  async getOne(req, res, next) {
    try {
      const {id} = req.params
      console.log(id)
      const [results, metadata] =
        await sequelize.query("SELECT " + process.env.DB_PRODUCTS_TABLE + "s.title, " + process.env.DB_PRODUCT_INFO_TABLE +
          "s.* FROM " + process.env.DB_PRODUCTS_TABLE + "s LEFT JOIN "
          + process.env.DB_PRODUCT_INFO_TABLE + "s ON "
          + process.env.DB_PRODUCTS_TABLE + "s.id = "
          + process.env.DB_PRODUCT_INFO_TABLE + "s.\"idProduct\" WHERE "
          + process.env.DB_PRODUCT_INFO_TABLE + "s.\"idProduct\" = " + id + "; ")
      return (
        res.json(results))
    }
    catch (err) {
      next(ApiError.badRequest(error.message))
    }
  }
}
module.exports = new ProductsController()