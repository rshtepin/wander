const sequelize = require('../db')
class EditorController {

  async getColumnsList(req, res, {table_name}) {
    try {
      const [results, metadata] =
        await sequelize.query("SELECT \"sqlVar\",\"showVar\" FROM \"varNames\"")
      return (
        res.json(results)
      )
    }
    catch (error) {
      console.log('Error in getColumnsList in controller: ' + error)
    }

  }
  async addColumn(req, res) {
    try {
      const {sqlVar, showVar} = req.body
      const [results, metadata] =
        await sequelize.query("ALTER TABLE IF EXISTS " + process.env.DB_PRODUCT_INFO_TABLE + "s ADD COLUMN " + sqlVar + " character varying[] ;")
      await sequelize.query(" INSERT INTO \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\"(\"sqlVar\", \"showVar\") VALUES('" + sqlVar + "', '" + showVar + "'); ")
      return (
        console.log('addColumn in editor Done')
      )
    } catch (error) {
      console.log('Error in addColumn in controller: ' + error)
    }
  }

  async updateColumn(req, res) {
    try {
      const {sqlVar, showVar, oldSqlVar} = req.body
      const [results, metadata] =
        // "UPDATE \""+varNames+"\" SET \"sqlVar\" = \'"+sqlVar+"\':: character varying, \"showVar\" = \'"+showVar+"\'::character varying WHERE \"sqlVar\" = \'"+oldSqlVar+"\';"
        await sequelize.query("UPDATE \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\" SET \"sqlVar\" = \'" + sqlVar + "\':: character varying, \"showVar\" = \'" + showVar + "\'::character varying WHERE \"sqlVar\" = \'" + oldSqlVar + "\';")
      return (
        console.log('addColumn in editor Done')
      )
    } catch (error) {
      console.log('Error in addColumn in controller: ' + error)
    }
  }


  async dropColumn(req, res) {
    console.log('dropColumn')
    const {sqlVar} = req.body
    console.log(sqlVar)
    const [results, metadata] =
      await sequelize.query("ALTER TABLE IF EXISTS " + process.env.DB_PRODUCT_INFO_TABLE + "s DROP COLUMN IF EXISTS " + sqlVar + " ;")
    await sequelize.query("DELETE FROM \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\" WHERE \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\".\"sqlVar\" = \'" + sqlVar + "\' ;")
    return ('dropDone')

  }

}
module.exports = new EditorController()