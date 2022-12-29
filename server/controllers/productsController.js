const {Products} = require('../models/models')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const uuid = require('uuid')

class ProductsController {
  async create(req, res, next) {
    try {
      const {title} = req.body
      const Productsvar = await Products.create({title})
      const id = Productsvar.id
      const [results, metadata] =
        await sequelize.query("INSERT INTO " + process.env.DB_PRODUCT_INFO_TABLE + "s (\"idProduct\") valueS(" + id + ");")

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

      const [resultsInfo, metadataInfo] =
        await sequelize.query("SELECT " + process.env.DB_PRODUCTS_TABLE + "s.title, " + process.env.DB_PRODUCT_INFO_TABLE +
          "s.* FROM " + process.env.DB_PRODUCTS_TABLE + "s LEFT JOIN "
          + process.env.DB_PRODUCT_INFO_TABLE + "s ON "
          + process.env.DB_PRODUCTS_TABLE + "s.id = "
          + process.env.DB_PRODUCT_INFO_TABLE + "s.\"idProduct\" WHERE "
          + process.env.DB_PRODUCT_INFO_TABLE + "s.\"idProduct\" = " + id + "; ")

      const [resultsVars, metadataVars] = await sequelize.query("SELECT \"" + process.env.DB_PRODUCT_VAR_NAMES +
        "s\".\"" + process.env.DB_PRODUCT_SQLVAR + "\", \"" + process.env.DB_PRODUCT_SHOWVAR +
        "\" FROM \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\"; ")

      const j = resultsInfo[0]
      const i = resultsVars


      var json_arr = {}
      resultsVars.forEach((item) => {
        json_arr[item.sqlVar] = item.showVar
        // console.log(item)

      })
      var json_string = JSON.stringify(json_arr);
      console.log(json_string)

      const obj = [resultsInfo[0], resultsVars]
      //console.log(j)
      return (res.json(obj)

      )
    }
    catch (err) {
      next(ApiError.badRequest(error.message))
    }
  }
  async updateProductField(req, res) {
    try {
      const {columnName, value, id} = req.body
      const [results, metadata] =
        await sequelize.query("UPDATE \"" + process.env.DB_PRODUCT_INFO_TABLE + "s\" SET \"" + columnName + "\" = \'{" + value + "}\' WHERE \"idProduct\" = " + id + " ;")
      return (

        res.json('')
      )
    } catch (error) {
      console.log('Error in updateProduct in controller: ' + error)
    }
  }

}
module.exports = new ProductsController()