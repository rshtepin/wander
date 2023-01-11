const {Products} = require('../models/models')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')
const uuid = require('uuid')
const path = require('path')

class ProductsController {
  async create(req, res, next) {
    try {
      const {title, command} = req.body

      if (command == 'create') {
        const Productsvar = await Products.create({title})
        const id = Productsvar.id
        await sequelize.query("INSERT INTO " + process.env.DB_PRODUCT_INFO_TABLE + "s (\"idProduct\") valueS(" + id + ");")
        return res.json(Productsvar)
      }
      if (command == 'delete') {
        const [id, metaid] =
          await sequelize.query("SELECT id FROM " + process.env.DB_PRODUCTS_TABLE + "s WHERE \"title\"= \'" + title + "\'")
        await sequelize.query("DELETE FROM " + process.env.DB_PRODUCT_INFO_TABLE + "s WHERE \"idProduct\"= \'" + id[0].id + "\'")
        await Products.destroy({
          where:
            {title}
        })
        console.log('delete ' + title)
        //return res.json(Productsvar)
      }
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }

  }

  async getAll(req, res) {
    try {
      const [results, metadata] =
        await sequelize.query(" SELECT " + process.env.DB_PRODUCTS_TABLE + "s.*," +
          process.env.DB_PRODUCT_INFO_TABLE + "s.img FROM "
          + process.env.DB_PRODUCTS_TABLE + "s LEFT JOIN " +
          process.env.DB_PRODUCT_INFO_TABLE + "s ON " + process.env.DB_PRODUCTS_TABLE +
          "s.id = " + process.env.DB_PRODUCT_INFO_TABLE + "s.\"idProduct\" ")
      return (
        res.json(results)
      )
    } catch (error) {
      console.log('Error in getAll in  Product controller: ' + error)
    }
  }

  async getOne(req, res, next) {
    try {
      const {id} = req.params

      const [resultsInfo, metadataInfo] =
        await sequelize.query("SELECT " +
          process.env.DB_PRODUCTS_TABLE +
          "s.title, " + process.env.DB_PRODUCT_INFO_TABLE +
          "s.* FROM " + process.env.DB_PRODUCTS_TABLE + "s LEFT JOIN "
          + process.env.DB_PRODUCT_INFO_TABLE + "s ON "
          + process.env.DB_PRODUCTS_TABLE + "s.id = "
          + process.env.DB_PRODUCT_INFO_TABLE +
          "s.\"idProduct\" WHERE "
          + process.env.DB_PRODUCT_INFO_TABLE +
          "s.\"idProduct\" = " + id + "; ")

      const [resultsVars, metadataVars] =
        await sequelize.query("SELECT \"" +
          process.env.DB_PRODUCT_VAR_NAMES +
          "s\".\"" + process.env.DB_PRODUCT_SQLVAR +
          "\", \"" + process.env.DB_PRODUCT_SHOWVAR +
          "\" FROM \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\" ORDER BY id ASC; ")

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
      let {columnName, value, id} = req.body
      console.log(columnName + ' ' + value + ' ' + id + ' ')
      if (columnName == '') {
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        columnName = 'img'
        value = fileName
      }
      if (columnName = 'title') {
        console.log('NICE!')
        await sequelize.query("UPDATE \""
          + process.env.DB_PRODUCTS_TABLE +
          "s\" SET \"" + columnName + "\" = \'" + value +
          "\'WHERE \"id\" = " + id + " ;")
      }

      if ((columnName !== '') && (columnName !== 'title')) {
        const [results, metadata] =
          await sequelize.query("UPDATE \""
            + process.env.DB_PRODUCT_INFO_TABLE +
            "s\" SET \"" + columnName + "\" = \'{" + value +
            "}\'WHERE \"idProduct\" = " + id + " ;")
      }
    }
    catch (error) {
      console.log('Error in updateProduct in controller: ' + error)
    }
  }
  async compare(req, res) {
    console.log('COMPARE!')
  }
}
module.exports = new ProductsController()