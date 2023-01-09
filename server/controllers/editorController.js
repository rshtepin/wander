const sequelize = require('../db')
class EditorController {

  async getColumnsList(req, res, {table_name}) {
    try {
      const [results, metadata] =
        await sequelize.query("SELECT \"sqlVar\",\"showVar\",\"id\" FROM \"varNames\" ORDER BY id ASC")
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

      await sequelize.query("ALTER TABLE IF EXISTS " + process.env.DB_PRODUCT_INFO_TABLE + "s ADD COLUMN \"" + sqlVar + "\" character varying[] ;")

      await sequelize.query(" INSERT INTO \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\"(\"sqlVar\", \"showVar\") VALUES('" + sqlVar + "', '" + showVar + "'); ")

      const [resSqlVar, metaSqlVar] = await sequelize.query("SELECT id FROM \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\" ORDER BY id ASC")
      await resSqlVar.map((item, index) => {
        sequelize.query("UPDATE \"" + process.env.DB_PRODUCT_VAR_NAMES +
          "s\" SET id = " + (index + 1) + " WHERE id =" + item.id)
      })
      return (
        console.log('addColumn in editor Done')
      )
    } catch (error) {
      console.log('Error in addColumn in controller: ' + error)
    }
  }

  async updateColumn(req, res) {
    try {
      const {sqlVar, showVar, oldSqlVar, id, newid} = req.body
      if (id == '') {

        await sequelize.query("UPDATE \"" + process.env.DB_PRODUCT_VAR_NAMES +
          "s\" SET \"" + process.env.DB_PRODUCT_SQLVAR + "\" = \'" +
          sqlVar + "\':: character varying, \"" +
          process.env.DB_PRODUCT_SHOWVAR + "\" = \'" +
          showVar + "\'::character varying WHERE \"" +
          process.env.DB_PRODUCT_SQLVAR + "\" = \'" + oldSqlVar + "\';")
        return (
          console.log('addColumn in editor Done')
        )
      }
      if (id != '') {
        console.log('Переменная ' + sqlVar + ' id ' + id + ' на позицию ' + newid)
      }
    } catch (error) {
      console.log('Error in addColumn in controller: ' + error)
    }
  }


  async dropColumn(req, res) {
    console.log('dropColumn')
    const {sqlVar} = req.body
    console.log(sqlVar)
    await sequelize.query("ALTER TABLE IF EXISTS " + process.env.DB_PRODUCT_INFO_TABLE + "s DROP COLUMN IF EXISTS \"" + sqlVar + "\" ;")
    await sequelize.query("DELETE FROM \"" + process.env.DB_PRODUCT_VAR_NAMES + "s\" WHERE \"" +
      process.env.DB_PRODUCT_VAR_NAMES + "s\".\"" +
      process.env.DB_PRODUCT_SQLVAR + "\" = \'" + sqlVar + "\' ;")
    return ('dropDone')

  }

}
module.exports = new EditorController()