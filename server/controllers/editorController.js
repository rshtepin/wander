const sequelize = require('../db')
class EditorController {

  async getColumnsList(req, res) {
    const [results, metadata] =
      await sequelize.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products'; ")
    return (
      res.json(results)
    )
  }
  async addColumn(req, res) {
    console.log('addColumn')
    const {column_name} = req.body
    const [results, metadata] =
      await sequelize.query("ALTER TABLE IF EXISTS public.products ADD COLUMN " + column_name + " character varying; ")
    return (
      res.json(results)
    )
  }

  async dropColumn(req, res) {
    console.log('dropColumn')
    const {column_name} = req.body
    const [results, metadata] =
      await sequelize.query("ALTER TABLE IF EXISTS public.products DROP COLUMN " + column_name + "; ")
    return (
      res.json(results)
    )
  }


}
module.exports = new EditorController()